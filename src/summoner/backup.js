import {exportBackup,parseBackup} from './storage.js';

export function installBackup({dialog,snapshot,replace,canImport}){
 const section=document.createElement('details');section.className='history-backup';
 const title=document.createElement('summary');title.textContent='Sao lưu và khôi phục tiến độ';
 const note=document.createElement('p');note.textContent='Tải bản sao lưu để giữ tiến độ khi đổi trình duyệt hoặc thiết bị. Khôi phục sẽ thay toàn bộ tiến độ và lịch sử hiện tại.';
 const download=document.createElement('button');download.type='button';download.id='export-backup';download.className='secondary-button';download.textContent='Tải bản sao lưu';
 const label=document.createElement('label');label.textContent='Chọn tệp sao lưu để khôi phục';
 const file=document.createElement('input');file.type='file';file.id='import-backup';file.accept='.json,application/json';label.append(file);
 const status=document.createElement('p');status.setAttribute('role','status');
 const confirmation=document.createElement('div');confirmation.hidden=true;
 const preview=document.createElement('p'),yes=document.createElement('button'),no=document.createElement('button');
 yes.type=no.type='button';yes.id='confirm-import';yes.className='secondary-button';yes.textContent='Thay bằng bản sao lưu này';no.textContent='Giữ tiến độ hiện tại';no.className='text-button';
 confirmation.append(preview,no,yes);let pending=null;
 const cancel=()=>{pending=null;confirmation.hidden=true;file.value='';};no.onclick=cancel;
 download.onclick=()=>{try{
  const data=exportBackup(snapshot()),url=URL.createObjectURL(new Blob([data],{type:'application/json'})),link=document.createElement('a');
  link.href=url;link.download='dau-truong-han-tu-backup.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Đã tạo tệp sao lưu. Hãy giữ tệp ở nơi dễ tìm.';
 }catch{status.textContent='Chưa tạo được bản sao lưu. Hãy kiểm tra bản lưu và thử lại.';}};
 file.onchange=async()=>{
  pending=null;confirmation.hidden=true;const selected=file.files[0];if(!selected)return;
  try{
   if(!canImport())throw Error('busy');
   if(selected.size>5_000_000)throw Error('size');
   const data=parseBackup(await selected.text());
   // Ignore a file read which finished after the selection changed or dialog closed.
   if(file.files[0]!==selected||!dialog.open)return;
   pending=data;const words=Object.values(data.progress.scopes).reduce((sum,scope)=>sum+Object.keys(scope).length,0);
   preview.textContent=`Bản sao lưu có ${words} từ hoàn thành và ${data.records.length} lượt luyện. Thay toàn bộ tiến độ hiện tại bằng bản này?`;
   status.textContent='';confirmation.hidden=false;no.focus();
  }catch(error){status.textContent=error.message==='busy'?'Hãy kết thúc lượt luyện hiện tại và đóng thẻ trò chơi khác trước khi khôi phục.':'Tệp sao lưu không hợp lệ hoặc quá lớn. Tiến độ hiện tại vẫn được giữ.';file.value='';}
 };
 yes.onclick=()=>{try{if(!pending||!canImport())throw Error('busy');replace(pending);cancel();status.textContent='Đã khôi phục tiến độ và lịch sử.';}catch{status.textContent='Không khôi phục được. Tiến độ hiện tại vẫn được giữ.';}};
 dialog.addEventListener('close',cancel);section.append(title,note,download,label,status,confirmation);dialog.querySelector('[data-history-summary]').before(section);
}

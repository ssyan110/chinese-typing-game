// Original Lantern Atlas identity and layout; gameplay identifiers remain compatible.
function mountOriginalWorld(){
 const dock=document.createElement('div');dock.id='typing-dock';dock.setAttribute('aria-label','Khu vực nhập chữ, bên ngoài sân chơi');
 el.arena.after(dock);dock.append(el.imePanel);
 document.title='Đèn Sao · Hành trình chữ Hán';
 const brand=document.querySelector('.vn-wordmark');if(brand)brand.textContent='ĐÈN SAO';
 const enter=document.getElementById('enter-original-game');if(enter)enter.textContent='Vào học viện →';
 const title=document.getElementById('title-name');if(title)title.textContent='HỌC VIỆN ĐÈN SAO';
 const loading=document.getElementById('loading-title');if(loading)loading.textContent='Đang thắp đèn…';
 el.heroSprite.alt='Sứ giả Đèn Sao';
 const portrait=document.querySelector('#hero-card img');if(portrait)portrait.alt='Sứ giả Đèn Sao';
 const credits=document.querySelector('.adaptation-credit');if(credits){credits.textContent='Đèn Sao · Hình ảnh và âm nhạc sáng tác riêng · Phần chơi phát triển từ ';const link=document.createElement('a');link.href='https://changsheng0612.itch.io/typegamewuxia';link.textContent='TypeGameWuxia';link.target='_blank';link.rel='noopener';credits.append(link);}
}
const academyStageNames=['Vườn đom đóm','Cầu mây','Bến đèn','Thư viện sao','Cổng nhật thực'];
const academyStageInstructions=[
 'Nhìn chữ trong các bong bóng đang rơi. Nhập một từ bất kỳ còn trên sân; ba lần đúng sẽ thắp một luồng sáng.',
 'Nhập chữ đang nổi trên mây, rồi bấm F hoặc J khi được nhắc để giữ thăng bằng.',
 'Nhập chữ trên các hạt mực đang bay để ngăn chúng đi qua. Ba lần đỡ đúng sẽ tạo một đợt phản sáng.',
 'Nhìn chữ trên ấn nổi cạnh đối thủ. Nhập đủ cả từ trước khi hết giờ để mở ấn.',
 'Nhập chữ trên ấn của Thủ lĩnh Nhật thực. Khi thấy F hoặc J, đỡ trước rồi nhập tiếp. Đầy năng lượng thì bấm Space.'
];
STAGES.forEach((stage,i)=>{
 stage.name=`Ải ${i+1} · ${academyStageNames[i]}`;stage.subtitle=academyStageInstructions[i];
 stage.opening=[{speaker:'Người giữ đèn',text:academyStageInstructions[i]}];
 stage.clear=[{speaker:'Người giữ đèn',text:'Một ngọn đèn mới đã sáng. Giữ nhịp, đọc chữ và tiếp tục hành trình nhé.'}];
 if(STAGE_TRACK[i])STAGE_TRACK[i].name=academyStageNames[i];
});
const creatureNames={"boar_angry":"Mặt nạ giấy · ngọc","boar_angry_elite":"Bướm gấp · Tinh anh","cave_troll_boss":"Thủ lĩnh Đèn canh · hoàng hôn","corrupted_treant":"Rồng dải lụa · đồng","corrupted_treant_elite":"Diều đá · Tinh anh","crazed_scholar":"Mực linh · ngọc","crazed_scholar_elite":"Mảnh sao · Tinh anh","flying_eye":"Mặt nạ giấy · hoàng hôn","flying_eye_elite":"Bướm gấp · Tinh anh","forest_guardian_boss":"Thủ lĩnh Đèn canh · lá","forest_spirit":"Rồng dải lụa · ngọc","forest_spirit_elite":"Diều đá · Tinh anh","frost_wyrm_boss":"Thủ lĩnh Mực linh · hoàng hôn","ice_spirit":"Mảnh sao · đồng","ice_spirit_elite":"Mặt nạ giấy · Tinh anh","lava_elemental_boss":"Thủ lĩnh Bướm gấp · ngọc","lich_apprentice":"Đèn canh · sương","lich_apprentice_elite":"Rồng dải lụa · Tinh anh","mountain_bandit":"Diều đá · đồng","mountain_bandit_elite":"Mực linh · Tinh anh","nether_lord_boss":"Thủ lĩnh Mảnh sao · ngọc","placeholder_monster":"Mặt nạ giấy · sương","ruins_guardian_boss":"Thủ lĩnh Bướm gấp · hoàng hôn","shadow_imp":"Đèn canh · đồng","shadow_imp_elite":"Rồng dải lụa · Tinh anh","snakelet_bamboo":"Diều đá · ngọc","stone_golem":"Mực linh · sương","stone_golem_elite":"Mảnh sao · Tinh anh","undead_warrior":"Mặt nạ giấy · đồng","wolf_cub":"Bướm gấp · lá","wolf_cub_elite":"Đèn canh · Tinh anh","yeti":"Rồng dải lụa · sương"};
for(const [id,monster]of Object.entries(MONSTERS)){const base=id.replace(/_elite$/,'');monster.name=(creatureNames[id]||creatureNames[base]||'Mực linh');}

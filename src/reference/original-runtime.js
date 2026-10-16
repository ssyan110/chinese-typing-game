// Original Lantern Atlas identity and layout; gameplay identifiers remain compatible.
function mountOriginalWorld(){
 const dock=document.createElement('div');dock.id='typing-dock';dock.setAttribute('aria-label','Khu vực nhập chữ, bên ngoài sân chơi');
 el.arena.after(dock);dock.append(el.imePanel);
 // Keep live progress visible; secondary instructions belong in an optional disclosure.
 const footer=document.getElementById('bottom-hud');
 const progress=document.getElementById('objective-progress');
 const guide=document.createElement('details');guide.id='combat-guide';
 const summary=document.createElement('summary');summary.textContent='Cách chơi & mẹo';guide.append(summary);
 const content=document.createElement('div');content.className='combat-guide-content';
 content.append(document.getElementById('objective-panel'),document.getElementById('help-panel'));
 guide.append(content);footer.append(progress,guide);

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
const creatureNames={"boar_angry": "Ngọc vệ", "boar_angry_elite": "Linh điệp · Tinh anh", "cave_troll_boss": "Thanh long · Thủ lĩnh", "corrupted_treant": "Đèn vệ", "corrupted_treant_elite": "Ngọc vệ · Tinh anh", "crazed_scholar": "Linh điệp", "crazed_scholar_elite": "Thanh long · Tinh anh", "flying_eye": "Đèn vệ", "flying_eye_elite": "Ngọc vệ · Tinh anh", "forest_guardian_boss": "Linh điệp · Thủ lĩnh", "forest_spirit": "Thanh long", "forest_spirit_elite": "Đèn vệ · Tinh anh", "frost_wyrm_boss": "Ngọc vệ · Thủ lĩnh", "ice_spirit": "Linh điệp", "ice_spirit_elite": "Thanh long · Tinh anh", "lava_elemental_boss": "Đèn vệ · Thủ lĩnh", "lich_apprentice": "Ngọc vệ", "lich_apprentice_elite": "Linh điệp · Tinh anh", "mountain_bandit": "Thanh long", "mountain_bandit_elite": "Đèn vệ · Tinh anh", "nether_lord_boss": "Ngọc vệ · Thủ lĩnh", "placeholder_monster": "Linh điệp", "ruins_guardian_boss": "Thanh long · Thủ lĩnh", "shadow_imp": "Đèn vệ", "shadow_imp_elite": "Ngọc vệ · Tinh anh", "snakelet_bamboo": "Linh điệp", "stone_golem": "Thanh long", "stone_golem_elite": "Đèn vệ · Tinh anh", "undead_warrior": "Ngọc vệ", "wolf_cub": "Linh điệp", "wolf_cub_elite": "Thanh long · Tinh anh", "yeti": "Đèn vệ", "kunpeng_icon": "Ngọc vệ", "pet_nether_whelp_icon": "Linh điệp", "qinglong_icon": "Thanh long", "zhuque_icon": "Đèn vệ"};
for(const [id,monster]of Object.entries(MONSTERS)){const base=id.replace(/_elite$/,'');monster.name=(creatureNames[id]||creatureNames[base]||'Mực linh');}

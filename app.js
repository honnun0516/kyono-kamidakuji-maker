const A='assets/';
const chars=[
 ['まきまる','makimaru.png','makimaru_text.png'],['かみまる','ふわふわ雲キャラの舌出しスタンプ.png','kamimaru_text.png'],['どらぽん','dorapon.png','dorapon_text.png'],['ちょきすけ','chokisuke.png','chokisuke_text.png'],['ととのん','totonon.png','totonon_text.png'],['こてりん','koterin.png','koterin_text.png'],['しゃんぷぅ','shampu.png','shampu_text.png'],['はけぽん','hakepon.png','hakepon_text.png'],['しゅっしゅ','shusshu.png','shusshu_text.png'],['だっかる','dakkaru.png','dakkaru_text.png'],['ろっどん','roddon.png','roddon_text.png']
].map(([name,file,textFile])=>({name,file,textFile}));
const ranks={
 '髪吉':{asset:'kamikichi.png',messages:['今日の髪、過去イチかも。予定なくても出かけたくなる。','何しても決まる日。寝ぐせまで味方につけそう。','鏡を見るたび「今日いいじゃん」が更新されそう。','前髪・毛先・後ろ姿。今日は全員ちゃんと話が通じます。','適当にやったのに、なぜか美容室帰りっぽくなるかも。','今日の髪、なんかいいねって言われる予感。','すれ違った人が二度見するかも。今日は後ろ姿までいい感じ。','「美容室行った？」って聞かれるかも。行ってなくても今日は言わせておこう。','今日の髪、カメラを向けられても余裕です。','今日の髪、褒められる準備はできてます。あとは出かけるだけ。']},
 '大吉':{asset:'daikichi.png',messages:['前髪、一発で決まる予感。今日は幸先よし。','なんとなくセットしたのに「今日いいじゃん」ってなる日。','今日は髪がちゃんと話を聞いてくれそう。','いつもの髪型なのに、今日はちょっと上手に見えるかも。','朝のセット、思ったより早く終わりそう。余った時間はのんびりどうぞ。','今日は髪と意見が一致しそう。話が早い。','ふと鏡を見たとき「まだいい感じ」が続きそう。','今日は風が吹いても、そこそこいいところに戻ってきそう。','「今日なんか雰囲気いいね」って言われるかも。髪のおかげかも。','夕方までいい感じをキープできそう。今日は髪の持久力◎。']},
 '中吉':{asset:'chukichi.png',messages:['前髪は絶好調。毛先はまあまあ。今日は前髪を信じよう。','片方の耳にかけたら、急にいい感じになるかも。','ちょっと手をかけると、ちゃんと応えてくれる髪の日。','頑張ってないのに、なんとなくまとまる。今日はそれで勝ち。','いつもの分け目をちょっと変えたら「こっちもアリ」ってなるかも。','朝よりお昼のほうが、なぜか髪がなじんでいい感じ。','今日は毛先だけ整えれば、だいたいなんとかなりそう。','完璧じゃない。でもなんか雰囲気はいい。そういう日。','鏡を見る角度によっては、かなりいい感じ。今日はこの角度で話しかけよう。','今日は髪とまあまあ気が合いそう。細かいことは気にしないのが吉。']},
 '小吉':{asset:'shokichi.png',messages:['右はいい感じ。左はまだ話し合い中。','前髪だけ、別の予定があるみたい。','今日は毛先が自由行動しがち。集合時間は未定です。','朝はいい感じ。でも油断すると1か所だけハネるかも。','いつもの分け目が、今日はなんとなくしっくりこない。迷子になる前に決めておこう。','直したところとは別の場所がハネる予感。追いかけすぎ注意。','今日は片側だけボリューム出がち。左右の意見が合ってません。','前から見るといい感じ。横から見ると「あれ？」がいるかも。','髪を触れば触るほど迷走しそう。今日は早めの決断が吉。','なんか惜しい。でもどこが惜しいのかは、髪も教えてくれません。']},
 '吉':{asset:'kichi.png',messages:['今日は前髪が気になるかも。話しかけるなら絶対に横からお願いします。','前髪のベストタイム、午前中説。','今日は風との相性がちょっと悪そう。外に出たら本番です。','セットした方向と、髪が行きたい方向が違うみたい。','今日はボリュームが欲しいところだけ控えめ。遠慮しなくていいのに。','夕方の髪には期待しすぎない。それも優しさです。','今日は髪が言うことを聞くとは限りません。交渉はやさしく。','耳にかけても出てくる毛が一本。今日はそこが主役かも。','家ではまとまってたんです。本当です。','今日は100点を目指さない。それだけでだいぶ気が楽。']},
 '凶':{asset:'kyo.png',messages:['家を出た瞬間がピークかも。写真は早めに。','湿気を感じた髪が、いつもより本気を出しそう。','寝ぐせがなかなかの強敵。今日は長期戦の予感。','鏡の前では完璧。外に出たら第二形態かも。','直したはずのハネが、気づいたら元の場所に戻ってるかも。帰巣本能かな。','前髪、今日は完全に自分の意思で動いてます。こちらの指示は通りません。','右を直したら左がハネる。左を直したら右がハネる。今日は終わりが見えません。','今日は風が吹くたび髪型が変わりそう。何パターン楽しめるかな。','湿気・風・寝ぐせ。本日の髪、フルメンバーでお待ちしています。','今日はもう、髪型じゃなくて“個性”ってことにしよう。']}
};
const rankOrder=['髪吉','大吉','中吉','吉','小吉','凶'];
const lucky=`変顔|今日は何しても無敵の可愛さ\n写真を撮る|今日の髪、証拠を残そう\n耳かけ|耳かけ仕草でラブ上等\n振り向く|後ろ髪まで仕事します\n鏡を二度見|うん、やっぱり今日いいじゃん\n髪をなびかせる|今日は風まで演出です\n分け目チェンジ|1cmずらして運気もチェンジ\nひとつ結び|迷った日はまとめて解決\nいつもと逆分け|反対側にもチャンスをあげよう\nヘアアレンジ|いつもと違う自分もアリ\nミニコーム|今日のお守りに一本\nヘアクリップ|いざという時の最終兵器\nヘアピン|困った毛はピンで現行犯逮捕\nバーム|隠し味にバームを少々\nオイル|毛先にほんの少しだけ\nヘアミルク|パサつく毛先にミルク補給\nスプレー|決まったところで時を止めよう\nコテ|ひと巻きで気分も上向き\nアイロン|今日は熱の力を借りよう\nくるくるドライヤー|前髪のご機嫌とりに一本\n霧吹き|寝ぐせは根元から撲滅\nドライヤー|根元から話せば分かるはず\n鏡|後ろ姿まで見たら今日も完璧\nシュシュ|まとめたら、それはもうアレンジです\nウインク|髪が決まればウインクも決まる\n自撮り|盛れてるうちに一枚どうぞ\n髪をかき上げる|今日はちょっといい女ぶっていこう\n首をかしげる|寝違えてないよ、可愛いでしょ？\nスキップ|髪も気分も弾ませていこう\n笑顔|最後は笑ったもん勝ち\nポニーテール|結んだ瞬間、今日の正解\nお団子|まとまらないなら丸めちゃえ\nヘアゴム|雨にも風にもクセにも負けず\nカチューシャ|今日はつけたもん勝ち\nブラシ|もつれた関係、一度とかそう\n大きめクリップ|まとめる力は正義です\n細めヘアピン|一本の反抗も見逃しません\nワックス|ちょい足しで髪にやる気注入\nヘアマスク|今夜は髪にもごちそうを\nタオル|ゴシゴシ禁止、髪とは仲良く\n冷風|ドライヤーも喧嘩も最後は冷風に\n頭皮マッサージ|頭皮にもご機嫌とりを\n毛先保湿|毛先にはちょっと甘やかしを\nいつもと違う道|髪がいい日は寄り道も吉\n誰かに会う|今日の髪、見せずに終われない\n二度見|一度じゃ足りない可愛さです\n髪をかき上げる|可愛いだけが私じゃない\n横を向く|正面だけが私じゃない\n上目づかい|髪も目線も計算どおり\n前髪を分ける|ダメなら今日は道をあけよう\nストレートアイロン|曲がった毛とは今日で和解\nコテ|巻けばなんとかなる説、あります\nオイル|ツヤは裏切らない\nヘアミルク|毛先にも水分補給を\nバーム|迷子の毛、こちらへどうぞ\nヘアクリップ|まとまらないなら挟んだもん勝ち\nヘアピン|出てくる毛にはお引き取り願おう\n鏡|見るたび可愛いは更新できます\nドライヤー|急がば乾かせ\nブラッシング|髪も気持ちも、もつれは早めに\nトリートメント|今日くらい髪を甘やかそう\n美容室の予約|髪の悩みはプロに丸投げも吉\nアホ毛スティック|飛び出す元気は今日はしまっておこう\n自分を褒める|今日も可愛い。はい決定\n前髪を触らない|触らぬ前髪に乱れなし\n時計|髪に時間を取られて遅刻しそう\nイヤリング|耳にかける理由、できました\n帽子|最終手段じゃない、立派な作戦です\n折りたたみ傘|雨との戦いは準備が9割\nリップ|髪も唇もツヤは大事\n香水|振り向いた後までいい女\nハンカチ|汗と前髪、早めの対応が吉\n大きめバッグ|ヘア道具、全部入れれば怖くない\n寄り道|髪がいい日はまっすぐ帰れない\nシャワー|寝ぐせが強い日は全面戦争\nバーム|まとまりは買えます。少量で\nヘアミルク|毛先にもミルクの時間です\nアホ毛スティック|今日も上空の治安を守ります\nくるくるドライヤー|くるくるした分、可愛さ上乗せ\nドライヤー|凶でも大丈夫。ドライヤー後ろからあてれば追い風の私`.split('\n').map(x=>{const [name,text]=x.split('|');return{name,text}});
// あみだ線そのものから読んだ固定の到着先。ここは毎日変えない。
const route={pink:'blue',yellow:'green',blue:'pink',green:'yellow'};
const starts=['pink','yellow','blue','green'];
let current;
document.querySelector('#character-pool').innerHTML=chars.map(c=>`<div class="character"><img src="${A+c.textFile}" alt="${c.name}"></div>`).join('');
function pick(list,n){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a.slice(0,n)}
function token(x){return typeof x==='string'?x:(x.id||`${x.name}|${x.text||''}`)}
function evenlyPick(key,list,n){const byId=new Map(list.map(x=>[token(x),x]));let bag;try{bag=JSON.parse(localStorage.getItem(key)||'[]')}catch{bag=[]}bag=Array.isArray(bag)?bag.filter(id=>byId.has(id)):[];const chosen=[],chosenIds=new Set();while(chosen.length<n){if(!bag.length)bag=pick(list,list.length).map(token);const id=bag.pop(),item=byId.get(id);if(item&&!chosenIds.has(id)){chosen.push(item);chosenIds.add(id)}}localStorage.setItem(key,JSON.stringify(bag));return chosen}\nfunction avoid(key,list,n){const used=JSON.parse(localStorage.getItem(key)||'[]');const fresh=list.filter(x=>!used.includes(token(x)));const chosen=pick(fresh.length>=n?fresh:list,n);localStorage.setItem(key,JSON.stringify([...used,...chosen.map(token)].slice(-Math.max(n,154))));return chosen}
async function create(){const people=avoid('kamidakuji-characters',chars,4);const rankNames=evenlyPick('kamidakuji-ranks',rankOrder,4).sort((a,b)=>rankOrder.indexOf(a)-rankOrder.indexOf(b));const luckySet=avoid('kamidakuji-lucky',lucky,4);const entries=starts.map((color,i)=>{const rank=rankNames[i],r=ranks[rank];return{start:color,goal:route[color],character:people[i],rank,message:evenlyPick('kamidakuji-message-'+rank,r.messages,1)[0],lucky:luckySet[i]}});current={entries};document.querySelector('#download').disabled=true;document.querySelector('#status').textContent='8場面を作成中です。少し待ってね。';await render();document.querySelector('#download').disabled=false;document.querySelector('#status').textContent='今日の組み合わせを作りました。下の8場面を確認してください。'}
const imageCache=new Map(), alphaCache=new WeakMap(), cleanedKoterinCache=new WeakMap();
const amidaX={pink:100,yellow:348,blue:592,green:840};
const amidaStartY=662, amidaGoalY=1398;
const rungs=[
 {y:789,a:0,b:1},{y:789,a:2,b:3},
 {y:864,a:1,b:2},
 {y:936,a:0,b:1},{y:936,a:2,b:3},
 {y:1010,a:1,b:2},
 {y:1084,a:0,b:1},{y:1084,a:2,b:3}
];
const accent={髪吉:'#ff6687',大吉:'#e5ad1b',中吉:'#36aeea',吉:'#a56cec',小吉:'#68c966',凶:'#f2627b'};
function load(src){if(!imageCache.has(src))imageCache.set(src,new Promise((ok,no)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=no;im.src=src}));return imageCache.get(src)}
async function alphaBounds(im){if(alphaCache.has(im))return alphaCache.get(im);const probe=document.createElement('canvas');probe.width=im.width;probe.height=im.height;const pctx=probe.getContext('2d',{willReadFrequently:true});pctx.drawImage(im,0,0);const data=pctx.getImageData(0,0,im.width,im.height).data;let l=im.width,t=im.height,r=-1,b=-1;for(let y=0;y<im.height;y++)for(let x=0;x<im.width;x++)if(data[(y*im.width+x)*4+3]>12){l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y)}const result={l,t,w:Math.max(1,r-l+1),h:Math.max(1,b-t+1)};alphaCache.set(im,result);return result}
function cleanKoterin(im){
 if(cleanedKoterinCache.has(im))return cleanedKoterinCache.get(im);
 const c=makeCanvas(im.width,im.height),ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(im,0,0);const pixels=ctx.getImageData(0,0,c.width,c.height),d=pixels.data,w=c.width,h=c.height,clear=new Uint8Array(w*h),q=[];
 const isChecker=i=>{const r=d[i*4],g=d[i*4+1],b=d[i*4+2];return Math.max(r,g,b)-Math.min(r,g,b)<12};
 const add=i=>{if(i>=0&&i<w*h&&!clear[i]&&isChecker(i)){clear[i]=1;q.push(i)}};
 for(let x=0;x<w;x++){add(x);add((h-1)*w+x)}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1)}
 for(let p=0;p<q.length;p++){const i=q[p],x=i%w,y=(i/w)|0;if(x)add(i-1);if(x+1<w)add(i+1);if(y)add(i-w);if(y+1<h)add(i+w)}
 for(const i of q)d[i*4+3]=0;ctx.putImageData(pixels,0,0);cleanedKoterinCache.set(im,c);return c;
}
async function drawCharacter(ctx,entry,x,bottom,width,useText=false,centerOnPath=false){
 let im=await load(A+(useText?entry.character.textFile:entry.character.file));
 if(entry.character.name==='こてりん'&&!useText)im=cleanKoterin(im);
 const b=await alphaBounds(im),height=width*b.h/b.w;
 const top=centerOnPath?bottom-height/2:bottom-height;
 ctx.drawImage(im,b.l,b.t,b.w,b.h,x-width/2,top,width,height)
}
async function fixKoterinPool(){const target=document.querySelector('[data-koterin-preview]');if(!target)return;const im=cleanKoterin(await load(A+'koterin.png')),b=await alphaBounds(im),c=makeCanvas(180,180),ctx=c.getContext('2d'),s=Math.min(150/b.w,150/b.h);ctx.drawImage(im,b.l,b.t,b.w,b.h,15+(150-b.w*s)/2,15+(150-b.h*s)/2,b.w*s,b.h*s);target.src=c.toDataURL('image/png')}
function makeCanvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function linesFor(ctx,text,maxWidth){const lines=[];let line='';for(const ch of [...text]){if(ctx.measureText(line+ch).width>maxWidth&&line){lines.push(line);line=ch}else line+=ch}if(line)lines.push(line);return lines}
function centeredText(ctx,text,x,centerY,maxWidth,lineHeight,fill,stroke='#fff',strokeWidth=5){const lines=linesFor(ctx,text,maxWidth);const first=centerY-(lines.length-1)*lineHeight/2;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.lineWidth=strokeWidth;for(let i=0;i<lines.length;i++){const y=first+i*lineHeight;ctx.strokeText(lines[i],x,y);ctx.fillText(lines[i],x,y)}}
function pathFor(color){let col=starts.indexOf(color),points=[[amidaX[color],amidaStartY]];for(const rung of rungs){if(col===rung.a||col===rung.b){points.push([amidaX[starts[col]],rung.y]);col=col===rung.a?rung.b:rung.a;points.push([amidaX[starts[col]],rung.y])}}points.push([amidaX[starts[col]],amidaGoalY]);return points}
function along(points,t){let total=0;for(let i=1;i<points.length;i++)total+=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);let want=total*Math.min(1,Math.max(0,t));for(let i=1;i<points.length;i++){const dx=points[i][0]-points[i-1][0],dy=points[i][1]-points[i-1][1],d=Math.hypot(dx,dy);if(want<=d){const f=d?want/d:0;return[points[i-1][0]+dx*f,points[i-1][1]+dy*f]}want-=d}return points.at(-1)}
async function scene(kind,entry,progress=1){
 const bgName=kind==='select'?'select.png':kind==='start'||kind==='travel'?'start.png':kind==='goal'?'goal.png':kind==='results'?'results.png':ranks[entry?.rank||'大吉'].asset;
 const bg=await load(A+bgName),c=makeCanvas(bg.width,bg.height),ctx=c.getContext('2d');ctx.drawImage(bg,0,0);
 if(kind==='select'||kind==='start')for(const [i,e] of current.entries.entries()){const base={しゃんぷぅ:145,だっかる:145}[e.character.name]||128;const size=kind==='select'?Math.round(base*1.55):base;const hop=kind==='select'?Math.max(0,Math.sin(progress*Math.PI*6+i*.8))*16:0;await drawCharacter(ctx,e,amidaX[e.start],amidaStartY+4-hop,size,true)}
 if(kind==='travel')for(const e of current.entries){const [x,y]=along(pathFor(e.start),progress);await drawCharacter(ctx,e,x,y,118,false,true)}
 if(kind==='goal'||kind==='results')for(const e of current.entries){const size=kind==='results'&&['こてりん','ろっどん'].includes(e.character.name)?150:178;await drawCharacter(ctx,e,amidaX[e.goal],amidaGoalY,size)}
 if(kind==='card'){
   // 空テンプレート画像の元サイズ(1047px)をそのまま使う。引き伸ばさない。
   await drawCharacter(ctx,entry,524,785,400,true);
   ctx.font='900 37px "Hiragino Sans","Yu Gothic",sans-serif';
   centeredText(ctx,entry.message,524,896,850,52,accent[entry.rank]);
   ctx.font='900 43px "Hiragino Sans","Yu Gothic",sans-serif';centeredText(ctx,entry.lucky.name,524,1055,760,48,'#15110e','transparent',0);
   ctx.font='900 47px "Hiragino Sans","Yu Gothic",sans-serif';centeredText(ctx,entry.lucky.text,524,1285,850,62,'#111','transparent',0);
 }
 return c;
}
async function render(){const p=document.querySelector('#pages');p.innerHTML='';const cards=[['選ぶ','select'],['スタート','start'],['ゴール','goal'],['結果発表','results'],...current.entries.map(e=>[`${e.character.name}・${e.rank}`,'card',e])];for(const [label,kind,e]of cards){const article=document.createElement('article');article.className='scene';article.innerHTML=`<p>${label}</p>`;const canvas=await scene(kind,e);canvas.className='scene-canvas';article.append(canvas);p.append(article)}const s=document.querySelector('#summary');s.hidden=false;s.innerHTML=current.entries.map(e=>`<div class="chip"><b>${e.character.name}（${e.start}→${e.goal}）</b><span>${e.rank}</span></div>`).join('')}
function fitToVideo(video,frame){const ctx=video.getContext('2d');ctx.fillStyle='#fffdf8';ctx.fillRect(0,0,1080,1920);const s=Math.min(1080/frame.width,1920/frame.height),w=frame.width*s,h=frame.height*s;ctx.drawImage(frame,(1080-w)/2,(1920-h)/2,w,h)}
let videoUrl='';
async function exportMp4(){
 if(!current)return;const btn=document.querySelector('#download'),save=document.querySelector('#save-video');btn.disabled=true;save.hidden=true;document.querySelector('#status').textContent='MP4を書き出しています。少し待ってね。';
 const video=makeCanvas(1080,1920),stream=video.captureStream(30);let mime=MediaRecorder.isTypeSupported('video/mp4;codecs=h264')?'video/mp4;codecs=h264':'video/webm;codecs=vp9';const rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:7000000}),parts=[];rec.ondataavailable=e=>e.data.size&&parts.push(e.data);rec.start();
 const hold=async(kind,e,ms)=>{fitToVideo(video,await scene(kind,e));await new Promise(r=>setTimeout(r,ms))};
 await hold('select',null,2500);await hold('start',null,1200);
 // 線は固定。4人だけが、実際のあみだの横線を通って移動する。
 for(let i=0;i<=36;i++){fitToVideo(video,await scene('travel',null,i/36));await new Promise(r=>setTimeout(r,85))}
 await hold('goal',null,1700);await hold('results',null,1500);
 for(const e of current.entries)await hold('card',e,5000);
 const stopped=new Promise(r=>rec.addEventListener('stop',r,{once:true}));rec.stop();await stopped;
 const blob=new Blob(parts,{type:mime});if(videoUrl)URL.revokeObjectURL(videoUrl);videoUrl=URL.createObjectURL(blob);const ext=mime.includes('mp4')?'mp4':'webm';save.href=videoUrl;save.download=`今日の髪だくじ_${new Date().toISOString().slice(0,10)}.${ext}`;save.hidden=false;btn.disabled=false;document.querySelector('#status').textContent='動画ができました。緑の「動画を保存する」を押してね。';
}
document.querySelector('#generate').onclick=create;document.querySelector('#download').onclick=exportMp4;
fixKoterinPool();

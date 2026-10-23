let instagramFfmpeg,instagramFfmpegApi,instagramFfmpegUtil,openingImage,endingImage;
async function openingFrame(){if(!openingImage)openingImage=await new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src='assets/opening.png';});const frame=makeCanvas(openingImage.width,openingImage.height);frame.getContext('2d').drawImage(openingImage,0,0);return frame;}
async function endingFrame(){if(!endingImage)endingImage=await new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src='assets/1-写真1.jpg';});const frame=makeCanvas(endingImage.width,endingImage.height);frame.getContext('2d').drawImage(endingImage,0,0);return frame;}
async function loadInstagramFfmpeg(){if(instagramFfmpeg)return instagramFfmpeg;instagramFfmpegApi=window.FFmpegWASM||await import('https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js');instagramFfmpegUtil=window.FFmpegUtil||await import('https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js');const {FFmpeg}=instagramFfmpegApi,{toBlobURL}=instagramFfmpegUtil;const base='https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';instagramFfmpeg=new FFmpeg();await instagramFfmpeg.load({coreURL:await toBlobURL(base+'/ffmpeg-core.js','text/javascript'),wasmURL:await toBlobURL(base+'/ffmpeg-core.wasm','application/wasm'),workerURL:await toBlobURL('https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/umd/814.ffmpeg.js','text/javascript')});return instagramFfmpeg;}
async function loadMp4Muxer(){return await import('https://cdn.jsdelivr.net/npm/mp4-muxer@5.2.2/build/mp4-muxer.mjs')}
// iPhone Safari は canvas.captureStream が使えないことがあるため、画像の各コマを直接 H.264/MP4 にする予備ルート。
async function exportWithWebCodecs(status){
 if(!window.VideoEncoder||!window.VideoFrame)throw new Error('WebCodecs is unavailable');
 const {Muxer,ArrayBufferTarget}=await loadMp4Muxer(),width=1080,height=1920,fps=30,target=new ArrayBufferTarget();
 const muxer=new Muxer({target,video:{codec:'avc',width,height},fastStart:'in-memory'});
 let encodeError;
 const encoder=new VideoEncoder({output:(chunk,meta)=>muxer.addVideoChunk(chunk,meta),error:error=>{encodeError=error}});
 encoder.configure({codec:'avc1.42001f',width,height,bitrate:5500000,framerate:fps,avc:{format:'avc'}});
 const video=makeCanvas(width,height);let frameNo=0;
 const add=async(frame,count)=>{fitToVideo(video,frame);for(let i=0;i<count;i++){const vf=new VideoFrame(video,{timestamp:Math.round(frameNo*1000000/fps)});encoder.encode(vf,{keyFrame:frameNo%60===0});vf.close();frameNo++;if(frameNo%30===0)await new Promise(r=>setTimeout(r,0));if(encodeError)throw encodeError}};
 status.textContent='スマホ向けMP4を作成しています。少し待ってね。';
 await add(await openingFrame(),60);
 for(let i=0;i<30;i++)await add(await scene('select',null,i/30),3);
 await add(await scene('start'),36);
 for(let i=0;i<60;i++)await add(await scene('travel',null,i/59),3);
 await add(await scene('goal'),51);await add(await scene('results'),45);
 for(const e of current.entries)await add(await scene('card',e),150);
 await add(await endingFrame(),90);
 await encoder.flush();if(encodeError)throw encodeError;muxer.finalize();
 return new Blob([target.buffer],{type:'video/mp4'});
}
function offerDownload(blob,save,status){if(videoUrl)URL.revokeObjectURL(videoUrl);videoUrl=URL.createObjectURL(blob);save.href=videoUrl;save.download='今日の髪だくじ_'+new Date().toISOString().slice(0,10)+'.mp4';save.hidden=false;status.textContent='Instagram用MP4ができました。緑の「動画を保存する」を押してね。';}
async function exportInstagramMp4(){if(!current)return;const btn=document.querySelector('#download'),save=document.querySelector('#save-video'),status=document.querySelector('#status');let fallbackBlob;btn.disabled=true;save.hidden=true;status.textContent='MP4を書き出しています。少し待ってね。';try{
 const video=makeCanvas(1080,1920);
 if(!video.captureStream||!window.MediaRecorder){offerDownload(await exportWithWebCodecs(status),save,status);return}
 // Safari は h264 という別名ではなく avc1／video/mp4 を返す。Safari対応のMP4形式を先に選ぶ。
 const stream=video.captureStream(30),mime=['video/mp4;codecs=avc1.42E01E','video/mp4;codecs=avc1','video/mp4','video/webm;codecs=vp9'].find(type=>MediaRecorder.isTypeSupported(type));
 if(!mime)throw new Error('No supported video recording format');
 const rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:7000000}),parts=[];rec.ondataavailable=e=>e.data.size&&parts.push(e.data);rec.start();
 const holdFrame=async(frame,ms)=>{fitToVideo(video,frame);await new Promise(r=>setTimeout(r,ms))};
 // 本のページを右からめくるように、次の場面へつなぐ。
 const turn=async(from,to)=>{for(let i=0;i<=14;i++){const p=i/14,ctx=video.getContext('2d');fitToVideo(video,to);ctx.save();ctx.globalAlpha=1-p;ctx.drawImage(from,0,0,1080,1920);ctx.restore();await new Promise(r=>setTimeout(r,35))}};
 const intro=await openingFrame(),selectStart=await scene('select',null,0);await holdFrame(intro,2000);await turn(intro,selectStart);
 for(let i=0;i<30;i++){fitToVideo(video,await scene('select',null,i/30));await new Promise(r=>setTimeout(r,83))}
 const startFrame=await scene('start');fitToVideo(video,startFrame);await holdFrame(startFrame,1200);
 const travelStart=await scene('travel',null,0);await turn(startFrame,travelStart);for(let i=0;i<60;i++){fitToVideo(video,await scene('travel',null,i/59));await new Promise(r=>setTimeout(r,85))}
 const goalFrame=await scene('goal');await turn(await scene('travel',null,1),goalFrame);await holdFrame(goalFrame,1700);
 const resultsFrame=await scene('results');fitToVideo(video,resultsFrame);await holdFrame(resultsFrame,1500);
 let previous=resultsFrame;for(const e of current.entries){const card=await scene('card',e);await turn(previous,card);await holdFrame(card,5000);previous=card}
 const ending=await endingFrame();await turn(previous,ending);await holdFrame(ending,3000);
 const stopped=new Promise(r=>rec.addEventListener('stop',r,{once:true}));rec.stop();await stopped;let blob=new Blob(parts,{type:mime});fallbackBlob=blob;
 if(!mime.includes('mp4')){status.textContent='Instagram用MP4に変換しています。初回は少し待ってね。';const ffmpeg=await loadInstagramFfmpeg(),{fetchFile}=instagramFfmpegUtil;await ffmpeg.writeFile('input.webm',await fetchFile(blob));await ffmpeg.exec(['-i','input.webm','-c:v','libx264','-preset','veryfast','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart','output.mp4']);const data=await ffmpeg.readFile('output.mp4');await ffmpeg.deleteFile('input.webm');await ffmpeg.deleteFile('output.mp4');blob=new Blob([data.buffer],{type:'video/mp4'})}
 offerDownload(blob,save,status);
}catch(error){console.error(error);try{offerDownload(await exportWithWebCodecs(status),save,status)}catch(mobileError){console.error(mobileError);if(fallbackBlob){if(videoUrl)URL.revokeObjectURL(videoUrl);videoUrl=URL.createObjectURL(fallbackBlob);save.href=videoUrl;save.download='今日の髪だくじ_'+new Date().toISOString().slice(0,10)+'.webm';save.hidden=false;status.textContent='MP4変換はできませんでしたが、動画はできています。緑の「動画を保存する」を押して、CanvaでMP4にしてください。'}else status.textContent='この端末ではMP4作成に対応していません。iPhoneのSafariを最新版にして、もう一度試してね。'}}finally{btn.disabled=false}}
document.querySelector('#download').onclick=exportInstagramMp4;

const $=id=>document.getElementById(id);let player=null,muted=false,serial=0;
async function start(){const request=++serial;player?.remove();player=null;$('player-container').replaceChildren();$('loading').hidden=false;$('status').textContent='';
try{const ruffle=window.RufflePlayer?.newest();if(!ruffle)throw new Error('Player indisponível');player=ruffle.createPlayer();player.setAttribute('aria-label','Aplicativo Áudimus');$('player-container').append(player);const active=player;
await active.ruffle().load({url:'assets/web/audimus-web.swf',autoplay:'on',splashScreen:false,unmuteOverlay:'hidden',scale:'showAll',forceScale:true,letterbox:'on',allowScriptAccess:false,allowNetworking:'internal',openUrlMode:'deny',logLevel:'warn'});
if(request!==serial||active!==player)return;active.ruffle().volume=muted?0:1;$('loading').hidden=true;if(document.hidden||$('about').open)active.ruffle().suspend();
}catch(error){if(request!==serial)return;$('loading').hidden=true;$('status').textContent='Não foi possível abrir o aplicativo. Verifique a conexão e use Reiniciar para tentar novamente.';console.error(error);}}
$('restart').addEventListener('click',start);document.querySelector('.brand').addEventListener('click',start);
$('mute').addEventListener('click',()=>{muted=!muted;if(player)player.ruffle().volume=muted?0:1;$('mute').textContent=muted?'Ativar som':'Silenciar';$('mute').setAttribute('aria-pressed',String(muted));});
$('fullscreen').addEventListener('click',()=>$('stage').requestFullscreen().catch(()=>{$('status').textContent='Tela cheia indisponível neste navegador.';}));$('exit-fullscreen').addEventListener('click',()=>document.exitFullscreen().catch(()=>{}));
$('about-open').addEventListener('click',()=>{player?.ruffle().suspend();$('about').showModal();});$('about-close').addEventListener('click',()=>$('about').close());$('about').addEventListener('close',()=>{if(player&&!document.hidden)player.ruffle().resume();});
document.addEventListener('visibilitychange',()=>{if(!player)return;if(document.hidden)player.ruffle().suspend();else if(!$('about').open)player.ruffle().resume();});start();

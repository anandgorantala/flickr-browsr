
 'use strict';
 
 
 /*
 * Shadowbox.js, version 3.0.3
 * http://shadowbox-js.com/
 */ 
 (function(F,X){var R,S,K,L;function Y(a){b.options.enableKeys&&(a?B:G)(document,"keydown",Ea)}function Ea(a){if(!a.metaKey&&!a.shiftKey&&!a.altKey&&!a.ctrlKey){var d;switch(a.keyCode){case 81:case 88:case 27:d=b.close;break;case 37:d=b.previous;break;case 39:d=b.next;break;case 32:d="number"==typeof p?b.pause:b.play}d&&(a.preventDefault(),d())}}function ia(a){Y(!1);var d=b.getCurrent(),c="inline"==d.player?"html":d.player;if("function"!=typeof b[c])throw"unknown player "+c;a&&(b.player.remove(),b.revertOptions(),
b.applyOptions(d.options||{}));b.player=new b[c](d,b.playerId);if(1<b.gallery.length&&(d=b.gallery[b.current+1]||b.gallery[0],"img"==d.player&&((new Image).src=d.content),d=b.gallery[b.current-1]||b.gallery[b.gallery.length-1],"img"==d.player))(new Image).src=d.content;b.skin.onLoad(a,Fa)}function Fa(){if(q)if("undefined"!=typeof b.player.ready)var a=setInterval(function(){q?b.player.ready&&(clearInterval(a),a=null,b.skin.onReady(ja)):(clearInterval(a),a=null)},10);else b.skin.onReady(ja)}function ja(){q&&
(b.player.append(b.skin.body,b.dimensions),b.skin.onShow(Ga))}function Ga(){if(q){if(b.player.onLoad)b.player.onLoad();b.options.onFinish(b.getCurrent());b.isPaused()||b.play();Y(!0)}}function x(a,d){for(var c in d)a[c]=d[c];return a}function r(a,d){for(var c=0,b=a.length,f=a[0];c<b&&!1!==d.call(f,c,f);f=a[++c]);}function ka(a,d){return a.replace(/\{(\w+?)\}/g,function(a,b){return d[b]})}function M(){}function n(a){return document.getElementById(a)}function B(a,d,c){jQuery(a).bind(d,c)}function G(a,
d,c){jQuery(a).unbind(d,c)}function la(){if(!Z){try{document.documentElement.doScroll("left")}catch(a){setTimeout(la,1);return}b.load()}}function ma(a){b.open(this);b.gallery.length&&a.preventDefault()}function na(){var a=b.dimensions;x(t.style,{height:a.innerHeight+"px",width:a.innerWidth+"px"})}function oa(a){a.preventDefault();a=[a.pageX,a.pageY];K=a[0];L=a[1];C=n(b.player.id);B(document,"mousemove",pa);B(document,"mouseup",qa);b.isGecko&&(t.style.cursor="-moz-grabbing")}function pa(a){var d=b.player,
c=b.dimensions,a=[a.pageX,a.pageY],e=a[0]-K;K+=e;R=Math.max(Math.min(0,R+e),c.innerWidth-d.width);a=a[1]-L;L+=a;S=Math.max(Math.min(0,S+a),c.innerHeight-d.height);x(C.style,{left:R+"px",top:S+"px"})}function qa(){G(document,"mousemove",pa);G(document,"mouseup",qa);b.isGecko&&(t.style.cursor="-moz-grab")}function s(a,d,c,e,f){var g="opacity"==d,h=g?b.setOpacity:function(a,c){a.style[d]=""+c+"px"};if(0==e||!g&&!b.options.animate||g&&!b.options.animateFade)h(a,c),f&&f();else{var k=parseFloat(b.getStyle(a,
d))||0,j=c-k;if(0==j)f&&f();else var e=1E3*e,i=(new Date).getTime(),o=b.ease,Ha=i+e,m,n=setInterval(function(){m=(new Date).getTime();m>=Ha?(clearInterval(n),n=null,h(a,c),f&&f()):h(a,k+o((m-i)/e)*j)},10)}}function ra(){u.style.height=b.getWindowSize("Height")+"px";u.style.width=b.getWindowSize("Width")+"px"}function $(){u.style.top=document.documentElement.scrollTop+"px";u.style.left=document.documentElement.scrollLeft+"px"}function sa(a){a?r(aa,function(a,c){c[0].style.visibility=c[1]||""}):(aa=
[],r(b.options.troubleElements,function(a,c){r(document.getElementsByTagName(c),function(a,d){aa.push([d,d.style.visibility]);d.style.visibility="hidden"})}))}function y(a,d){var c=n("sb-nav-"+a);c&&(c.style.display=d?"":"none")}function ta(a,d){var c=n("sb-loading"),e=b.getCurrent().player,e="img"==e||"html"==e;if(a){b.setOpacity(c,0);c.style.display="block";var f=function(){b.clearOpacity(c);d&&d()};e?s(c,"opacity",1,b.options.fadeDuration,f):f()}else f=function(){c.style.display="none";b.clearOpacity(c);
d&&d()},e?s(c,"opacity",0,b.options.fadeDuration,f):f()}function N(a,d,c,e){var f=n("sb-wrapper-inner"),c=c?b.options.resizeDuration:0;s(D,"top",d,c);s(f,"height",a,c,e)}function O(a,d,c,e){c=c?b.options.resizeDuration:0;s(D,"left",d,c);s(D,"width",a,c,e)}function ba(a,d){var c=n("sb-body-inner"),a=parseInt(a),d=parseInt(d),e=D.offsetHeight-c.offsetHeight,c=D.offsetWidth-c.offsetWidth,f=z.offsetHeight,g=z.offsetWidth,h=parseInt(b.options.viewportPadding)||20;return b.setDimensions(a,d,f,g,e,c,h,b.player&&
"drag"!=b.options.handleOversize)}var b={version:"3.0.3"},l=navigator.userAgent.toLowerCase();-1<l.indexOf("windows")||-1<l.indexOf("win32")?b.isWindows=!0:-1<l.indexOf("macintosh")||-1<l.indexOf("mac os x")?b.isMac=!0:-1<l.indexOf("linux")&&(b.isLinux=!0);b.isIE=-1<l.indexOf("msie");b.isIE6=-1<l.indexOf("msie 6");b.isIE7=-1<l.indexOf("msie 7");b.isGecko=-1<l.indexOf("gecko")&&-1==l.indexOf("safari");b.isWebKit=-1<l.indexOf("applewebkit/");var Ia=/#(.+)$/,Ja=/^(light|shadow)box\[(.*?)\]/i,Ka=/\s*([a-z_]*?)\s*=\s*(.+)\s*/,
La=/[0-9a-z]+$/i,Ma=/(.+\/)shadowbox\.js/i,q=!1,ua=!1,va={},A=0,T,p;b.current=-1;b.dimensions=null;b.ease=function(a){return 1+Math.pow(a-1,3)};b.errorInfo={fla:{name:"Flash",url:"http://www.adobe.com/products/flashplayer/"},qt:{name:"QuickTime",url:"http://www.apple.com/quicktime/download/"},wmp:{name:"Windows Media Player",url:"http://www.microsoft.com/windows/windowsmedia/"},f4m:{name:"Flip4Mac",url:"http://www.flip4mac.com/wmv_download.htm"}};b.gallery=[];b.onReady=M;b.path=null;b.player=null;
b.playerId="sb-player";b.options={animate:!0,animateFade:!0,autoplayMovies:!0,continuous:!1,enableKeys:!0,flashParams:{bgcolor:"#000000",allowfullscreen:!0},flashVars:{},flashVersion:"9.0.115",handleOversize:"resize",handleUnsupported:"link",onChange:M,onClose:M,onFinish:M,onOpen:M,showMovieControls:!0,skipSetup:!1,slideshowDelay:0,viewportPadding:20};b.getCurrent=function(){return b.current>-1?b.gallery[b.current]:null};b.hasNext=function(){return b.gallery.length>1&&(b.current!=b.gallery.length-
1||b.options.continuous)};b.isOpen=function(){return q};b.isPaused=function(){return p=="pause"};b.applyOptions=function(a){va=x({},b.options);x(b.options,a)};b.revertOptions=function(){x(b.options,va)};b.init=function(a,d){if(!ua){ua=true;b.skin.options&&x(b.options,b.skin.options);a&&x(b.options,a);if(!b.path)for(var c,e=document.getElementsByTagName("script"),f=0,g=e.length;f<g;++f)if(c=Ma.exec(e[f].src)){b.path=c[1];break}if(d)b.onReady=d;if(document.readyState==="complete")b.load();else if(document.addEventListener){document.addEventListener("DOMContentLoaded",
I,false);F.addEventListener("load",b.load,false)}else if(document.attachEvent){document.attachEvent("onreadystatechange",I);F.attachEvent("onload",b.load);c=false;try{c=F.frameElement===null}catch(h){}document.documentElement.doScroll&&c&&la()}}};b.open=function(a){if(!q){a=b.makeGallery(a);b.gallery=a[0];b.current=a[1];a=b.getCurrent();if(a!=null){b.applyOptions(a.options||{});for(var a=b.errorInfo,d=b.plugins,c,e,f,g,h=0;h<b.gallery.length;++h){c=b.gallery[h];e=false;f=null;switch(c.player){case "flv":case "swf":d.fla||
(f="fla");break;case "qt":d.qt||(f="qt");break;case "wmp":b.isMac?d.qt&&d.f4m?c.player="qt":f="qtf4m":d.wmp||(f="wmp");break;case "qtwmp":d.qt?c.player="qt":d.wmp?c.player="wmp":f="qtwmp"}if(f)if(b.options.handleUnsupported=="link"){switch(f){case "qtf4m":g="shared";f=[a.qt.url,a.qt.name,a.f4m.url,a.f4m.name];break;case "qtwmp":g="either";f=[a.qt.url,a.qt.name,a.wmp.url,a.wmp.name];break;default:g="single";f=[a[f].url,a[f].name]}c.player="html";c.content='<div class="sb-message">'+ka(b.lang.errors[g],
f)+"</div>"}else e=true;else if(c.player=="inline")if(g=Ia.exec(c.content))(g=n(g[1]))?c.content=g.innerHTML:e=true;else e=true;else if(c.player=="swf"||c.player=="flv"){g=c.options&&c.options.flashVersion||b.options.flashVersion;if(b.flash&&!b.flash.hasFlashPlayerVersion(g)){c.width=310;c.height=177}}if(e){b.gallery.splice(h,1);if(h<b.current)--b.current;else if(h==b.current)b.current=h>0?h-1:h;--h}}if(b.gallery.length){a=b.getCurrent();if(b.options.onOpen(a)!==false){q=true;b.skin.onOpen(a,ia)}}}}};
b.close=function(){if(q){q=false;if(b.player){b.player.remove();b.player=null}if(typeof p=="number"){clearTimeout(p);p=null}A=0;Y(false);b.options.onClose(b.getCurrent());b.skin.onClose();b.revertOptions()}};b.play=function(){if(b.hasNext()){A||(A=b.options.slideshowDelay*1E3);if(A){T=(new Date).getTime();p=setTimeout(function(){A=T=0;b.next()},A);if(b.skin.onPlay)b.skin.onPlay()}}};b.pause=function(){if(typeof p=="number")if(A=Math.max(0,A-((new Date).getTime()-T))){clearTimeout(p);p="pause";if(b.skin.onPause)b.skin.onPause()}};
b.change=function(a){if(!(a in b.gallery))if(b.options.continuous){a=a<0?b.gallery.length+a:0;if(!(a in b.gallery))return}else return;b.current=a;if(typeof p=="number"){clearTimeout(p);p=null;A=T=0}b.options.onChange(b.getCurrent());ia(true)};b.next=function(){b.change(b.current+1)};b.previous=function(){b.change(b.current-1)};b.setDimensions=function(a,d,c,e,f,g,h,k){var j=a,i=d,o=2*h+f;a+o>c&&(a=c-o);var m=2*h+g;d+m>e&&(d=e-m);var n=(j-a)/j,l=(i-d)/i,p=n>0||l>0;k&&p&&(n>l?d=Math.round(i/j*a):l>
n&&(a=Math.round(j/i*d)));b.dimensions={height:a+f,width:d+g,innerHeight:a,innerWidth:d,top:Math.floor((c-(a+o))/2+h),left:Math.floor((e-(d+m))/2+h),oversized:p};return b.dimensions};b.makeGallery=function(a){var d=[],c=-1;typeof a=="string"&&(a=[a]);if(typeof a.length=="number"){r(a,function(a,c){d[a]=c.content?c:{content:c}});c=0}else{if(a.tagName)var e=b.getCache(a),a=e?e:b.makeObject(a);if(a.gallery){var d=[],f;for(f in b.cache){e=b.cache[f];if(e.gallery&&e.gallery==a.gallery){if(c==-1&&e.content==
a.content)c=d.length;d.push(e)}}if(c==-1){d.unshift(a);c=0}}else{d=[a];c=0}}r(d,function(a,c){d[a]=x({},c)});return[d,c]};b.makeObject=function(a,d){var c={content:a.href,title:a.getAttribute("title")||"",owner:a.getAttribute("data-owner_name")||"",owner_url:a.getAttribute("data-owner_url")||"",owner_id:a.getAttribute("data-owner_id")||"",permalink:a.getAttribute("data-permalink")||"",views:a.getAttribute("data-views")||"",link:a};if(d){d=x({},d);r(["player","title","height","width","gallery"],function(a,
b){if(typeof d[b]!="undefined"){c[b]=d[b];delete d[b]}});c.options=d}else c.options={};if(!c.player)c.player=b.getPlayer(c.content);var e=a.getAttribute("rel");if(e){var f=e.match(Ja);if(f)c.gallery=escape(f[2]);r(e.split(";"),function(a,d){(f=d.match(Ka))&&(c[f[1]]=f[2])})}return c};b.getPlayer=function(a){if(a.indexOf("#")>-1&&a.indexOf(document.location.href)==0)return"inline";var d=a.indexOf("?");d>-1&&(a=a.substring(0,d));var c;(a=a.match(La))&&(c=a[0].toLowerCase());if(c){if(b.img&&b.img.ext.indexOf(c)>
-1)return"img";if(b.swf&&b.swf.ext.indexOf(c)>-1)return"swf";if(b.flv&&b.flv.ext.indexOf(c)>-1)return"flv";if(b.qt&&b.qt.ext.indexOf(c)>-1)return b.wmp&&b.wmp.ext.indexOf(c)>-1?"qtwmp":"qt";if(b.wmp&&b.wmp.ext.indexOf(c)>-1)return"wmp"}return"iframe"};Array.prototype.indexOf||(Array.prototype.indexOf=function(a,d){var c=this.length>>>0,d=d||0;for(d<0&&(d=d+c);d<c;++d)if(d in this&&this[d]===a)return d;return-1});var U=!0,V=!0,Na=/opacity=([^)]*)/,wa=document.defaultView&&document.defaultView.getComputedStyle;
b.getStyle=function(a,d){var c;if(!U&&d=="opacity"&&a.currentStyle){c=Na.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return c===""?"1":c}if(wa){var b=wa(a,null);b&&(c=b[d]);d=="opacity"&&c==""&&(c="1")}else c=a.currentStyle[d];return c};b.appendHTML=function(a,d){if(a.insertAdjacentHTML)a.insertAdjacentHTML("BeforeEnd",d);else if(a.lastChild){var c=a.ownerDocument.createRange();c.setStartAfter(a.lastChild);c=c.createContextualFragment(d);a.appendChild(c)}else a.innerHTML=d};b.getWindowSize=
function(a){return document.compatMode==="CSS1Compat"?document.documentElement["client"+a]:document.body["client"+a]};b.setOpacity=function(a,d){var c=a.style;if(U)c.opacity=d==1?"":d;else{c.zoom=1;if(d==1){if(typeof c.filter=="string"&&/alpha/i.test(c.filter))c.filter=c.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi,"")}else c.filter=(c.filter||"").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi,"")+" alpha(opacity="+d*100+")"}};b.clearOpacity=function(a){b.setOpacity(a,1)};jQuery.fn.shadowbox=function(a){return this.each(function(){var d=
jQuery(this),c=jQuery.extend({},a||{},jQuery.metadata?d.metadata():jQuery.meta?d.data():{}),b=this.className||"";c.width=parseInt((b.match(/w:(\d+)/)||[])[1])||c.width;c.height=parseInt((b.match(/h:(\d+)/)||[])[1])||c.height;Shadowbox.setup(d,c)})};var Z=!1,I;document.addEventListener?I=function(){document.removeEventListener("DOMContentLoaded",I,false);b.load()}:document.attachEvent&&(I=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",I);b.load()}});b.load=
function(){if(!Z){if(!document.body)return setTimeout(b.load,13);Z=true;var a=document.body,d=document.createElement("div");U=typeof d.style.opacity==="string";d.style.position="fixed";d.style.margin=0;d.style.top="20px";a.appendChild(d,a.firstChild);V=d.offsetTop==20;a.removeChild(d);b.onReady();b.options.skipSetup||b.setup();b.skin.init()}};b.plugins={};if(navigator.plugins&&navigator.plugins.length){var H=[];r(navigator.plugins,function(a,d){H.push(d.name)});H=H.join(",");l=-1<H.indexOf("Flip4Mac");
b.plugins={fla:-1<H.indexOf("Shockwave Flash"),qt:-1<H.indexOf("QuickTime"),wmp:!l&&-1<H.indexOf("Windows Media"),f4m:l}}else l=function(a){var d;try{d=new ActiveXObject(a)}catch(c){}return!!d},b.plugins={fla:l("ShockwaveFlash.ShockwaveFlash"),qt:l("QuickTime.QuickTime"),wmp:l("wmplayer.ocx"),f4m:!1};var Oa=/^(light|shadow)box/i,Pa=1;b.cache={};b.select=function(a){var d=[];if(a){var c=a.length;if(c)if(typeof a=="string")b.find&&(d=b.find(a));else if(c==2&&typeof a[0]=="string"&&a[1].nodeType)b.find&&
(d=b.find(a[0],a[1]));else for(var e=0;e<c;++e)d[e]=a[e];else d.push(a)}else{var f;r(document.getElementsByTagName("a"),function(a,c){(f=c.getAttribute("rel"))&&Oa.test(f)&&d.push(c)})}return d};b.setup=function(a,d){r(b.select(a),function(a,e){b.addCache(e,d)})};b.teardown=function(a){r(b.select(a),function(a,c){b.removeCache(c)})};b.addCache=function(a,d){var c=a.shadowboxCacheKey;if(c==X){c=Pa++;a.shadowboxCacheKey=c;B(a,"click",ma)}b.cache[c]=b.makeObject(a,d)};b.removeCache=function(a){G(a,"click",
ma);delete b.cache[a.shadowboxCacheKey];a.shadowboxCacheKey=null};b.getCache=function(a){a=a.shadowboxCacheKey;return a in b.cache&&b.cache[a]};b.clearCache=function(){for(var a in b.cache)b.removeCache(b.cache[a].link);b.cache={}};var l=b,xa=function(a){for(var d="",c,b=0;a[b];b++){c=a[b];c.nodeType===3||c.nodeType===4?d=d+c.nodeValue:c.nodeType!==8&&(d=d+xa(c.childNodes))}return d},ya=function(a,d,c,b,f,g){for(var f=0,h=b.length;f<h;f++){var k=b[f];if(k){for(var k=k[a],j=false;k;){if(k.sizcache===
c){j=b[k.sizset];break}if(k.nodeType===1&&!g){k.sizcache=c;k.sizset=f}if(k.nodeName.toLowerCase()===d){j=k;break}k=k[a]}b[f]=j}}},za=function(a,d,c,b,f,g){for(var f=0,h=b.length;f<h;f++){var k=b[f];if(k){for(var k=k[a],j=false;k;){if(k.sizcache===c){j=b[k.sizset];break}if(k.nodeType===1){if(!g){k.sizcache=c;k.sizset=f}if(typeof d!=="string"){if(k===d){j=true;break}}else if(o.filter(d,[k]).length>0){j=k;break}}k=k[a]}b[f]=j}}},ca=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
da=0,Aa=Object.prototype.toString,E=!1,Ba=!0;[0,0].sort(function(){Ba=false;return 0});var o=function(a,d,c,b){var c=c||[],f=d=d||document;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!a||typeof a!=="string")return c;for(var g=[],h,k,j,m,n=true,l=ea(d),p=a;(ca.exec(""),h=ca.exec(p))!==null;){p=h[3];g.push(h[1]);if(h[2]){m=h[3];break}}if(g.length>1&&Qa.exec(a))if(g.length===2&&i.relative[g[0]])k=Ca(g[0]+g[1],d);else for(k=i.relative[g[0]]?[d]:o(g.shift(),d);g.length;){a=g.shift();i.relative[a]&&(a=
a+g.shift());k=Ca(a,k)}else{if(!b&&g.length>1&&d.nodeType===9&&!l&&i.match.ID.test(g[0])&&!i.match.ID.test(g[g.length-1])){h=o.find(g.shift(),d,l);d=h.expr?o.filter(h.expr,h.set)[0]:h.set[0]}if(d){h=b?{expr:g.pop(),set:P(b)}:o.find(g.pop(),g.length===1&&(g[0]==="~"||g[0]==="+")&&d.parentNode?d.parentNode:d,l);k=h.expr?o.filter(h.expr,h.set):h.set;for(g.length>0?j=P(k):n=false;g.length;){var q=g.pop();h=q;i.relative[q]?h=g.pop():q="";h==null&&(h=d);i.relative[q](j,h,l)}}else j=[]}j||(j=k);if(!j)throw"Syntax error, unrecognized expression: "+
(q||a);if(Aa.call(j)==="[object Array]")if(n)if(d&&d.nodeType===1)for(a=0;j[a]!=null;a++)j[a]&&(j[a]===true||j[a].nodeType===1&&Ra(d,j[a]))&&c.push(k[a]);else for(a=0;j[a]!=null;a++)j[a]&&j[a].nodeType===1&&c.push(k[a]);else c.push.apply(c,j);else P(j,c);if(m){o(m,f,c,b);o.uniqueSort(c)}return c};o.uniqueSort=function(a){if(Q){E=Ba;a.sort(Q);if(E)for(var d=1;d<a.length;d++)a[d]===a[d-1]&&a.splice(d--,1)}return a};o.matches=function(a,d){return o(a,null,null,d)};o.find=function(a,d,c){var b,f;if(!a)return[];
for(var g=0,h=i.order.length;g<h;g++){var k=i.order[g];if(f=i.leftMatch[k].exec(a)){var j=f[1];f.splice(1,1);if(j.substr(j.length-1)!=="\\"){f[1]=(f[1]||"").replace(/\\/g,"");b=i.find[k](f,d,c);if(b!=null){a=a.replace(i.match[k],"");break}}}}b||(b=d.getElementsByTagName("*"));return{set:b,expr:a}};o.filter=function(a,d,c,b){for(var f=a,g=[],h=d,k,j,m=d&&d[0]&&ea(d[0]);a&&d.length;){for(var n in i.filter)if((k=i.match[n].exec(a))!=null){var o=i.filter[n],l,p;j=false;h===g&&(g=[]);if(i.preFilter[n])if(k=
i.preFilter[n](k,h,c,g,b,m)){if(k===true)continue}else j=l=true;if(k)for(var q=0;(p=h[q])!=null;q++)if(p){l=o(p,k,q,h);var r=b^!!l;if(c&&l!=null)r?j=true:h[q]=false;else if(r){g.push(p);j=true}}if(l!==X){c||(h=g);a=a.replace(i.match[n],"");if(!j)return[];break}}if(a===f){if(j==null)throw"Syntax error, unrecognized expression: "+a;break}f=a}return h};var i=o.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")}},relative:{"+":function(a,d){var c=typeof d==="string",
b=c&&!/\W/.test(d),c=c&&!b;b&&(d=d.toLowerCase());for(var b=0,f=a.length,g;b<f;b++)if(g=a[b]){for(;(g=g.previousSibling)&&g.nodeType!==1;);a[b]=c||g&&g.nodeName.toLowerCase()===d?g||false:g===d}c&&o.filter(d,a,true)},">":function(a,d){var b=typeof d==="string";if(b&&!/\W/.test(d))for(var d=d.toLowerCase(),e=0,f=a.length;e<f;e++){var g=a[e];if(g){b=g.parentNode;a[e]=b.nodeName.toLowerCase()===d?b:false}}else{e=0;for(f=a.length;e<f;e++)(g=a[e])&&(a[e]=b?g.parentNode:g.parentNode===d);b&&o.filter(d,
a,true)}},"":function(a,d,b){var e=da++,f=za;if(typeof d==="string"&&!/\W/.test(d))var g=d=d.toLowerCase(),f=ya;f("parentNode",d,e,a,g,b)},"~":function(a,d,b){var e=da++,f=za;if(typeof d==="string"&&!/\W/.test(d))var g=d=d.toLowerCase(),f=ya;f("previousSibling",d,e,a,g,b)}},find:{ID:function(a,d,b){if(typeof d.getElementById!=="undefined"&&!b)return(a=d.getElementById(a[1]))?[a]:[]},NAME:function(a,d){if(typeof d.getElementsByName!=="undefined"){for(var b=[],e=d.getElementsByName(a[1]),f=0,g=e.length;f<
g;f++)e[f].getAttribute("name")===a[1]&&b.push(e[f]);return b.length===0?null:b}},TAG:function(a,d){return d.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,d,b,e,f,g){a=" "+a[1].replace(/\\/g,"")+" ";if(g)return a;for(var g=0,h;(h=d[g])!=null;g++)h&&(f^(h.className&&(" "+h.className+" ").replace(/[\t\n]/g," ").indexOf(a)>=0)?b||e.push(h):b&&(d[g]=false));return false},ID:function(a){return a[1].replace(/\\/g,"")},TAG:function(a){return a[1].toLowerCase()},CHILD:function(a){if(a[1]==="nth"){var d=
/(-?)(\d*)n((?:\+|-)?\d*)/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=d[1]+(d[2]||1)-0;a[3]=d[3]-0}a[0]=da++;return a},ATTR:function(a,d,b,e,f,g){d=a[1].replace(/\\/g,"");!g&&i.attrMap[d]&&(a[1]=i.attrMap[d]);a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(a,d,b,e,f){if(a[1]==="not")if((ca.exec(a[3])||"").length>1||/^\w/.test(a[3]))a[3]=o(a[3],null,null,d);else{a=o.filter(a[3],d,b,1^f);b||e.push.apply(e,a);return false}else if(i.match.POS.test(a[0])||
i.match.CHILD.test(a[0]))return true;return a},POS:function(a){a.unshift(true);return a}},filters:{enabled:function(a){return a.disabled===false&&a.type!=="hidden"},disabled:function(a){return a.disabled===true},checked:function(a){return a.checked===true},selected:function(a){a.parentNode.selectedIndex;return a.selected===true},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,d,b){return!!o(b[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},
text:function(a){return"text"===a.type},radio:function(a){return"radio"===a.type},checkbox:function(a){return"checkbox"===a.type},file:function(a){return"file"===a.type},password:function(a){return"password"===a.type},submit:function(a){return"submit"===a.type},image:function(a){return"image"===a.type},reset:function(a){return"reset"===a.type},button:function(a){return"button"===a.type||a.nodeName.toLowerCase()==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)}},
setFilters:{first:function(a,d){return d===0},last:function(a,d,b,e){return d===e.length-1},even:function(a,d){return d%2===0},odd:function(a,d){return d%2===1},lt:function(a,d,b){return d<b[3]-0},gt:function(a,d,b){return d>b[3]-0},nth:function(a,d,b){return b[3]-0===d},eq:function(a,d,b){return b[3]-0===d}},filter:{PSEUDO:function(a,d,b,e){var f=d[1],g=i.filters[f];if(g)return g(a,b,d,e);if(f==="contains")return(a.textContent||a.innerText||xa([a])||"").indexOf(d[3])>=0;if(f==="not"){d=d[3];b=0;
for(e=d.length;b<e;b++)if(d[b]===a)return false;return true}throw"Syntax error, unrecognized expression: "+f;},CHILD:function(a,b){var c=b[1],e=a;switch(c){case "only":case "first":for(;e=e.previousSibling;)if(e.nodeType===1)return false;if(c==="first")return true;e=a;case "last":for(;e=e.nextSibling;)if(e.nodeType===1)return false;return true;case "nth":var c=b[2],f=b[3];if(c===1&&f===0)return true;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){for(var k=0,e=h.firstChild;e;e=e.nextSibling)if(e.nodeType===
1)e.nodeIndex=++k;h.sizcache=g}e=a.nodeIndex-f;return c===0?e===0:e%c===0&&e/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],c=i.attrHandle[c]?i.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=c+"",f=b[2],g=b[4];return c==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=
0:f==="~="?(" "+e+" ").indexOf(g)>=0:!g?e&&c!==false:f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":false},POS:function(a,b,c,e){var f=i.setFilters[b[2]];if(f)return f(a,c,b,e)}}},Qa=i.match.POS,m;for(m in i.match)i.match[m]=RegExp(i.match[m].source+/(?![^\[]*\])(?![^\(]*\))/.source),i.leftMatch[m]=RegExp(/(^(?:.|\r|\n)*?)/.source+i.match[m].source);var P=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,
a);return b}return a};try{Array.prototype.slice.call(document.documentElement.childNodes,0)}catch(Ta){P=function(a,b){var c=b||[];if(Aa.call(a)==="[object Array]")Array.prototype.push.apply(c,a);else if(typeof a.length==="number")for(var e=0,f=a.length;e<f;e++)c.push(a[e]);else for(e=0;a[e];e++)c.push(a[e]);return c}}var Q;document.documentElement.compareDocumentPosition?Q=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){a==b&&(E=true);return a.compareDocumentPosition?-1:1}var c=
a.compareDocumentPosition(b)&4?-1:a===b?0:1;c===0&&(E=true);return c}:"sourceIndex"in document.documentElement?Q=function(a,b){if(!a.sourceIndex||!b.sourceIndex){a==b&&(E=true);return a.sourceIndex?-1:1}var c=a.sourceIndex-b.sourceIndex;c===0&&(E=true);return c}:document.createRange&&(Q=function(a,b){if(!a.ownerDocument||!b.ownerDocument){a==b&&(E=true);return a.ownerDocument?-1:1}var c=a.ownerDocument.createRange(),e=b.ownerDocument.createRange();c.setStart(a,0);c.setEnd(a,0);e.setStart(b,0);e.setEnd(b,
0);c=c.compareBoundaryPoints(Range.START_TO_END,e);c===0&&(E=true);return c});m=document.createElement("div");var Da="script"+(new Date).getTime();m.innerHTML="<a name='"+Da+"'/>";var W=document.documentElement;W.insertBefore(m,W.firstChild);document.getElementById(Da)&&(i.find.ID=function(a,b,c){if(typeof b.getElementById!=="undefined"&&!c)return(b=b.getElementById(a[1]))?b.id===a[1]||typeof b.getAttributeNode!=="undefined"&&b.getAttributeNode("id").nodeValue===a[1]?[b]:X:[]},i.filter.ID=function(a,
b){var c=typeof a.getAttributeNode!=="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b});W.removeChild(m);W=m=null;m=document.createElement("div");m.appendChild(document.createComment(""));0<m.getElementsByTagName("*").length&&(i.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){for(var e=[],f=0;c[f];f++)c[f].nodeType===1&&e.push(c[f]);c=e}return c});m.innerHTML="<a href='#'></a>";m.firstChild&&("undefined"!==typeof m.firstChild.getAttribute&&"#"!==
m.firstChild.getAttribute("href"))&&(i.attrHandle.href=function(a){return a.getAttribute("href",2)});m=null;if(document.querySelectorAll){var fa=o;m=document.createElement("div");m.innerHTML="<p class='TEST'></p>";if(!(m.querySelectorAll&&0===m.querySelectorAll(".TEST").length)){var o=function(a,b,c,e){b=b||document;if(!e&&b.nodeType===9&&!ea(b))try{return P(b.querySelectorAll(a),c)}catch(f){}return fa(a,b,c,e)},v;for(v in fa)o[v]=fa[v];m=null}}v=document.createElement("div");v.innerHTML="<div class='test e'></div><div class='test'></div>";
v.getElementsByClassName&&0!==v.getElementsByClassName("e").length&&(v.lastChild.className="e",1!==v.getElementsByClassName("e").length&&(i.order.splice(1,0,"CLASS"),i.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!=="undefined"&&!c)return b.getElementsByClassName(a[1])},v=null));var Ra=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)},ea=function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?
a.nodeName!=="HTML":false},Ca=function(a,b){for(var c=[],e="",f,g=b.nodeType?[b]:b;f=i.match.PSEUDO.exec(a);){e=e+f[0];a=a.replace(i.match.PSEUDO,"")}a=i.relative[a]?a+"*":a;f=0;for(var h=g.length;f<h;f++)o(a,g[f],c);return o.filter(e,c)};l.find=o;b.lang={code:"en",of:"of",loading:"&nbsp;",cancel:"Cancel",next:"Next",previous:"Previous",play:"Play",pause:"Pause",close:"Close",errors:{single:'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',shared:'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',
either:'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'}};var w,t,C;b.img=function(a,b){this.obj=a;this.id=b;this.ready=false;var c=this;w=new Image;w.onload=function(){c.height=a.height?parseInt(a.height,10):w.height;c.width=a.width?parseInt(a.width,10):w.width;c.ready=true;w=w.onload=null};w.src=a.content};b.img.ext=["bmp","gif","jpg","jpeg","png"];b.img.prototype={append:function(a,d){var c=document.createElement("img");c.id=
this.id;c.src=this.obj.content;c.style.position="absolute";var e,f;if(d.oversized&&b.options.handleOversize=="resize"){e=d.innerHeight;f=d.innerWidth}else{e=this.height;f=this.width}c.setAttribute("height",e);c.setAttribute("width",f);a.appendChild(c)},remove:function(){var a=n(this.id);a&&a.parentNode.removeChild(a);if(t){G(t,"mousedown",oa);t.parentNode.removeChild(t);t=null}C=null;if(w)w=w.onload=null},onLoad:function(){if(b.dimensions.oversized&&b.options.handleOversize=="drag"){S=R=0;L=K=null;
var a=["position:absolute","cursor:"+(b.isGecko?"-moz-grab":"move"),"background-color:"+(b.isIE?"#fff;filter:alpha(opacity=0)":"transparent")].join(";");b.appendHTML(b.skin.body,'<div id="sb-drag-proxy" style="'+a+'"></div>');t=n("sb-drag-proxy");na();B(t,"mousedown",oa)}},onWindowResize:function(){var a=b.dimensions;switch(b.options.handleOversize){case "resize":var d=n(this.id);d.height=a.innerHeight;d.width=a.innerWidth;break;case "drag":if(C){var d=parseInt(b.getStyle(C,"top")),c=parseInt(b.getStyle(C,
"left"));if(d+this.height<a.innerHeight)C.style.top=a.innerHeight-this.height+"px";if(c+this.width<a.innerWidth)C.style.left=a.innerWidth-this.width+"px";na()}}}};var ga=!1,aa=[],Sa=["sb-nav-close","sb-nav-next","sb-nav-play","sb-nav-pause","sb-nav-previous"],u,z,D,ha=!0,J={markup:'<div id="sb-container"><div id="sb-overlay"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()">CLOSE</a><a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a></div><div id="sb-wrapper"><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div></div></div></div></div>',
options:{animSequence:"sync",counterLimit:10,counterType:"default",displayCounter:!0,displayNav:!0,fadeDuration:0.35,initialHeight:160,initialWidth:320,modal:!1,overlayColor:"#000",overlayOpacity:0.5,resizeDuration:0.35,showOverlay:!0,troubleElements:["select","object","embed","canvas"]},init:function(){b.appendHTML(document.body,ka(J.markup,b.lang));J.body=n("sb-body-inner");u=n("sb-container");z=n("sb-overlay");D=n("sb-wrapper");if(!V)u.style.position="absolute";if(!U){var a,d,c=/url\("(.*\.png)"\)/;
r(Sa,function(e,g){if(a=n(g))if(d=b.getStyle(a,"backgroundImage").match(c)){a.style.backgroundImage="none";a.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="+d[1]+",sizingMethod=scale);"}})}var e;B(F,"resize",function(){if(e){clearTimeout(e);e=null}q&&(e=setTimeout(J.onWindowResize,10))})},onOpen:function(a,d){ha=false;u.style.display="block";ra();var c=ba(b.options.initialHeight,b.options.initialWidth);N(c.innerHeight,c.top);O(c.width,c.left);if(b.options.showOverlay){z.style.backgroundColor=
b.options.overlayColor;b.setOpacity(z,0);b.options.modal||B(z,"click",b.close);ga=true}if(!V){$();B(F,"scroll",$)}sa();u.style.visibility="visible";ga?s(z,"opacity",b.options.overlayOpacity,b.options.fadeDuration,d):d()},onLoad:function(a,d){for(ta(true);J.body.firstChild;){var c=J.body.firstChild;c.parentNode.removeChild(c)}n("sb-title");var c=n("sb-info").offsetHeight,e=n("sb-title-inner"),f=n("sb-info-inner"),g=a?0.35:0;s(e,"marginTop",0,g);s(f,"marginTop",c*-1,g,function(){e.style.visibility=
f.style.visibility="hidden";if(q){if(!a)D.style.visibility="visible";var c=b.getCurrent(),g='<span class="title-secondline">By <a target="_blank" href="'+c.owner_url+'">'+c.owner+"</a> &middot; "+c.views+' views &middot; <a href="#q='+c.owner_id+'&type=user">More by '+c.owner+"</a></span>";n("sb-title-inner").innerHTML='<a target="_blank" href="'+c.permalink+'">'+c.title+"</a>"+g||"";var j,i,m,l;if(b.options.displayNav){g=true;c=b.gallery.length;if(c>1)if(b.options.continuous)j=l=true;else{j=c-1>
b.current;l=b.current>0}if(b.options.slideshowDelay>0&&b.hasNext()){m=!b.isPaused();i=!m}}else g=j=i=m=l=false;y("close",g);y("next",j);y("play",i);y("pause",m);y("previous",l);j="";if(b.options.displayCounter&&b.gallery.length>1){c=b.gallery.length;if(b.options.counterType=="skip"){i=0;l=c;m=parseInt(b.options.counterLimit)||0;if(m<c&&m>2){l=Math.floor(m/2);i=b.current-l;i<0&&(i=i+c);l=b.current+(m-l);l>c&&(l=l-c)}for(;i!=l;){i==c&&(i=0);j=j+('<a onclick="Shadowbox.change('+i+');"');i==b.current&&
(j=j+' class="sb-counter-current"');j=j+(">"+ ++i+"</a>")}}else j=[b.current+1,b.lang.of,c].join(" ")}n("sb-counter").innerHTML=j;d()}})},onReady:function(a){if(q){var d=b.player,c=ba(d.height,d.width),e=function(){var b=n("sb-title-inner"),c=n("sb-info-inner");b.style.visibility=c.style.visibility="";b.innerHTML!=""&&s(b,"marginTop",0,0.35);s(c,"marginTop",0,0.35,a)};switch(b.options.animSequence){case "hw":N(c.innerHeight,c.top,true,function(){O(c.width,c.left,true,e)});break;case "wh":O(c.width,
c.left,true,function(){N(c.innerHeight,c.top,true,e)});break;default:O(c.width,c.left,true);N(c.innerHeight,c.top,true,e)}}},onShow:function(a){ta(false,a);ha=true},onClose:function(){V||G(F,"scroll",$);G(z,"click",b.close);D.style.visibility="hidden";var a=function(){u.style.visibility="hidden";u.style.display="none";sa(true)};ga?s(z,"opacity",0,b.options.fadeDuration,a):a()},onPlay:function(){y("play",false);y("pause",true)},onPause:function(){y("pause",false);y("play",true)},onWindowResize:function(){if(ha){ra();
var a=b.player,d=ba(a.height,a.width);O(d.width,d.left);N(d.innerHeight,d.top);if(a.onWindowResize)a.onWindowResize()}}};b.skin=J;F.Shadowbox=b})(window);
 
 
 
 
 
 
 
 
 
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd",transitionProperty:"transitionEnd"}[j],r=h("transitionDuration"));var s=b.event,t;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",t&&clearTimeout(t),t=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var u=["width","height"],v=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!b.browser.opera,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=u.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&v.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){var c=this,d=function(){c.$allAtoms=c.$allAtoms.not(a),a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this.$filteredAtoms=this.$filteredAtoms.not(a),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),v.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var w=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){w("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){w("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);
  
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);


  $.fn.imagesLoaded = function( callback ) {
    var $this = this,
        $images = $this.find('img').add( $this.filter('img') ),
        len = $images.length,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        loaded = [];

    function triggerCallback() {
      callback.call( $this, $images );
    }

    function imgLoaded( event ) {
      var img = event.target;
      if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
        loaded.push( img );
        if ( --len <= 0 ){
          setTimeout( triggerCallback );
          $images.unbind( '.imagesLoaded', imgLoaded );
        }
      }
    }

    // if no images, trigger immediately
    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
      // cached images don't fire load sometimes, so we reset src.
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = blank;
      this.src = src;
    });

    return $this;
  };
  
  
 (function($) { 
  $.fn.swipeEvents = function() {
    return this.each(function() {
      
      var startX,
          startY,
          $this = $(this);
      
      $this.bind('touchstart mousedown', touchstart);
      
      function touchstart(event) {
        var touches = event.originalEvent.touches;
        if (touches && touches.length) {
          startX = touches[0].pageX;
          startY = touches[0].pageY;
          $this.bind('touchmove mousemove', touchmove);
        }
        event.preventDefault();
      }
      
      function touchmove(event) {
        var touches = event.originalEvent.touches;
        if (touches && touches.length) {
          var deltaX = startX - touches[0].pageX;
          var deltaY = startY - touches[0].pageY;
          
          if (deltaX >= 50) {
            $this.trigger("swipeLeft");
          }
          if (deltaX <= -50) {
            $this.trigger("swipeRight");
          }
          if (deltaY >= 50) {
            $this.trigger("swipeUp");
          }
          if (deltaY <= -50) {
            $this.trigger("swipeDown");
          }
          if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
            $this.unbind('touchmove', touchmove);
          }
        }
        event.preventDefault();
      }
      
    });
  };
})(jQuery);


Shadowbox.init({
	skipSetup:true,
	viewportPadding: 40,
	slideshowDelay: 4,
	displayCounter:false,
	onChange: function(element) {
		$(element.link).focus();
	},
	onOpen: function(currentImage){ 
		Shadowbox.play(); 
		Shadowbox.pause(); 
	} 
});


 var flickrapi = (function () {
	var api_key = '4d22941636893fd6132c3c3c91554972';
	var api_url = 'http://api.flickr.com/services/rest/';
	
	return {
		callMethod: function(params) {
			var constructedurl = api_url+'?api_key='+api_key;
			for(var key in params) {
				constructedurl += '&'+key+'='+params[key];
			}
			constructedurl += '&callback=?';
			
			$.getJSON(constructedurl);
		
		}
	}
})();

var flickrbrowsr = (function() {
	var params = {}, 
		user_id, 
		page = 1, 
		per_page = 20,
		semaphore = 1, 
		done = 0,
		$window = $(window),
		$windowwidth = $window.width(),
		$container = $('#container'), 
		$searchbox = $('#searchbox'),
		$searchtip = $('.searchtip'),
		$statusbar = $('#statusbar'),
		$footer = $('#footer'),
		$inputhint = $('.inputhint');
	
	return {
		setup: function(args) {
			this.reset();
			params = args;
			if(params.type == 'user') {
				if(!params.query.match(/[^\d][@N][\d$]/)) {
					this.getUser(params.query);
				} else {
					params.user_id = params.query;
					this.loadphotos();
				}
			} else {
				this.loadphotos();
			}
		},
		reset: function() {
			page=1;
			done = 0;
			$container.html('');
			$searchtip.hide();
			Shadowbox.close();
			Shadowbox.clearCache();
			this.stickyfooter();
		},
		run: function() {
			var hash, 
				query,
				sort,
				type, 
				temp,
				hasharray = [], 
				hashkeys = {};
				
			hash = window.location.hash.replace('#', '');
			if(!hash) {
				return;
			}
			
			hasharray = hash.split('&');
			for(var i=0, hasharraylen = hasharray.length; i< hasharraylen; i++) {
				temp = hasharray[i].split('=');
				hashkeys[temp[0]] = temp[1];
			}
			query = hashkeys['q'] || "";
			type = hashkeys['type'] || "search";
			sort = hashkeys['sort'] || "interestingness-desc";
			
			if($container.html() != '') {
				$container.isotope( 'destroy' );
			}
			$statusbar.html('').removeClass('msg').css({display: 'block'});
			
			$searchbox.val(query);
			$('#l'+type).click();
			
			flickrbrowsr.setup({
				query:query,
				type:type,
				sort:sort
			});

		
		},
		doneLoadingImgs: function() {
			semaphore = 1;
			this.loadphotos();
		},
		getUser: function(user) {
			flickrapi.callMethod({
				method: 'flickr.urls.lookupUser',
				url: 'http://flickr.com/photos/'+arguments[0],
				format: 'json',
				jsoncallback: 'flickrbrowsr.setUserIdFromUser'
			});
		},
		setUserIdFromUser: function(response) {
			var data = response;
			if(data.stat == 'ok') {
				params.user_id = data.user.id;
				this.loadphotos();
			} else {
				this.throwError(data.message);
			}
		},
		loadphotos: function() {
			if((($window.scrollTop()+ $window.height()) - $statusbar.offset().top  > -300) && semaphore == 1 && done != 1) {
				semaphore = 0;
				if(params.type == 'user') {
					flickrapi.callMethod({
						method: 'flickr.people.getPublicPhotos',
						user_id: params.user_id,
						per_page: per_page,
						page:page,
						format: 'json',
						extras: 'owner_name,views,url_c,url_z,url_b',
						jsoncallback: 'flickrbrowsr.appendPhotos'
					});
				} else if(params.type == 'search') {
					flickrapi.callMethod({
						method: 'flickr.photos.search',
						text: params.query,
						sort: params.sort,
						per_page: per_page,
						page:page,
						format: 'json',
						extras: 'owner_name,views,url_c,url_z,url_b',
						jsoncallback: 'flickrbrowsr.appendPhotos'
					});
				} else {
					
				}
				page += 1;
			}
		},
		appendPhotos: function(data) {
			var that = this,
				photo,
				t_url,
				b_url,
				full_url,
				permalink,
				owner_url,
				s = "";
			
			if(data.stat != 'ok') {
				that.doneLoadingImgs();
				done=1;
				this.throwError(data.message);
				return;
			}
			var photoslength = data.photos.photo.length;
			if(photoslength < 1) { $statusbar.addClass('msg').html('No more photos to show.'); done = 1; semaphore = 1; return; }
			for (var i=0; i < photoslength; i++) {
			  photo = data.photos.photo[i];
			  t_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
				photo.server + "/" + photo.id + "_" + photo.secret + "_" + ($windowwidth > 500 ? "n.jpg" : "q.jpg");
			  b_url = "http://farm" + photo.farm + ".static.flickr.com/" + 
				photo.server + "/" + photo.id + "_" + photo.secret + "_" + "b.jpg";
			  full_url = photo.url_c ? b_url : photo.url_z; // Since there is no checking for url_b, making an assumption here.
			  full_url = full_url || t_url; // In case there is no url_z.
			  permalink = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
			  owner_url = "http://www.flickr.com/photos/" + photo.owner;
			  s +=  '<a rel="shadowbox[flickr]" data-owner_name="'+photo.ownername+'" data-views="'+photo.views+'" data-permalink="'+permalink+'" data-owner_id="'+photo.owner+'" data-owner_url="'+owner_url+'" class="photo noopacity" title="'+ photo.title.replace(/"/g, "&quot;").replace(/>/g, "&gt;").replace(/</g, "&lt;") + 
				'" href="' + full_url + '">' + '<img alt="'+ photo.title + 
				'" src="' + t_url + '"/>' + '<span>'+photo.title+'</span></a>';
			}
			var prevcontainerHTML = document.getElementById('container').innerHTML;
			//document.getElementById('container').innerHTML = document.getElementById('container').innerHTML + s;
			var $newElems = $(s);
			$container.append($newElems);
			

			 Shadowbox.setup($newElems, {
				gallery: "flickr",
				overlayOpacity: 0.93,
				overlayColor:'#000'
			});
			$newElems.imagesLoaded(function(){
				that.stickyfooter();
				if(prevcontainerHTML != '') {
					$container.isotope( 'appended', $newElems, true);
				} else {
					$container.isotope({
						itemSelector : '.photo',
						animationEngine: 'css'
					});
					
				}
				$('.noopacity').css({ opacity: 1 });	
				/*$newElems.each(function() {
					var imgheight = $(this).children('img').height();
					$(this).css('height',imgheight);
				});*/
				if(Shadowbox.isOpen()) {
					Shadowbox.gallery = $.map(Shadowbox.cache, function (value) { return value; });
				}
				that.doneLoadingImgs();
			});
			
		},
		stickyfooter: function() {
			if($window.height() < $statusbar.offset().top) {
				$footer.css({'position':'static'});
			} else {
				$footer.css({'position':'absolute'});
			}
		},
		throwError: function(msg) {
			$statusbar.html('<p class="error">:( '+msg+'</p>').addClass('msg');
		}
	}
})();
 
$(document).ready(function() {
	$('.searchtip').css({opacity: 1});
	$('label').click(function() {
		$('label').removeClass('active');
		$('.inputhint').html($(this).attr('title'));
		$(this).addClass('active');
		$('#searchbox').focus();
	});
	
	$('.textbox').bind('keyup focus click change blur',function() {
		if($(this).val() !='') {
			$('.inputhint').hide();
		} else {
			$('.inputhint').fadeIn();
		}
	});
	
	flickrbrowsr.run();
	
	$(window).scroll(function() {
		flickrbrowsr.loadphotos();
		var $header = $("#header");
			
		if($header.offset().top  > 50) {
			$header.addClass('overlay');
		} else {
			$header.removeClass('overlay');
		}
		
	});
			
	$('#searchform').submit(function() {
		window.location.hash = 'q='+$('#searchbox').val()+'&'+'type='+$('input[name=stype]:checked').val();
		return false;
	});
	
	$(window).hashchange(flickrbrowsr.run);
	
	

	

	
});


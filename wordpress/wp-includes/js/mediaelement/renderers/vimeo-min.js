!function a(o,s,c){function u(n,e){if(!s[n]){if(!o[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}var i=s[n]={exports:{}};o[n][0].call(i.exports,function(e){var t=o[n][1][e];return u(t||e)},i,i.exports,a,o,s,c)}return s[n].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)u(c[e]);return u}({1:[function(e,t,n){"use strict";var O={promise:null,load:function e(t){"undefined"!=typeof Vimeo?O._createPlayer(t):(O.promise=O.promise||mejs.Utils.loadScript("https://player.vimeo.com/api/player.js"),O.promise.then(function(){O._createPlayer(t)}))},_createPlayer:function e(t){var n=new Vimeo.Player(t.iframe);window["__ready__"+t.id](n)},getVimeoId:function e(t){return null==t?null:(t=t.split("?")[0],parseInt(t.substring(t.lastIndexOf("/")+1),10));var n}},r={name:"vimeo_iframe",options:{prefix:"vimeo_iframe"},canPlayType:function e(t){return~["video/vimeo","video/x-vimeo"].indexOf(t.toLowerCase())},create:function e(f,t,n){var v=[],h={},r=4,y=!0,g=1,a=g,E=0,U=0,j=!1,b=0,w=null,o="";h.options=t,h.id=f.id+"_"+t.prefix,h.mediaElement=f;for(var N=function e(t,n){var r=mejs.Utils.createEvent("error",n);r.message=t.name+": "+t.message,f.dispatchEvent(r)},i=mejs.html5media.properties,s=function e(i){var t=""+i.substring(0,1).toUpperCase()+i.substring(1);h["get"+t]=function(){if(null===w)return null;var e=null;switch(i){case"currentTime":return E;case"duration":return b;case"volume":return g;case"muted":return 0===g;case"paused":return y;case"ended":return j;case"src":return w.getVideoUrl().then(function(e){o=e}),o;case"buffered":return{start:function e(){return 0},end:function e(){return U*b},length:1};case"readyState":return 4}return e},h["set"+t]=function(e){if(null!==w)switch(i){case"src":var t="string"==typeof e?e:e[0].src,n=O.getVimeoId(t);w.loadVideo(n).then(function(){f.originalNode.autoplay&&w.play()}).catch(function(e){N(e,h)});break;case"currentTime":w.setCurrentTime(e).then(function(){E=e,setTimeout(function(){var e=mejs.Utils.createEvent("timeupdate",h);f.dispatchEvent(e)},50)}).catch(function(e){N(e,h)});break;case"volume":w.setVolume(e).then(function(){a=g=e,setTimeout(function(){var e=mejs.Utils.createEvent("volumechange",h);f.dispatchEvent(e)},50)}).catch(function(e){N(e,h)});break;case"loop":w.setLoop(e).catch(function(e){N(e,h)});break;case"muted":e?w.setVolume(0).then(function(){g=0,setTimeout(function(){var e=mejs.Utils.createEvent("volumechange",h);f.dispatchEvent(e)},50)}).catch(function(e){N(e,h)}):w.setVolume(a).then(function(){g=a,setTimeout(function(){var e=mejs.Utils.createEvent("volumechange",h);f.dispatchEvent(e)},50)}).catch(function(e){N(e,h)});break;case"readyState":var r=mejs.Utils.createEvent("canplay",h);f.dispatchEvent(r)}else v.push({type:"set",propName:i,value:e})}},c=0,u=i.length;c<u;c++)s(i[c]);for(var l=mejs.html5media.methods,d=function e(t){h[t]=function(){if(null!==w)switch(t){case"play":return y=!1,w.play();case"pause":return y=!0,w.pause();case"load":return null}else v.push({type:"call",methodName:t})}},p=0,m=l.length;p<m;p++)d(l[p]);window["__ready__"+h.id]=function(e){if(f.vimeoPlayer=w=e,v.length)for(var t=0,n=v.length;t<n;t++){var r=v[t];if("set"===r.type){var i=r.propName,a=""+i.substring(0,1).toUpperCase()+i.substring(1);h["set"+a](r.value)}else"call"===r.type&&h[r.methodName]()}f.originalNode.muted&&(w.setVolume(0),g=0);for(var o=document.getElementById(h.id),s=void 0,c=function e(t){var n=mejs.Utils.createEvent(t.type,h);f.dispatchEvent(n)},u=0,l=(s=["mouseover","mouseout"]).length;u<l;u++)o.addEventListener(s[u],c,!1);w.on("loaded",function(){w.getDuration().then(function(e){if(0<(b=e)&&(U=b*e,f.originalNode.autoplay)){j=y=!1;var t=mejs.Utils.createEvent("play",h);f.dispatchEvent(t)}}).catch(function(e){N(e,h)})}),w.on("progress",function(){w.getDuration().then(function(e){if(0<(b=e)&&(U=b*e,f.originalNode.autoplay)){var t=mejs.Utils.createEvent("play",h);f.dispatchEvent(t);var n=mejs.Utils.createEvent("playing",h);f.dispatchEvent(n)}var r=mejs.Utils.createEvent("progress",h);f.dispatchEvent(r)}).catch(function(e){N(e,h)})}),w.on("timeupdate",function(){w.getCurrentTime().then(function(e){E=e;var t=mejs.Utils.createEvent("timeupdate",h);f.dispatchEvent(t)}).catch(function(e){N(e,h)})}),w.on("play",function(){j=y=!1;var e=mejs.Utils.createEvent("play",h);f.dispatchEvent(e);var t=mejs.Utils.createEvent("playing",h);f.dispatchEvent(t)}),w.on("pause",function(){j=!(y=!0);var e=mejs.Utils.createEvent("pause",h);f.dispatchEvent(e)}),w.on("ended",function(){j=!(y=!1);var e=mejs.Utils.createEvent("ended",h);f.dispatchEvent(e)});for(var d=0,p=(s=["rendererready","loadedmetadata","loadeddata","canplay"]).length;d<p;d++){var m=mejs.Utils.createEvent(s[d],h);f.dispatchEvent(m)}};var _=f.originalNode.height,x=f.originalNode.width,V=document.createElement("iframe"),A="https://player.vimeo.com/video/"+O.getVimeoId(n[0].src),T=~n[0].src.indexOf("?")?"?"+n[0].src.slice(n[0].src.indexOf("?")+1):"";return T&&f.originalNode.autoplay&&-1===T.indexOf("autoplay")&&(T+="&autoplay=1"),T&&f.originalNode.loop&&-1===T.indexOf("loop")&&(T+="&loop=1"),V.setAttribute("id",h.id),V.setAttribute("width",x),V.setAttribute("height",_),V.setAttribute("frameBorder","0"),V.setAttribute("src",""+A+T),V.setAttribute("webkitallowfullscreen",""),V.setAttribute("mozallowfullscreen",""),V.setAttribute("allowfullscreen",""),f.originalNode.parentNode.insertBefore(V,f.originalNode),f.originalNode.style.display="none",O.load({iframe:V,id:h.id}),h.hide=function(){h.pause(),w&&(V.style.display="none")},h.setSize=function(e,t){V.setAttribute("width",e),V.setAttribute("height",t)},h.show=function(){w&&(V.style.display="")},h.destroy=function(){},h}};mejs.Utils.typeChecks.push(function(e){return/(\/\/player\.vimeo|vimeo\.com)/i.test(e)?"video/x-vimeo":null}),mejs.Renderers.add(r)},{}]},{},[1]);
var EventUtil={addHandler:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n},removeHandler:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent?e.detachEvent("on"+t,n):e["on"+t]=null},getEvent:function(e){return e?e:window.event},getTarget:function(e){return e.target||e.srcElement},preventDefault:function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},getRelatedTarget:function(e){return e.relatedTarget?e.relatedTarget:e.toElement?e.toElement:e.formElement?e.formElement:null},getButton:function(e){if(document.implementation.hasFeature("MouseEvents","2.0"))return e.button;switch(e.button){case 0:case 1:case 3:case 5:case 7:return 0;case 2:case 6:return 2;case 4:return 1}}};window.GLOBAL.util.event=eventUtil;
module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){var n=t.succeed,r=t.fail;console.log("event: "+JSON.stringify(e,null,2));var o=e.record,s=o.id,u=o.apiName,c=e.priorState,l=e.changeSet,f=(0,i["default"])(e),d=function(e,t){return e?r(e):n(t)},p=a({},c,l);if(l.first_name||l.first_name)return void console.log("No name change, exiting.");var v=p.first_name&&p.last_name?p.first_name+" "+p.last_name:p.first_name?p.first_name:p.last_name?p.last_name:"Unnamed Contact";console.log('Changing name from "'+c.name+'" to "'+v+'" with post to /v1/records/'+u+"/"+s+"."),f({method:"PATCH",path:"/v1/records/"+u+"/"+s,body:{name:v}},function(e){console.log("res",e),d(e)})}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.handler=o;var s=n(1),i=r(s)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e){var t=e.jwt,n={hostname:"gateway.lanetix.com",headers:{Accept:"application/json",Authorization:"Bearer "+t,"Content-Type":"application/json"}};return function(e,t){return u["default"].request(s({},n,e),function(e){var n="";e.setEncoding("utf8"),e.on("data",function(e){return n+=e}),e.on("end",function(){if(e.statusCode>=200&&e.statusCode<400)t(null,a(n));else{var r=new Error("HTTP Response: "+e.statusCode);r.response=e,r.reponse.body=a(n),t(r)}})}).on("error",t).end(e.body&&JSON.stringify(e.body))}}function a(e){try{return JSON.parse(e)}catch(t){return e}}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t["default"]=o;var i=n(2),u=r(i)},function(e,t){e.exports=require("https")}]);
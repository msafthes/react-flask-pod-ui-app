(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{162:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(163),c=a.n(o);t.a=function(){return r.a.createElement("div",{className:c.a.Loading_Indicator},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))}},163:function(e,t,a){e.exports={Loading_Indicator:"LoadingIndicator_Loading_Indicator__1Yf4m"}},173:function(e,t,a){"use strict";a.d(t,"d",function(){return o}),a.d(t,"c",function(){return c}),a.d(t,"e",function(){return i}),a.d(t,"a",function(){return l}),a.d(t,"b",function(){return s});var n=a(2),r=a(16),o=function(e){for(var t=0,a=Object.entries(e);t<a.length;t++){var n=a[t],o=Object(r.a)(n,2);o[0];if(!1===o[1])return!1}return!0},c=function(e){var t=o(e),a=Object(n.a)({},e);return function(e,t){for(var a=0,n=Object.entries(e);a<n.length;a++){var o=n[a],c=Object(r.a)(o,2),i=c[0];c[1],e[i]=!t}}(a,t),a},i=function(e){for(var t=0,a=Object.entries(e);t<a.length;t++){var n=a[t],o=Object(r.a)(n,2);o[0];if(!0===o[1])return!0}return!1},l=function(e){for(var t=[],a=0,n=Object.entries(e);a<n.length;a++){var o=n[a],c=Object(r.a)(o,2),i=c[0];!0===c[1]&&t.push(i)}return t},s=function(e){for(var t=[],a=0,n=Object.entries(e);a<n.length;a++){var o=n[a],c=Object(r.a)(o,2),i=c[0];!0===c[1]&&t.push(i)}return t}},197:function(e,t,a){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a.d(t,"a",function(){return n})},240:function(e,t,a){"use strict";var n=a(3),r=a(342),o=a(182);t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(r.a)(e,Object(n.a)({defaultTheme:o.a},t))}},242:function(e,t,a){e.exports={Containers:"Containers_Containers__d7bZ0",Wrapper:"Containers_Wrapper__2YZ7O",Info:"Containers_Info__3wfoH",Content:"Containers_Content__kro1u",Buttons:"Containers_Buttons__gccNo",Heading:"Containers_Heading__3Mvbc",ContainerId:"Containers_ContainerId__WrAih",Status:"Containers_Status__1wqQz",Image:"Containers_Image__3csfy",Command:"Containers_Command__24ulJ",Created:"Containers_Created__1zkLf",Ports:"Containers_Ports__1O1FV",Names:"Containers_Names__2Xmjn",Button:"Containers_Button__1usmy",DetailTitle:"Containers_DetailTitle__jyW3t",Headline:"Containers_Headline__3rbEl",Error:"Containers_Error__18sUr"}},243:function(e,t,a){"use strict";var n=a(178);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(0)),o=(0,n(a(193)).default)(r.default.createElement("path",{d:"M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"}),"Pageview");t.default=o},355:function(e,t,a){"use strict";a.r(t);var n=a(197),r=a(2),o=a(16),c=a(0),i=a.n(c),l=a(25),s=a(53),u=a(242),m=a.n(u),d=a(162),f=a(243),E=a.n(f),b=a(322),g=a(291),v=a(351),p=a(18),C=function(e){var t=e.containerId,a=e.containerOperation,n=Object(c.useState)(null),r=Object(o.a)(n,2),l=r[0],s=r[1],u={};u[t]=!0;var m=function(){s(null)};return i.a.createElement("div",null,i.a.createElement(b.a,{variant:"outlined",color:"secondary","aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){s(e.currentTarget)}},"Actions"),i.a.createElement(g.a,{id:"simple-menu",anchorEl:l,keepMounted:!0,open:Boolean(l),onClose:m},i.a.createElement(p.a,{to:"/container_logs/".concat(t),style:{textDecoration:"none",marginLeft:"2.5%"}},i.a.createElement(b.a,{startIcon:i.a.createElement(E.a,null),onClick:function(){return console.log("clicked ID: ".concat(t))}},"Show Logs")),i.a.createElement(v.a,{onClick:function(){return a(u,"remove")}},"Remove"),i.a.createElement(v.a,{onClick:function(){return a(u,"stop")}},"Stop"),i.a.createElement(v.a,{onClick:function(){return a(u,"kill")}},"Kill"),i.a.createElement(v.a,{onClick:m},"Close")))},_=a(173),j=a(35),O=a(240),h=a(330),N=a(346),I=a(195),k=a.n(I),w=a(343),y=a(349),S=a(339),P=a(337),T=a(338),D=a(336),A=a(350),B=a(331),L=a(335),H=a(333),R=a(192),W=a.n(R),x=a(348),z=a(344),F=a(340),M=a(334);t.default=Object(l.c)(function(e){return{containers:e.containers.containers,loading:e.containers.loading,errorContainers:e.containers.error}},function(e){return{fetchContainers:function(){return e(s.c())},removeContainers:function(t){return e(s.i(t))},stopContainers:function(t){return e(s.l(t))},killContainers:function(t){return e(s.f(t))},containerRun:function(t){return e(s.a(t))}}})(function(e){for(var t=e.fetchContainers,a=e.removeContainers,l=e.stopContainers,s=e.killContainers,u=e.containerRun,f=e.containers,E=e.errorContainers,g=e.loading,v=Object(j.b)(),p=(v.width,v.phone),I=(v.tabletPortrait,v.tabletLandscape),R=v.desktop,J={},U=0,V=Object.entries(f);U<V.length;U++){var Y=V[U],Z=Object(o.a)(Y,2);Z[0],J[Z[1].containerId]=!1}var q=Object(c.useState)(Object(r.a)({},J)),G=Object(o.a)(q,2),K=G[0],Q=G[1],X=Object(c.useState)(!1),$=Object(o.a)(X,2),ee=$[0],te=$[1],ae=Object(c.useState)(""),ne=Object(o.a)(ae,2),re=ne[0],oe=ne[1],ce=Object(c.useState)(!1),ie=Object(o.a)(ce,2),le=ie[0],se=ie[1],ue=Object(c.useState)(!1),me=Object(o.a)(ue,2),de=me[0],fe=me[1],Ee=Object(c.useState)(""),be=Object(o.a)(Ee,2),ge=be[0],ve=be[1],pe=Object(_.d)(K);Object(c.useEffect)(function(){t()},[t]),Object(c.useEffect)(function(){for(var e={},t=0,a=Object.entries(f);t<a.length;t++){var n=a[t],c=Object(o.a)(n,2);c[0],e[c[1].containerId]=!1}Q(Object(r.a)({},e))},[f]),Object(c.useEffect)(function(){fe(E.length>0)},[E]);var Ce=function(e){for(var t=e.target.id,a=Object(r.a)({},K),n=0,c=Object.entries(a);n<c.length;n++){var i=c[n],l=Object(o.a)(i,2),s=l[0];l[1],t===s&&(a[s]=!a[s])}Q(a)},_e=function(e,t){var c=Object(_.b)(e);switch(t.toLowerCase()){case"remove":!function(e,t){var r=[];f.forEach(function(t){!0===e[t.containerId]&&t.status.startsWith("Up ")&&r.push(t.containerId)}),r.length>0?(se(!0),r=Object(n.a)(new Set(r)),ve(r.join(" "))):a(t)}(e,c);break;case"stop":l(c);break;case"kill":s(c);break;default:console.log("Unknown operation!")}for(var i=Object(r.a)({},e),u=0,m=Object.entries(i);u<m.length;u++){var d=m[u],E=Object(o.a)(d,2),b=E[0];!0===E[1]&&(i[b]=!1)}Q(i)},je=Object(_.e)(K),Oe=[m.a.Content,m.a.Heading],he=(Object(O.a)({buttonGroup:{alignSelf:"flex-start"}})(),i.a.createElement("div",{className:m.a.Wrapper},i.a.createElement(d.a,null)));return f&&(he=i.a.createElement(h.a,{container:!0,direction:"column"},f&&f.length?f.map(function(e,t){return i.a.createElement(i.a.Fragment,{key:e.containerId},i.a.createElement(A.a,null,i.a.createElement(B.a,{expandIcon:i.a.createElement(W.a,null),"aria-label":"Expand","aria-controls":"additional-actions1-content",id:"additional-actions1-header"},i.a.createElement(H.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:i.a.createElement(N.a,{color:"primary",onChange:Ce,id:e.containerId,checked:K[e.containerId]||!1}),label:""}),i.a.createElement(h.a,{item:!0,container:!0,className:m.a.Content},i.a.createElement(x.a,{title:e.containerId},i.a.createElement(h.a,{className:m.a.ContainerId},e.containerId)),(R||I)&&i.a.createElement(x.a,{title:e.status},i.a.createElement(h.a,{className:m.a.Status},e.status)),!p&&i.a.createElement(x.a,{title:e.image},i.a.createElement(h.a,{className:m.a.Image},e.image)),R&&i.a.createElement(x.a,{title:e.ports},i.a.createElement(h.a,{className:m.a.Ports},e.ports)),i.a.createElement(H.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:i.a.createElement(C,{containerId:e.containerId,containerOperation:_e}),label:""}))),i.a.createElement(L.a,null,i.a.createElement(h.a,{container:!0,direction:"column"},i.a.createElement(h.a,{container:!0,direction:"row"},i.a.createElement(h.a,{className:m.a.DetailTitle},"Names:"),i.a.createElement(h.a,{className:m.a.Names},e.names)),i.a.createElement(h.a,{container:!0,direction:"row"},i.a.createElement(h.a,{className:m.a.DetailTitle},"Created:"),i.a.createElement(h.a,{className:m.a.Created},e.created)),i.a.createElement(h.a,{container:!0,direction:"row"},i.a.createElement(h.a,{className:m.a.DetailTitle},"Command:"),i.a.createElement(h.a,{className:m.a.Command},e.command)),i.a.createElement(h.a,{container:!0,direction:"row"},i.a.createElement(h.a,{className:m.a.DetailTitle},"Ports:"),i.a.createElement(h.a,{className:m.a.Ports},e.ports)),i.a.createElement(h.a,{container:!0,direction:"row"},i.a.createElement(h.a,{className:m.a.DetailTitle},"Image:"),i.a.createElement(h.a,{className:m.a.Image},e.image)),i.a.createElement(h.a,{container:!0,direction:"row"},i.a.createElement(h.a,{className:m.a.DetailTitle},"Status:"),i.a.createElement(h.a,{className:m.a.Status},e.status))))))}):"")),i.a.createElement("div",{className:m.a.Containers},i.a.createElement("div",{className:m.a.Wrapper},i.a.createElement("h1",{className:m.a.Headline},"Podman Containers"),i.a.createElement("p",null,"Showing information about Containers and offering various operations with them"),i.a.createElement(h.a,{container:!0,className:m.a.Buttons},i.a.createElement(h.a,{item:!0,className:m.a.Button},i.a.createElement(b.a,{disabled:!je,color:"secondary",variant:"outlined",startIcon:i.a.createElement(k.a,null),onClick:function(){return _e(K,"remove")}},"Remove Selected")),i.a.createElement(h.a,{item:!0,className:m.a.Button},i.a.createElement(b.a,{variant:"outlined",color:"primary",onClick:function(){te(!0)}},"Run"),i.a.createElement(y.a,{open:ee,onClose:function(){te(!1)},"aria-labelledby":"form-dialog-title"},i.a.createElement(D.a,{id:"form-dialog-title"},"Run"),i.a.createElement(P.a,null,i.a.createElement(T.a,null,'Enter the command for "podman run"'),i.a.createElement(w.a,{autoFocus:!0,margin:"dense",id:"name",label:"Podman Run",type:"text",fullWidth:!0,onChange:function(e){oe(e.target.value)}})),i.a.createElement(S.a,null,i.a.createElement(b.a,{onClick:function(){te(!1),0!=re.length&&(u(re),oe(""))},color:"primary"},"Run")))),g&&i.a.createElement(d.a,null)),le&&i.a.createElement(z.a,{severity:"error",onClose:function(){se(!le)}},i.a.createElement(F.a,null,i.a.createElement("strong",null,"Error")),"The following containers are running and cannot be removed:",ge.length>0?ge.split(" ").map(function(e,t){return i.a.createElement(M.a,{key:e,variant:"body1",component:"div",align:"left"},i.a.createElement("strong",null,"container: ",e),i.a.createElement("strong",null))}):""),de&&i.a.createElement(z.a,{severity:"error",onClose:function(){fe(!de)}},i.a.createElement(F.a,null,i.a.createElement("strong",null,"Backend Error")),E.length>0&&i.a.createElement("p",{className:m.a.Error},E)),i.a.createElement("div",{className:m.a.Info},i.a.createElement("div",{className:Oe.join(" ")},i.a.createElement(N.a,{color:"primary",onChange:function(){var e=Object(_.c)(K);Q(e)},checked:pe||!1}),i.a.createElement("div",{className:m.a.ContainerId},"ID"),(R||I)&&i.a.createElement("div",{className:m.a.Status},"Status"),!p&&i.a.createElement("div",{className:m.a.Image},"Image"),R&&i.a.createElement("div",{className:m.a.Ports},"Ports")),he)))})}}]);
//# sourceMappingURL=5.9cb33ad8.chunk.js.map
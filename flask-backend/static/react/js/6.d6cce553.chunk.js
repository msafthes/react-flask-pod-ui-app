(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{158:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(159),o=t.n(c);a.a=function(){return r.a.createElement("div",{className:o.a.Loading_Indicator},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))}},159:function(e,a,t){e.exports={Loading_Indicator:"LoadingIndicator_Loading_Indicator__1Yf4m"}},169:function(e,a,t){"use strict";t.d(a,"d",function(){return c}),t.d(a,"c",function(){return o}),t.d(a,"e",function(){return l}),t.d(a,"a",function(){return i}),t.d(a,"b",function(){return s});var n=t(2),r=t(14),c=function(e){for(var a=0,t=Object.entries(e);a<t.length;a++){var n=t[a],c=Object(r.a)(n,2);c[0];if(!1===c[1])return!1}return!0},o=function(e){console.log("handleSelectAll(), selectedItems:");var a=c(e),t=Object(n.a)({},e);return function(e,a){for(var t=0,n=Object.entries(e);t<n.length;t++){var c=n[t],o=Object(r.a)(c,2),l=o[0];o[1],e[l]=!a}}(t,a),t},l=function(e){console.log("isSelectedAny()");for(var a=0,t=Object.entries(e);a<t.length;a++){var n=t[a],c=Object(r.a)(n,2);c[0];if(!0===c[1])return!0}return!1},i=function(e){for(var a=[],t=0,n=Object.entries(e);t<n.length;t++){var c=n[t],o=Object(r.a)(c,2),l=o[0];!0===o[1]&&a.push(l)}return a},s=function(e){for(var a=[],t=0,n=Object.entries(e);t<n.length;t++){var c=n[t],o=Object(r.a)(c,2),l=o[0];!0===o[1]&&a.push(l)}return a}},193:function(e,a,t){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var a=0,t=new Array(e.length);a<e.length;a++)t[a]=e[a];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.d(a,"a",function(){return n})},235:function(e,a,t){e.exports={Images:"Images_Images__3x1Ll",Wrapper:"Images_Wrapper__1xE4D",Info:"Images_Info__1Qyuy",Content:"Images_Content__2tivE",Buttons:"Images_Buttons__Y76bS",Heading:"Images_Heading__3eEwR",Repository:"Images_Repository__821st",Tag:"Images_Tag__2SjkM",Id:"Images_Id__1DnJp",Created:"Images_Created__hw-qD",Size:"Images_Size__3S1-O",Button:"Images_Button__NFpaW",Headline:"Images_Headline__qGSEj",DetailTitle:"Images_DetailTitle__2LcMp",Error:"Images_Error__1oEqs"}},236:function(e,a,t){"use strict";var n=t(3),r=t(338),c=t(178);a.a=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object(r.a)(e,Object(n.a)({defaultTheme:c.a},a))}},350:function(e,a,t){"use strict";t.r(a);var n=t(193),r=t(2),c=t(14),o=t(0),l=t.n(o),i=t(23),s=t(51),m=t(235),u=t.n(m),d=t(158),g=t(318),E=t(287),f=t(347),p=function(e){var a=e.imageId,t=e.imageOperation,n=Object(o.useState)(null),r=Object(c.a)(n,2),i=r[0],s=r[1],m={};a&&(m[a]=!0);var u=function(){s(null)};return l.a.createElement("div",null,l.a.createElement(g.a,{variant:"outlined",color:"secondary","aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){s(e.currentTarget)}},"Actions"),l.a.createElement(E.a,{id:"simple-menu",anchorEl:i,keepMounted:!0,open:Boolean(i),onClose:u},l.a.createElement(f.a,{onClick:function(){return t(m,"remove")}},"Remove"),l.a.createElement(f.a,{onClick:u},"Close")))},b=t(169),v=t(33),j=t(236),I=t(326),O=t(342),_=t(191),h=t.n(_),y=t(340),C=t(336),N=t(345),S=t(332),k=t(333),w=t(334),T=t(339),D=t(335),z=t(330),A=t(346),B=t(327),P=t(331),R=t(329),x=t(188),L=t.n(x),H=t(344);a.default=Object(i.c)(function(e){return{images:e.images.images,containers:e.containers.containers,errorImages:e.images.error,errorContainers:e.containers.error}},function(e){return{fetchImages:function(){return e(s.d())},removeImages:function(a){return e(s.j(a))},pruneImages:function(){return e(s.g())},pullImage:function(a){return e(s.h(a))},fetchContainers:function(){return e(s.c())}}})(function(e){for(var a=e.fetchImages,t=e.removeImages,i=e.pruneImages,s=e.pullImage,m=e.images,E=e.containers,f=e.fetchContainers,_=e.errorContainers,x=e.errorImages,W=Object(v.b)(),F=(W.width,W.phone),q=(W.tabletPortrait,W.tabletLandscape),J=W.desktop,M={},G=0,Y=Object.entries(m);G<Y.length;G++){var Q=Y[G],U=Object(c.a)(Q,2);U[0],M[U[1].id]=!1}var K=Object(o.useState)(Object(r.a)({},M)),V=Object(c.a)(K,2),X=V[0],Z=V[1],$=Object(o.useState)(!1),ee=Object(c.a)($,2),ae=ee[0],te=ee[1],ne=Object(o.useState)(!1),re=Object(c.a)(ne,2),ce=re[0],oe=re[1],le=Object(o.useState)(""),ie=Object(c.a)(le,2),se=ie[0],me=ie[1],ue=Object(o.useState)(!1),de=Object(c.a)(ue,2),ge=de[0],Ee=de[1],fe=Object(o.useState)(""),pe=Object(c.a)(fe,2),be=pe[0],ve=pe[1],je=Object(b.d)(X);Object(o.useEffect)(function(){a(),f()},[a,f]),Object(o.useEffect)(function(){oe(_.length>0||x.length>0)},[_,x]);var Ie=function(e){for(var a=e.target.id,t=Object(r.a)({},X),n=0,o=Object.entries(t);n<o.length;n++){var l=o[n],i=Object(c.a)(l,2),s=i[0];i[1],a===s&&(t[s]=!t[s])}Z(t)},Oe=function(e,a){var r=[],c=[];e.forEach(function(e){if(!0===X[e.id]){var a=""===e.tag?"".concat(e.repository):"".concat(e.repository,":").concat(e.tag);E.forEach(function(t){t.image===a&&(r.push(e),c.push(a))})}}),r.length>0?(te(!0),c=Object(n.a)(new Set(c)),me(c.join(" "))):t(a)},_e=function(e,a){var t=Object(b.a)(e);switch(a.toLowerCase()){case"remove":Oe(m,t);break;default:console.log("Unknown operation!")}for(var n=Object(r.a)({},e),o=0,l=Object.entries(n);o<l.length;o++){var i=l[o],s=Object(c.a)(i,2),u=s[0];!0===s[1]&&(n[u]=!1)}Z(n)},he=Object(b.e)(X),ye=[u.a.Content,u.a.Heading],Ce=(Object(j.a)({buttonGroup:{alignSelf:"flex-start"}})(),l.a.createElement("div",{className:u.a.Wrapper},l.a.createElement(d.a,null)));return e.loading||(Ce=l.a.createElement(I.a,{container:!0,direction:"column"},m&&m.length?m.map(function(e,a){return l.a.createElement(l.a.Fragment,{key:e.id},l.a.createElement(A.a,null,l.a.createElement(B.a,{expandIcon:l.a.createElement(L.a,null),"aria-label":"Expand","aria-controls":"additional-actions1-content",id:"additional-actions1-header"},l.a.createElement(R.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:l.a.createElement(O.a,{color:"primary",onClick:Ie,id:e.id,checked:X[e.id]}),label:""}),l.a.createElement(I.a,{item:!0,container:!0,className:u.a.Content},l.a.createElement(H.a,{title:e.repository},l.a.createElement(I.a,{className:u.a.Repository},e.repository)),(J||q)&&l.a.createElement(H.a,{title:e.tag},l.a.createElement(I.a,{className:u.a.Tag},e.tag)),!F&&l.a.createElement(H.a,{title:e.id},l.a.createElement(I.a,{className:u.a.Id},e.id)),(J||q)&&l.a.createElement(H.a,{title:e.created},l.a.createElement(I.a,{className:u.a.Created},e.created)),J&&l.a.createElement(H.a,{title:e.size},l.a.createElement(I.a,{className:u.a.Size},e.size)),l.a.createElement(R.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:l.a.createElement(p,{imageId:e.id,imageOperation:_e}),label:""}))),l.a.createElement(P.a,null,l.a.createElement(I.a,{container:!0,direction:"column"},l.a.createElement(I.a,{container:!0,direction:"row"},l.a.createElement(I.a,{item:!0,className:u.a.DetailTitle},"Size:"),l.a.createElement(I.a,{item:!0,className:u.a.Size},e.size)),l.a.createElement(I.a,{container:!0,direction:"row"},l.a.createElement(I.a,{item:!0,className:u.a.DetailTitle},"Created:"),l.a.createElement(I.a,{item:!0,className:u.a.Created},e.created)),l.a.createElement(I.a,{container:!0,direction:"row"},l.a.createElement(I.a,{item:!0,className:u.a.DetailTitle},"Tag:"),l.a.createElement(I.a,{item:!0,className:u.a.Tag},e.tag)),l.a.createElement(I.a,{container:!0,direction:"row"},l.a.createElement(I.a,{item:!0,className:u.a.DetailTitle},"ID:"),l.a.createElement(I.a,{item:!0,className:u.a.Id},e.id))))))}):"")),l.a.createElement("div",{className:u.a.Images},l.a.createElement("div",{className:u.a.Wrapper},l.a.createElement("h1",{className:u.a.Headline},"Podman Images"),l.a.createElement("p",null,"Showing information about images based on the `podman images` command"),l.a.createElement(I.a,{container:!0,className:u.a.Buttons},l.a.createElement(I.a,{item:!0,className:u.a.Button},l.a.createElement(g.a,{disabled:!he,color:"secondary",variant:"outlined",startIcon:l.a.createElement(h.a,null),onClick:function(){return _e(X,"remove")}},"Remove Selected")),l.a.createElement(I.a,{item:!0,className:u.a.Button},l.a.createElement(g.a,{color:"secondary",variant:"outlined",startIcon:l.a.createElement(h.a,null),onClick:function(){return i()}},"Remove unused images")),l.a.createElement(I.a,{item:!0,className:u.a.Button},l.a.createElement(g.a,{variant:"outlined",color:"primary",onClick:function(){Ee(!0)}},"Pull"),l.a.createElement(N.a,{open:ge,onClose:function(){Ee(!1)},"aria-labelledby":"form-dialog-title"},l.a.createElement(S.a,{id:"form-dialog-title"},"Pull"),l.a.createElement(k.a,null,l.a.createElement(w.a,null,'Enter the image you want to pull"'),l.a.createElement(T.a,{autoFocus:!0,margin:"dense",id:"name",label:"Image Pull",type:"text",fullWidth:!0,onChange:function(e){ve(e.target.value)}})),l.a.createElement(D.a,null,l.a.createElement(g.a,{onClick:function(){Ee(!1),0!=be.length&&(s(be),ve(""))},color:"primary"},"Pull"))))),ae&&l.a.createElement(y.a,{severity:"error",onClose:function(){te(!ae)}},l.a.createElement(C.a,null,l.a.createElement("strong",null,"Error")),"The following images are being used and cannot be deleted:",se.length>0?se.split(" ").map(function(e,a){return l.a.createElement(z.a,{key:e,variant:"body1",component:"div",align:"left"},l.a.createElement("strong",null,"image: ",e),l.a.createElement("strong",null))}):""),ce&&l.a.createElement(y.a,{severity:"error",onClose:function(){oe(!ce)}},l.a.createElement(C.a,null,l.a.createElement("strong",null,"Backend Error")),_.length>0&&l.a.createElement("p",{className:u.a.Error},_),x.length>0&&l.a.createElement("p",{className:u.a.Error},x)),l.a.createElement("div",{className:u.a.Info},l.a.createElement("div",{className:ye.join(" ")},l.a.createElement(O.a,{color:"primary",onClick:function(){var e=Object(b.c)(X);Z(e)},checked:je}),l.a.createElement("div",{className:u.a.Repository},"Repository"),(J||q)&&l.a.createElement("div",{className:u.a.Tag},"Tag"),!F&&l.a.createElement("div",{className:u.a.Id},"ID"),(J||q)&&l.a.createElement("div",{className:u.a.Created},"Created"),J&&l.a.createElement("div",{className:u.a.Size},"Size")),Ce)))})}}]);
//# sourceMappingURL=6.d6cce553.chunk.js.map
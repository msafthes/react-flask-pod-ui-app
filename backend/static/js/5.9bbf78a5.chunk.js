(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{279:function(e,a,t){"use strict";t.d(a,"d",function(){return o}),t.d(a,"c",function(){return c}),t.d(a,"e",function(){return l}),t.d(a,"a",function(){return i}),t.d(a,"b",function(){return s});var n=t(7),r=t(17),o=function(e){for(var a=0,t=Object.entries(e);a<t.length;a++){var n=t[a],o=Object(r.a)(n,2);o[0];if(!1===o[1])return!1}return!0},c=function(e){var a=o(e),t=Object(n.a)({},e);return function(e,a){for(var t=0,n=Object.entries(e);t<n.length;t++){var o=n[t],c=Object(r.a)(o,2),l=c[0];c[1],e[l]=!a}}(t,a),t},l=function(e){for(var a=0,t=Object.entries(e);a<t.length;a++){var n=t[a],o=Object(r.a)(n,2);o[0];if(!0===o[1])return!0}return!1},i=function(e){for(var a=[],t=0,n=Object.entries(e);t<n.length;t++){var o=n[t],c=Object(r.a)(o,2),l=c[0];!0===c[1]&&a.push(l)}return a},s=function(e){for(var a=[],t=0,n=Object.entries(e);t<n.length;t++){var o=n[t],c=Object(r.a)(o,2),l=c[0];!0===c[1]&&a.push(l)}return a}},297:function(e,a,t){e.exports={Containers:"Containers_Containers__QfhWX",Wrapper:"Containers_Wrapper__1mXIJ",Info:"Containers_Info__1FSsH",Content:"Containers_Content__1dbX0",Buttons:"Containers_Buttons__1cZcZ",Heading:"Containers_Heading__1-zlF",ContainerId:"Containers_ContainerId__3IgsK",Status:"Containers_Status__1sNKg",Image:"Containers_Image__zse1E",Command:"Containers_Command__1ZB0v",Created:"Containers_Created__2pcKM",Ports:"Containers_Ports__1beNF",Names:"Containers_Names__3PXMK",Button:"Containers_Button__11A9Z",DetailTitle:"Containers_DetailTitle__ONmmF",Headline:"Containers_Headline__1VOCI",Error:"Containers_Error__DBiHa"}},298:function(e,a,t){"use strict";var n=t(64);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(t(0)),o=(0,n(t(78)).default)(r.default.createElement("path",{d:"M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"}),"Pageview");a.default=o},358:function(e,a,t){"use strict";t.r(a);var n=t(97),r=t(7),o=t(17),c=t(0),l=t.n(c),i=t(36),s=t(46),m=t(297),u=t.n(m),d=t(89),E=t(298),f=t.n(E),b=t(258),C=t(142),p=t(271),g=t(38),v=function(e){var a=e.containerId,t=e.containerOperation,n=Object(c.useState)(null),r=Object(o.a)(n,2),i=r[0],s=r[1],m={};m[a]=!0;var u=function(){s(null)};return l.a.createElement("div",null,l.a.createElement(b.a,{variant:"outlined",color:"secondary","aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){s(e.currentTarget)}},"Actions"),l.a.createElement(C.a,{id:"simple-menu",anchorEl:i,keepMounted:!0,open:Boolean(i),onClose:u},l.a.createElement(g.a,{to:"/container_logs/".concat(a),style:{textDecoration:"none",marginLeft:"2.5%"}},l.a.createElement(b.a,{startIcon:l.a.createElement(f.a,null),onClick:function(){return console.log("clicked ID: ".concat(a))}},"Show Logs")),l.a.createElement(p.a,{onClick:function(){return t(m,"remove")}},"Remove"),l.a.createElement(p.a,{onClick:function(){return t(m,"stop")}},"Stop"),l.a.createElement(p.a,{onClick:function(){return t(m,"kill")}},"Kill"),l.a.createElement(p.a,{onClick:u},"Close")))},_=t(279),O=t(93),j=t(254),h=t(354),N=t(90),I=t.n(N),k=t(267),w=t(270),S=t(266),P=t(265),y=t(352),D=t(264),B=t(356),T=t(349),H=t(351),F=t(350),R=t(283),W=t.n(R),M=t(355),x=t(268),z=t(261),K=t(144);a.default=Object(i.c)(function(e){return{containers:e.containers.containers,loading:e.containers.loading,errorContainers:e.containers.error}},function(e){return{fetchContainers:function(){return e(s.e())},removeContainers:function(a){return e(s.m(a))},stopContainers:function(a){return e(s.p(a))},killContainers:function(a){return e(s.i(a))},containerRun:function(a){return e(s.c(a))}}})(function(e){for(var a=e.fetchContainers,t=e.removeContainers,i=e.stopContainers,s=e.killContainers,m=e.containerRun,E=e.containers,f=e.errorContainers,C=e.loading,p=Object(O.b)(),g=p.phone,N=p.tabletLandscape,R=p.desktop,A={},L=0,X=Object.entries(E);L<X.length;L++){var Z=X[L],J=Object(o.a)(Z,2);J[0],A[J[1].containerId]=!1}var U=Object(c.useState)(Object(r.a)({},A)),V=Object(o.a)(U,2),Q=V[0],q=V[1],G=Object(c.useState)(!1),Y=Object(o.a)(G,2),$=Y[0],ee=Y[1],ae=Object(c.useState)(""),te=Object(o.a)(ae,2),ne=te[0],re=te[1],oe=Object(c.useState)(!1),ce=Object(o.a)(oe,2),le=ce[0],ie=ce[1],se=Object(c.useState)(!1),me=Object(o.a)(se,2),ue=me[0],de=me[1],Ee=Object(c.useState)(""),fe=Object(o.a)(Ee,2),be=fe[0],Ce=fe[1],pe=Object(_.d)(Q);Object(c.useEffect)(function(){a()},[a]),Object(c.useEffect)(function(){de(f.length>0)},[f]),Object(c.useEffect)(function(){for(var e={},a=0,t=Object.entries(E);a<t.length;a++){var n=t[a],c=Object(o.a)(n,2);c[0],e[c[1].containerId]=!1}q(Object(r.a)({},e))},[E]);var ge=function(e){for(var a=e.target.id,t=Object(r.a)({},Q),n=0,c=Object.entries(t);n<c.length;n++){var l=c[n],i=Object(o.a)(l,2),s=i[0];i[1],a===s&&(t[s]=!t[s])}q(t)},ve=function(e,a){var c=Object(_.b)(e);switch(a.toLowerCase()){case"remove":!function(e,a){var r=[];E.forEach(function(a){!0===e[a.containerId]&&a.status.startsWith("Up ")&&r.push(a.containerId)}),r.length>0?(ie(!0),r=Object(n.a)(new Set(r)),Ce(r.join(" "))):t(a)}(e,c);break;case"stop":i(c);break;case"kill":s(c);break;default:console.log("Unknown operation!")}for(var l=Object(r.a)({},e),m=0,u=Object.entries(l);m<u.length;m++){var d=u[m],f=Object(o.a)(d,2),b=f[0];!0===f[1]&&(l[b]=!1)}q(l)},_e=Object(_.e)(Q),Oe=[u.a.Content,u.a.Heading],je=l.a.createElement("div",{className:u.a.Wrapper},l.a.createElement(d.a,null));return E&&(je=l.a.createElement(j.a,{container:!0,direction:"column"},E&&E.length?E.map(function(e,a){return l.a.createElement(l.a.Fragment,{key:e.containerId},l.a.createElement(B.a,null,l.a.createElement(T.a,{expandIcon:l.a.createElement(W.a,null),"aria-label":"Expand","aria-controls":"additional-actions1-content",id:"additional-actions1-header"},l.a.createElement(F.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:l.a.createElement(h.a,{color:"primary",onChange:ge,id:e.containerId,checked:Q[e.containerId]||!1}),label:""}),l.a.createElement(j.a,{item:!0,container:!0,className:u.a.Content},l.a.createElement(M.a,{title:e.containerId},l.a.createElement(j.a,{className:u.a.ContainerId},e.containerId)),(R||N)&&l.a.createElement(M.a,{title:e.status},l.a.createElement(j.a,{className:u.a.Status},e.status)),!g&&l.a.createElement(M.a,{title:e.image},l.a.createElement(j.a,{className:u.a.Image},e.image)),R&&l.a.createElement(M.a,{title:e.ports},l.a.createElement(j.a,{className:u.a.Ports},e.ports)),l.a.createElement(F.a,{"aria-label":"Acknowledge",onClick:function(e){return e.stopPropagation()},onFocus:function(e){return e.stopPropagation()},control:l.a.createElement(v,{containerId:e.containerId,containerOperation:ve}),label:""}))),l.a.createElement(H.a,null,l.a.createElement(j.a,{container:!0,direction:"column"},l.a.createElement(j.a,{container:!0,direction:"row"},l.a.createElement(j.a,{className:u.a.DetailTitle},"Names:"),l.a.createElement(j.a,{className:u.a.Names},e.names)),l.a.createElement(j.a,{container:!0,direction:"row"},l.a.createElement(j.a,{className:u.a.DetailTitle},"Created:"),l.a.createElement(j.a,{className:u.a.Created},e.created)),l.a.createElement(j.a,{container:!0,direction:"row"},l.a.createElement(j.a,{className:u.a.DetailTitle},"Command:"),l.a.createElement(j.a,{className:u.a.Command},e.command)),l.a.createElement(j.a,{container:!0,direction:"row"},l.a.createElement(j.a,{className:u.a.DetailTitle},"Ports:"),l.a.createElement(j.a,{className:u.a.Ports},e.ports)),l.a.createElement(j.a,{container:!0,direction:"row"},l.a.createElement(j.a,{className:u.a.DetailTitle},"Image:"),l.a.createElement(j.a,{className:u.a.Image},e.image)),l.a.createElement(j.a,{container:!0,direction:"row"},l.a.createElement(j.a,{className:u.a.DetailTitle},"Status:"),l.a.createElement(j.a,{className:u.a.Status},e.status))))))}):"")),l.a.createElement("div",{className:u.a.Containers},l.a.createElement("div",{className:u.a.Wrapper},l.a.createElement("h1",{className:u.a.Headline},"Podman Containers"),l.a.createElement("p",null,"Showing information about Containers and offering various operations with them"),l.a.createElement(j.a,{container:!0,className:u.a.Buttons},l.a.createElement(j.a,{item:!0,className:u.a.Button},l.a.createElement(b.a,{disabled:!_e,color:"secondary",variant:"outlined",startIcon:l.a.createElement(I.a,null),onClick:function(){return ve(Q,"remove")}},"Remove Selected")),l.a.createElement(j.a,{item:!0,className:u.a.Button},l.a.createElement(b.a,{variant:"outlined",color:"primary",onClick:function(){ee(!0)}},"Run"),l.a.createElement(w.a,{open:$,onClose:function(){ee(!1)},"aria-labelledby":"form-dialog-title"},l.a.createElement(D.a,{id:"form-dialog-title"},"Run"),l.a.createElement(P.a,null,l.a.createElement(y.a,null,'Enter the command for "podman run"'),l.a.createElement(k.a,{autoFocus:!0,margin:"dense",id:"name",label:"Podman Run",type:"text",fullWidth:!0,onChange:function(e){re(e.target.value)}})),l.a.createElement(S.a,null,l.a.createElement(b.a,{onClick:function(){ee(!1),0!=ne.length&&(m(ne),re(""))},color:"primary"},"Run")))),C&&l.a.createElement(d.a,null)),le&&l.a.createElement(x.a,{severity:"error",onClose:function(){ie(!le)}},l.a.createElement(z.a,null,l.a.createElement("strong",null,"Error")),"The following containers are running and cannot be removed:",be.length>0?be.split(" ").map(function(e,a){return l.a.createElement(K.a,{key:e,variant:"body1",component:"div",align:"left"},l.a.createElement("strong",null,"container: ",e),l.a.createElement("strong",null))}):""),ue&&l.a.createElement(x.a,{severity:"error",onClose:function(){de(!ue)}},l.a.createElement(z.a,null,l.a.createElement("strong",null,"Backend Error")),f.length>0&&l.a.createElement("p",{className:u.a.Error},f)),l.a.createElement("div",{className:u.a.Info},l.a.createElement("div",{className:Oe.join(" ")},l.a.createElement(h.a,{color:"primary",onChange:function(){var e=Object(_.c)(Q);q(e)},checked:pe||!1}),l.a.createElement("div",{className:u.a.ContainerId},"ID"),(R||N)&&l.a.createElement("div",{className:u.a.Status},"Status"),!g&&l.a.createElement("div",{className:u.a.Image},"Image"),R&&l.a.createElement("div",{className:u.a.Ports},"Ports")),je)))})}}]);
//# sourceMappingURL=5.9bbf78a5.chunk.js.map
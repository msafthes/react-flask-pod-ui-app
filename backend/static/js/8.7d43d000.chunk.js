(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{345:function(e,n,a){e.exports={ContainerLogs:"ContainerLogs_ContainerLogs__1TlbW",Wrapper:"ContainerLogs_Wrapper__3DxKE",Info:"ContainerLogs_Info__V_cVS",LogViewer:"ContainerLogs_LogViewer__1C4jt",Heading:"ContainerLogs_Heading__3CXtV",ContainerLog:"ContainerLogs_ContainerLog__3Tvjn",Headline:"ContainerLogs_Headline__2VtDA"}},355:function(e,n,a){"use strict";a.r(n);var t=a(0),o=a.n(t),r=a(29),i=a(27),c=a(115),s=a(301),l=a(345),g=a.n(l),L=a(89);n.default=Object(r.c)(function(e){return{containerLogs:e.containers.containerLogs,activeConnection:e.connections.activeConnection}},function(e){return{}})(Object(i.g)(function(e){var n=e.activeConnection,a=Object(t.useContext)(c.a);Object(t.useEffect)(function(){var t=setInterval(function(){a.updateLogs(e.match.params.id,n.username)},5e3);return function(){clearInterval(t)}},[]);var r=e.match.params.id,i=e.containerLogs,l=o.a.createElement("div",{className:g.a.Wrapper},o.a.createElement(L.a,null));return i&&i[r]&&(l=o.a.createElement(s.LazyLog,{enableSearch:!0,extraLines:1,text:i[r].logs,caseInsensitive:!0})),o.a.createElement("div",{className:g.a.ContainerLogs},o.a.createElement("div",{className:g.a.Wrapper},o.a.createElement("h1",{className:g.a.Headline},"Containers Logs"),o.a.createElement("p",null,"Container ID: ",r),o.a.createElement("div",{className:g.a.LogViewer},l)))}))}}]);
//# sourceMappingURL=8.7d43d000.chunk.js.map
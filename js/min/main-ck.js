$(document).ready(function(){var o={init:function(){o.work.l()},s:{ani:.25,work:!1},g:{show:function(o,n){TweenMax.set(o,{display:n})}},work:{l:function(){console.log("adding WORK listeners...");var n=$("#work");n.on("mouseenter",".thumbList",function(){o.work.a.listEnter(n)}).on("mouseleave",".thumbList",function(){o.work.a.listLeave(n)}).on("mouseenter",".thumbSquare",function(){o.work.a.infoEnter(n,$(this))})},a:{infoEnter:function(n,t){var e=o.s.ani,a=t.position(),i=n.find("#workInformation");o.s.work?(TweenMax.set(i,{display:"block"}),TweenMax.to(i,e,{left:a.left,opacity:"1",top:a.top}),o.work.a.jump.up(i,e)):(TweenMax.set(i,{display:"block",left:a.left,top:a.top}),TweenMax.to(i,e,{opacity:"1",transform:"scale(1)"}))},jump:{up:function(n,t){TweenMax.to(n,t/2,{boxShadow:"0 30px 30px 0 rgba(0, 0, 0, 0.15)",scale:"1.1",onComplete:o.work.a.jump.down,onCompleteParams:[n,t]})},down:function(o,n){TweenMax.to(o,n/2,{boxShadow:"none",scale:"1"})}},listEnter:function(){console.log("work list = active"),o.s.work=!0},listLeave:function(n){var t=o.s.ani,e=n.find("#workInformation");TweenMax.to(e,t,{opacity:"0",transform:"scale(1.5)",onComplete:o.g.show,onCompleteParams:[e,"none"]}),console.log("work list = dormant"),o.s.work=!1}}}};!function(){o.init()}()});
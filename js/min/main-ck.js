var $m={init:function(){$m.f.init(),$m.s.ltie9||($m.work.init(),$m.details.init(),$m.fastClick(),$m.lightBox.init())},s:{ani:.25,dom:{work:$("#work")},col:{white:"255, 255, 255",blueLight:"120, 204, 254",blue:"#538ed9",blueMedium:"#325a8d",blueDark:"50, 62, 80",divider:"242, 250, 255",shadow:"200, 200, 200"},ltie9:!1},g:{},fastClick:function(){FastClick.attach(document.body)},f:{init:function(){console.log("checking features");var t=$("html");t.hasClass("no-svg")&&(console.log("svg suport = false"),$m.f.noSvg.init()),t.hasClass("lt-ie9")&&($m.s.ltie9=!0,$m.f.noLb.init())},noSvg:{init:function(){$("#portraitBody").attr({src:"img/me-body.png"}),$("#portraitHands").attr({src:"img/me-hands.png"}),$(".svgIcon").each(function(){$m.f.noSvg.addPng($(this))})},addPng:function(t){var e=t.attr("data-noSvg");t.attr({src:e})}},noLb:{init:function(){console.log("expand lightbox");var t=$m.s.dom.work,e=t.find("> .shadowContainer").find("> .thumbList"),a=$m.f.noLb.s.projectURL,n=a.length,o,i;for(o=0;n>o;o++)i=e.find('> .thumbSquare[data-project="'+a[o].project+'"]'),i.find("> a").attr({href:"img/"+a[o].url,target:"_blank"})},s:{projectURL:[{project:"travelHub",url:"travel-hub/1-landscape.jpg"},{project:"rateCard",url:"rate-card/1-landscape.png"},{project:"nielsen",url:"nielsen/2-landscape.png"},{project:"xxxx",url:"xxxx"},{project:"dealsSection",url:"deals-section/1-landscape.png"},{project:"silverFernFarms",url:"silver-fern-farms/3-landscape.png"},{project:"stuffRedesign",url:"stuff-redesign/1-landscape.jpg"},{project:"travelInfographic",url:"travel-infographic/1-landscape.png"},{project:"mediaHub",url:"media-hub/2-landscape.png"}]}}},work:{init:function(){$m.work.l()},l:function(){console.log("adding WORK listeners...");var t=$m.s.dom.work,e=t.find("> .shadowContainer").find("> .thumbList");e.on("mouseenter",".thumbSquare",function(){$m.work.a.thumbEnter($(this))}).on("mouseleave",".thumbSquare",function(){$m.work.a.thumbLeave($(this))}).on("click",".thumbSquare",function(t){t.preventDefault(),$m.lightBox.a.state.setDetails($(this)),$m.lightBox.a.state.fadeIn()})},a:{thumbEnter:function(t){var e=$m.s.ani,a=t.find("> a"),n=a.find("> .iconContainer"),o=n.find("> .dormant"),i=n.find("> .active"),r=i.find("> .shadowLogo");t.attr({"data-state":"enter"}),TweenMax.to(a,e,{color:"rgb("+$m.s.col.blueLight+")",transform:"translateY(-1.5em) scale(1.1)",textShadow:"0 1.5em 10px rgb("+$m.s.col.shadow+")"}),TweenMax.to(o,e,{autoAlpha:0}),TweenMax.to(i,e,{autoAlpha:1}),TweenMax.to(r,e,{transform:"translateY(1.5em)"})},thumbLeave:function(t){var e=$m.s.ani,a=t.find("> a"),n=a.find("> .iconContainer"),o=n.find("> .dormant"),i=n.find("> .active"),r=i.find("> .shadowLogo");t.removeAttr("data-state"),TweenMax.to(t.find("> a"),e,{color:"rgb("+$m.s.col.blueDark+")",transform:"translateY(0) scale(1)",textShadow:"none"}),TweenMax.to(o,e,{autoAlpha:1}),TweenMax.to(i,e,{autoAlpha:0}),TweenMax.to(r,e,{transform:"translateY(0)"})}}},lightBox:{init:function(){$m.lightBox.l()},s:{module:$("#lightBox"),projectCurrent:1,projectLength:{travelHub:3,rateCard:2,nielsen:3,tourismAustralia:3,dealsSection:3,silverFernFarms:3,stuffRedesign:4,travelInfographic:3,mediaHub:4}},l:function(){var t=$m.lightBox.s.module;t.on("mouseenter","a",function(){$m.lightBox.a.changeIcon($(this),"enter")}).on("mouseleave","a",function(){$m.lightBox.a.changeIcon($(this),"leave")}).on("click","a",function(t){t.preventDefault();var e=$(this);e.hasClass("close")?$m.lightBox.a.state.fadeOut():e.hasClass("previous")?$m.lightBox.a.updateProject.init("-"):e.hasClass("next")&&$m.lightBox.a.updateProject.init("+")})},a:{state:{fadeIn:function(){var t=$m.s.ani,e=$m.lightBox.s.module;TweenMax.to(e,t,{autoAlpha:1}),$m.s.ltie9&&$m.ie8.iconFont.lightBox()},setDetails:function(t){var e=$m.lightBox.s.module,a=e.find("> .content"),n=t.attr("data-project"),o=$m.lightBox.s.projectLength[n];$m.lightBox.s.projectCurrent=n,a.attr({"data-projectCurrent":n,"data-projectLength":o,"data-projectImage":1}),e.find("> .bottom-ui").find(".dynamic.length").text(o).end().find(".dynamic.current").text("1")},fadeOut:function(){var t=$m.s.ani,e=$m.lightBox.s.module;TweenMax.to(e,t,{autoAlpha:0})}},changeIcon:function(t,e){var a=$m.s.ani,n=t.find(".dormant"),o=t.find(".active"),i;i="enter"===e?0:1,TweenMax.to(n,a,{autoAlpha:i}),i="enter"===e?1:0,TweenMax.to(o,a,{autoAlpha:i})},updateProject:{init:function(t){console.log("direction = "+t),$m.lightBox.a.updateProject.fadeOut(t)},fadeOut:function(t){var e=$m.s.ani,a=$m.lightBox.s.module,n=a.find("> .content");TweenMax.to(n,e,{left:t+"=100px",opacity:"0",onComplete:$m.lightBox.a.updateProject.swap,onCompleteParams:[n,t]})},swap:function(t,e){var a=$m.lightBox.s.projectCurrent,n=$m.lightBox.s.projectLength[a],o=parseInt(t.attr("data-projectImage"),10);console.log("PC = "+a),console.log("PL = "+$m.lightBox.s.projectLength[a]),console.log("PI = "+parseInt(t.attr("data-projectImage"),10)),"+"===e?(o+=1,o>n&&(o=1)):(o-=1,1>o&&(o=n)),console.log("projectCurrent | after = "+o),t.attr({"data-projectImage":o}),t.siblings(".bottom-ui").find(".dynamic.current").text(o),$m.lightBox.a.updateProject.fadeIn(t,e)},fadeIn:function(t,e){var a=$m.s.ani;e="+"===e?"-":"+",console.log("left = "+e+"=100"),TweenMax.set(t,{left:e+"=200px"}),TweenMax.to(t,a,{left:"0",opacity:"1"})}}}},details:{init:function(){$m.details.d(),$m.details.l()},d:function(){$m.s.dom.details=$("#details")},l:function(){var t=$m.s.dom.details.find("> .shadowContainer").find("> address");$m.s.ltie9||t.on("mouseenter","li",function(){$m.details.a.userEnter($(this))}).on("mouseleave","li",function(){$m.details.a.userLeave($(this))})},a:{userEnter:function(t){console.log("detail enter");var e=$m.s.ani,a=t.find(".dormant"),n=t.find(".active");TweenMax.to(t,e,{color:"#fff"}),TweenMax.to(a,e,{autoAlpha:"0"}),TweenMax.to(n,e,{autoAlpha:"1"})},userLeave:function(t){console.log("detail leave");var e=$m.s.ani,a=t.find(".dormant"),n=t.find(".active");TweenMax.to(t,e,{color:"rgb("+$m.s.col.blueDark+")"}),TweenMax.to(a,e,{autoAlpha:"1"}),TweenMax.to(n,e,{autoAlpha:"0"})}}}};$(document).ready(function(){$m.init()});
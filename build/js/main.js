var Img=function(i,a){this.date=i,this.src=a,this.day,this.collect()};Img.instances=[],Img.prototype.collect=function(){Img.instances.indexOf(this)===-1&&Img.instances.push(this)},Img.prototype.render=function(){$("#image-container").append('<div class="image-wrapper"><div class="view"><img src="img/img-loading.gif" data-src=gallery/'+this.src+'></div><div class="filter-indicator day'+this.day+'"></div></div>')};var initPage=function(){var i="/gallery/",a=[];$.ajax({url:i,success:function(i){$(i).find("a").attr("href",function(i,t){if(t.match(/\.(jpe?g|png|gif)$/)){var e=t.match(/\d+(?=_)/g);a.indexOf(e[0])===-1&&a.push(e[0]);new Img(e[0],t)}})},complete:function(){var i=a.sort(function(i,a){return i<a?-1:i>a?1:0});Img.instances.forEach(function(a){a.day=i.indexOf(a.date)+1,a.render()});for(var t=0;t<4;t++)$("#image-container").append('<div class="image-placeholder"></div>');lazyLoad.loadImages(),nav.renderBtns(i)}})}(),lazyLoad=function(){function i(i){var a=i.getBoundingClientRect();return a.top>=-300&&a.left>=-300&&a.bottom/1.4<=$(window).height()&&a.right<=$(window).width()+300}function a(i){setInterval(i,500)}function t(){s&&(s=!1,e())}function e(){var a=$("#image-container img:not(:hidden)");a.each(function(a){i(this)&&$(this).attr("src",$(this).attr("data-src"))})}var s=!1,n=$(window);return n.on("resize scroll",function(){s=!0}),a(t),{loadImages:e}}(),nav=function(){function i(i){var a=""+100/(i.length/.94)+"%";if(i.length>7)alert("Date range of images present in img/gallery folder must not span more than 7 days");else for(var t=0;t<i.length;t++)c.find("ul").append('<li class="day'+(t+1)+'">'+v[t]+"</li>"),f.find("ul").append('<li class="day'+(t+1)+'">Reset</li>');d.find("li").css("width",a)}function a(){n.scrollTop()>=l?(d.removeClass("layout-fluid-full-width").addClass("nav-fixed"),r.removeClass("layout-fluid-full-width").addClass("filter-indicator-main-fixed")):n.scrollTop()<=l&&(d.removeClass("nav-fixed").addClass("layout-fluid-full-width"),r.removeClass("filter-indicator-main-fixed").addClass("layout-fluid-full-width"))}function t(i){var a=i.attr("class").split(" ")[0];f.find("li").removeClass("active"),c.find("li").removeClass("slide-up"),i.hasClass("slide-down")?(i.removeClass("slide-down").addClass("slide-up"),e(),setTimeout(filterImgs.resetFilter,350)):(c.find(".slide-down").removeClass("slide-down").addClass("slide-up"),i.addClass("slide-down"),f.find("."+a).addClass("active"),e(),s(i),setTimeout(filterImgs.applyFilter(i),350))}function e(){r.removeClass(function(i,a){return(a.match(/(day)\d+/)||[]).join(" ")})}function s(i){var a=i.attr("class").split(" ")[0];r.addClass(a)}var n=$(window),l=$("#filter-nav").offset().top,d=$("nav"),r=$(".filter-indicator-main"),o=d.find("ul"),c=$("#filter-nav"),f=$("#reset-nav"),v=["Day One","Day Two","Day Three","Day Four","Day Five","Day Six","Day Seven"];return n.on("resize scroll",function(){a()}),o.on("click","li",function(){t($(this))}),{btnLabels:v,renderBtns:i}}(),filterImgs=function(){function i(i){var a=i.attr("class").split(" ")[0];$(".image-wrapper").each(function(i){$(this).find(".filter-indicator").hasClass(a)?$(this).find(".filter-indicator").hasClass(a)&&$(this).show():$(this).hide(),$(this).find("img").attr("src","img/img-loading.gif")}),setTimeout(lazyLoad.loadImages,50)}function a(){$(".image-wrapper").each(function(i){$(this).show(),$(this).find("img").attr("src","img/img-loading.gif")}),setTimeout(lazyLoad.loadImages,50)}$(".filter-indicator-main");return{resetFilter:a,applyFilter:i}}(),viewImg=function(){function i(){var i=$(".image-wrapper-active").next();if("none"!==i.css("display")&&"undefined"!=typeof i.css("display")){$(".filter-indicator").css("visibility","visible"),d.find("#day").removeClass();var a=i.find(".filter-indicator").attr("class").split(" ")[1].match(/\d/)[0],e=i.find(".filter-indicator").attr("class").split(" ")[1];t(),l.addClass("no-scroll"),d.find("#day").html(nav.btnLabels[a-1]),d.find("#day").addClass(e),i.addClass("image-wrapper-active"),i.find(".view").addClass("view-active"),i.find(".filter-indicator").css("visibility","hidden"),lazyLoad.loadImages()}}function a(){var i=$(".image-wrapper-active").prev();if("none"!==i.css("display")&&"undefined"!=typeof i.css("display")){$(".filter-indicator").css("visibility","visible"),d.find("#day").removeClass();var a=i.find(".filter-indicator").attr("class").split(" ")[1].match(/\d/)[0],e=i.find(".filter-indicator").attr("class").split(" ")[1];t(),l.addClass("no-scroll"),d.find("#day").html(nav.btnLabels[a-1]),d.find("#day").addClass(e),i.addClass("image-wrapper-active"),i.find(".view").addClass("view-active"),i.find(".filter-indicator").css("visibility","hidden"),lazyLoad.loadImages()}}function t(){$(".image-wrapper").removeClass("image-wrapper-active"),$(".view").removeClass("view-active"),l.removeClass("no-scroll")}function e(i){var a=i.find(".filter-indicator").attr("class").split(" ")[1].match(/\d/)[0],t=i.find(".filter-indicator").attr("class").split(" ")[1];d.find("#day").removeClass(),l.addClass("no-scroll"),n.show(),i.addClass("image-wrapper-active"),i.find(".view").addClass("view-active"),i.find(".filter-indicator").css("visibility","hidden"),d.find("#day").html(nav.btnLabels[a-1]),d.find("#day").addClass(t)}var s=$("#image-container"),n=$("#modal"),l=$("body"),d=$("#modal-nav");$(".image-wrapper-active");s.on("click",".image-wrapper",function(i){t(),e($(this))}),n.on("click",function(e){e.target==e.currentTarget||"close"==e.target.className?(t(),$(".filter-indicator").css("visibility","visible"),n.hide()):"next"==e.target.className?i():"prev"==e.target.className&&a()})}();
//# sourceMappingURL=../maps/main.js.map

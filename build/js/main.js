var Img=function(i,a){this.date=i,this.src=a,this.day,this.collect()};Img.prototype.collect=function(){Img.instances.indexOf(this)===-1&&Img.instances.push(this)},Img.prototype.render=function(){$("#image-container").append('<div class="image-wrapper"><div class="view"><img src="img/img-loading.gif" data-src=/gallery/'+this.src+'></div><div class="filter-indicator day'+this.day+'"></div></div>')},Img.instances=[];var numOfDays=[],initPage=function(){function i(){numOfDays=e.reduce(function(i,a){return i.indexOf(a)<0&&i.push(a),i},[])}function a(){Img.instances.forEach(function(i){i.day=numOfDays.indexOf(i.date)+1})}function s(){Img.instances.forEach(function(i){i.render()})}var t="/gallery/",e=[];$.ajax({url:t,success:function(i){$(i).find("a").attr("href",function(i,a){if(a.match(/\.(jpe?g|png|gif)$/)){var s=a.match(/\d+(?=_)/g);e.push(s[0]);new Img(s[0],a)}})},complete:function(){i(),a(),s(),lazyLoad.loadImages(),nav.renderBtns()}})}(),lazyLoad=function(){function i(i){var a=i.getBoundingClientRect();return a.top>=-300&&a.left>=-300&&a.bottom/1.4<=$(window).height()&&a.right<=$(window).width()+300}function a(i){setInterval(i,200)}function s(){e&&(e=!1,t())}function t(){var a=$("#image-container img");a.each(function(a){i(this)&&$(this).attr("src",$(this).attr("data-src"))})}var e=!1,n=$(window);return n.on("resize scroll",function(){e=!0,events.emit("scrolled")}),a(s),{loadImages:t}}(),nav=function(){function i(){var i=""+100/(numOfDays.length/.94)+"%";if(numOfDays.length>7)alert("Date range of images present in img/gallery folder must not span more than 7 days");else for(var a=0;a<numOfDays.length;a++)c.find("ul").append('<li class="day'+(a+1)+'">'+m[a]+"</li>"),f.find("ul").append('<li class="day'+(a+1)+'">Reset</li>');d.find("li").css("width",i)}function a(){n.scrollTop()>=l?(d.removeClass("layout-fluid-full-width").addClass("nav-fixed"),r.removeClass("layout-fluid-full-width").addClass("filter-indicator-main-fixed")):n.scrollTop()<=l&&(d.removeClass("nav-fixed").addClass("layout-fluid-full-width"),r.removeClass("filter-indicator-main-fixed").addClass("layout-fluid-full-width"))}function s(i){var a=i.attr("class").split(" ")[0];f.find("li").removeClass("active"),c.find("li").removeClass("slide-up"),i.hasClass("slide-down")?(i.removeClass("slide-down").addClass("slide-up"),t(),filterImgs.resetFilter()):(c.find(".slide-down").removeClass("slide-down").addClass("slide-up"),i.addClass("slide-down"),f.find("."+a).addClass("active"),t(),e(i),filterImgs.applyFilter(i))}function t(){r.removeClass(function(i,a){return(a.match(/(day)\d+/)||[]).join(" ")})}function e(i){var a=i.attr("class").split(" ")[0];r.addClass(a)}var n=$(window),l=$("#filter-nav").offset().top,d=$("nav"),r=$(".filter-indicator-main"),o=d.find("ul"),c=$("#filter-nav"),f=$("#reset-nav"),m=["Day One","Day Two","Day Three","Day Four","Day Five","Day Six","Day Seven"];return events.on("scrolled",a),o.on("click","li",function(){s($(this))}),{btnLabels:m,renderBtns:i}}(),filterImgs=function(){function i(i){var a=i.attr("class").split(" ")[0];$(".image-wrapper").each(function(i){$(this).find(".filter-indicator").hasClass(a)?$(this).find(".filter-indicator").hasClass(a)&&$(this).show():$(this).hide(),$(this).find("img").attr("src","img/img-loading.gif")}),setTimeout(lazyLoad.loadImages,50)}function a(){$(".image-wrapper").each(function(i){$(this).show(),$(this).find("img").attr("src","img/img-loading.gif")}),setTimeout(lazyLoad.loadImages,50)}$(".filter-indicator-main");return{resetFilter:a,applyFilter:i}}(),viewImg=function(){function i(){var i=$(".image-wrapper-active").next();if("none"!==i.css("display")&&"undefined"!=typeof i.css("display")){$(".filter-indicator").css("visibility","visible"),d.find("#day").removeClass();var a=i.find(".filter-indicator").attr("class").split(" ")[1].match(/\d/)[0],t=i.find(".filter-indicator").attr("class").split(" ")[1];s(),l.addClass("no-scroll"),d.find("#day").html(nav.btnLabels[a-1]),d.find("#day").addClass(t),i.addClass("image-wrapper-active"),i.find(".view").addClass("view-active"),i.find(".filter-indicator").css("visibility","hidden"),lazyLoad.loadImages()}}function a(){var i=$(".image-wrapper-active").prev();if("none"!==i.css("display")&&"undefined"!=typeof i.css("display")){$(".filter-indicator").css("visibility","visible"),d.find("#day").removeClass();var a=i.find(".filter-indicator").attr("class").split(" ")[1].match(/\d/)[0],t=i.find(".filter-indicator").attr("class").split(" ")[1];s(),l.addClass("no-scroll"),d.find("#day").html(nav.btnLabels[a-1]),d.find("#day").addClass(t),i.addClass("image-wrapper-active"),i.find(".view").addClass("view-active"),i.find(".filter-indicator").css("visibility","hidden"),lazyLoad.loadImages()}}function s(){$(".image-wrapper").removeClass("image-wrapper-active"),$(".view").removeClass("view-active"),l.removeClass("no-scroll")}function t(i){var a=i.find(".filter-indicator").attr("class").split(" ")[1].match(/\d/)[0],s=i.find(".filter-indicator").attr("class").split(" ")[1];d.find("#day").removeClass(),l.addClass("no-scroll"),n.show(),i.addClass("image-wrapper-active"),i.find(".view").addClass("view-active"),i.find(".filter-indicator").css("visibility","hidden"),d.find("#day").html(nav.btnLabels[a-1]),d.find("#day").addClass(s)}var e=$("#image-container"),n=$("#modal"),l=$("body"),d=$("#modal-nav");$(".image-wrapper-active");e.on("click",".image-wrapper",function(i){s(),t($(this))}),n.on("click",function(t){t.target==t.currentTarget||"close"==t.target.className?(s(),$(".filter-indicator").css("visibility","visible"),n.hide()):"next"==t.target.className?i():"prev"==t.target.className&&a()})}();
//# sourceMappingURL=../maps/main.js.map

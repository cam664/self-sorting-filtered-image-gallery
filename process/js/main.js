//Constructor for images in img/gallery folder
var Img = function (date, src) {
    this.date = date;
    this.src = src;
    this.day;

    this.collect();
}

Img.instances = [];
//on construction push instance into array
Img.prototype.collect = function () {
    if (Img.instances.indexOf(this) === -1) {
        Img.instances.push(this);
    }
};
//render method creates css classes .image-wrapper, .view and .filter-indicator with class .day to set corresponding day color
Img.prototype.render = function () {

    $('#image-container').append('<div class="image-wrapper"><div class="view"><img src="img/img-loading.gif" data-src=' + 'gallery/' + this.src + '></div><div class="filter-indicator day' + this.day + '"></div></div>');
};

var initPage = (function () {
    var dir = "/gallery/";
    var datesCollection = [];
    //local ajax call
    $.ajax({
        url: dir,
        success: function (data) {

            $(data).find("a").attr("href", function (i, val) {

                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    var date = val.match(/\d+(?=_)/g);//match all digits before "_" This is the date when dealing with android picture naming convention 

                    if (datesCollection.indexOf(date[0]) === -1) {
                        datesCollection.push(date[0]);//collect all unique dates
                    }
                    
                    var image = new Img(date[0], val);
                }
            });
        },

        complete: function () {
            var sortedDates = datesCollection.sort(function(a, b){
                if (a < b) { return -1 }
                if (a > b) { return 1 }
              	else { return 0 };
            });

            Img.instances.forEach(function (el) {
                //check the date prop of Img.instances agaisnt the set of dates in numOfDays. Match index + 1 becomes correct day picture was taken
                el.day = sortedDates.indexOf(el.date) + 1;

                el.render();
            });
            //adding non visible elements to prevent flexbox rendering the last row of images with spaces between them
            for (var i = 0; i < 4; i++) {  
                $('#image-container').append('<div class="image-placeholder"></div>');
            }

            lazyLoad.loadImages();
            nav.renderBtns(sortedDates);
        }
    });  
})();

var lazyLoad = (function () {

    var didScroll = false;

    //cache DOM
    var $window = $(window);

    //bind events
    $window.on('resize scroll', function () {
        didScroll = true;
    });

    setScrollInterval(scrollHandler);//used for throttling window scroll events. 
    
    //check if image element is in viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= -300 &&
            rect.left >= -300 &&
            rect.bottom / 1.4 <= $(window).height() &&
            rect.right <= $(window).width() + 300
        );
    }
    
    function setScrollInterval(fn) {
        setInterval(fn, 500);
    }
    //check every 500ms if a scroll event has fired. If true loadImages()
    function scrollHandler() {
        if (didScroll) {
            didScroll = false;
            loadImages();
        }
    }
    //if image in viewport 'load' it by switching data-src and real src
    function loadImages() {
        var $images = $('#image-container img:not(:hidden)');

        $images.each(function (index) {
            if (isElementInViewport(this)) {

                $(this).attr("src", $(this).attr("data-src"));
            }
        });
    }

    return {
        loadImages: loadImages
    }
})();

var nav = (function () {

    //cache DOM
    var $window = $(window);
    var $distance = $('#filter-nav').offset().top;//distance scrolled from top of document
    var $nav = $('nav');
    var $filterMain = $('.filter-indicator-main');
    var $ul = $nav.find('ul');
    var $filterNav = $('#filter-nav');
    var $resetNav = $('#reset-nav');
    
    var btnLabels = ['Day One', 'Day Two', 'Day Three', 'Day Four', 'Day Five', 'Day Six', 'Day Seven'];//used for nav btn labels

    //bind events
    $window.on('resize scroll', function() {
        stickyNav();
    });

    $ul.on('click', 'li', function() {
        navAnimations($(this));
    });

    function renderBtns(datesCollection) {
        var btnWidth = '' + (100 / (datesCollection.length / 0.94)) + '%';//width of btns is percent based on number of btns needed
        
        //inform user the dates of their picures span too many days
        if (datesCollection.length > 7) {
            alert('Date range of images present in img/gallery folder must not span more than 7 days');
        } else {
            //render btns on page
            for (var i = 0; i < datesCollection.length; i++) {
                $filterNav.find('ul').append('<li class="day' + (i + 1) + '">' + btnLabels[i] + '</li>');
                $resetNav.find('ul').append('<li class="day' + (i + 1) + '">Reset</li>');
            }
        }
        //set btn width
        $nav.find('li').css('width', btnWidth);
    }
    
    function stickyNav() {
        if ($window.scrollTop() >= $distance) {
            $nav.removeClass('layout-fluid-full-width').addClass('nav-fixed');
            $filterMain.removeClass('layout-fluid-full-width').addClass('filter-indicator-main-fixed');
        } else if ($window.scrollTop() <= $distance) {
            $nav.removeClass('nav-fixed').addClass('layout-fluid-full-width');
            $filterMain.removeClass('filter-indicator-main-fixed').addClass('layout-fluid-full-width');
        }
    }

    function navAnimations($this) {
        var clickedClass = $this.attr('class').split(' ')[0];//gets the first class of element li (.day<number> in this case). Used in the module to set day filter color. 

        $resetNav.find('li').removeClass('active');
        $filterNav.find('li').removeClass('slide-up');

        if ($this.hasClass('slide-down')) {
            $this.removeClass('slide-down').addClass('slide-up');
            resetFilterColor();
            setTimeout(filterImgs.resetFilter, 350);//method for restoring all previously filtered out images into view again
        } else {
            $filterNav.find('.slide-down').removeClass('slide-down').addClass('slide-up');
            $this.addClass('slide-down');
            $resetNav.find('.' + clickedClass).addClass('active');
            resetFilterColor();
            applyFilterColor($this);
            setTimeout(filterImgs.applyFilter($this), 350);//method for filtering out images from view. Pass $this for info on what .day<number> to filter by
        }

    }
    //remove all .day<number> classes from main filter bar
    function resetFilterColor() {
        $filterMain.removeClass(function (index, css) {
            return (css.match(/(day)\d+/) || []).join(' ');
        });
    }
    //apply .day<number> classes to main filter bar
    function applyFilterColor($this) {
        var clickedClass = $this.attr('class').split(' ')[0];

        $filterMain.addClass(clickedClass);
    }

    return {
        btnLabels: btnLabels,
        renderBtns: renderBtns
    }
})();

var filterImgs = (function () {

    //cache DOM 
    var $filterMain = $('.filter-indicator-main');

    function applyFilter($this) {
        var clickedClass = $this.attr('class').split(' ')[0];//gets the first class of element li (.day<number> in this case).
        //use .day<number> class of nav li to filter out images from view
        $('.image-wrapper').each(function (index) {
            if (!$(this).find('.filter-indicator').hasClass(clickedClass)) {
                $(this).hide();
            } else if ($(this).find('.filter-indicator').hasClass(clickedClass)) {
                $(this).show();
            }
            $(this).find('img').attr("src", 'img/img-loading.gif');//set images back to loading gif to prevent browser having to render lots of images at once
        })
        setTimeout(lazyLoad.loadImages, 50);
    }
    
    function resetFilter() {
        $('.image-wrapper').each(function (index) {
            $(this).show();
            $(this).find('img').attr("src", 'img/img-loading.gif');
        })
        setTimeout(lazyLoad.loadImages, 50);
    }

    return {
        resetFilter: resetFilter,
        applyFilter: applyFilter
    }
})();

var viewImg = (function () {

    //cache DOM
    var $imgContainer = $('#image-container');
    var $modal = $('#modal');
    var $body = $('body');
    var $modalNav = $('#modal-nav');
    var $imgActive = $('.image-wrapper-active');

    //bind events
    $imgContainer.on('click', '.image-wrapper', function (e) {
        reset();
        viewActive($(this));
    });
    
    $modal.on('click', function (e) {
        //clicks on modal itself or 'X' close modal and minimize enlarged image
        if (e.target == e.currentTarget || e.target.className == 'close') {
            reset();
            $('.filter-indicator').css('visibility', 'visible');//all toggling of filter indicator visibility is to get it out of the way when enlarging an image
            $modal.hide();
        } else if (e.target.className == 'next') {
            next();
        } else if (e.target.className == 'prev') {
            prev();
        }
    });

    function next() {
        var $nextPic = $('.image-wrapper-active').next();//store the next image that needs to be displayed
        //disallow navigating to currently filtered out images or past the beginning/end of gallery
        if ($nextPic.css('display') === 'none' || typeof $nextPic.css('display') === 'undefined') {
            return;
        }
        
        $('.filter-indicator').css('visibility', 'visible');

        $modalNav.find('#day').removeClass();

        var dayNum = $nextPic.find('.filter-indicator').attr('class').split(' ')[1].match(/\d/)[0];//get the number of .day<number> class of next image element to use with nav.btnLabels arr
        var clickedClass = $nextPic.find('.filter-indicator').attr('class').split(' ')[1];//get the .day<number> class of next image element

        reset();
        $body.addClass('no-scroll');//disable scrolling when modal active

        $modalNav.find('#day').html(nav.btnLabels[dayNum - 1]);
        $modalNav.find('#day').addClass(clickedClass);
        $nextPic.addClass('image-wrapper-active');
        $nextPic.find('.view').addClass('view-active');
        $nextPic.find('.filter-indicator').css('visibility', 'hidden');

        lazyLoad.loadImages();
    }

    function prev() {
        var $prevPic = $('.image-wrapper-active').prev();

        if ($prevPic.css('display') === 'none' || typeof $prevPic.css('display') === 'undefined') {
            return;
        }

        $('.filter-indicator').css('visibility', 'visible');

        $modalNav.find('#day').removeClass();

        var dayNum = $prevPic.find('.filter-indicator').attr('class').split(' ')[1].match(/\d/)[0];
        var clickedClass = $prevPic.find('.filter-indicator').attr('class').split(' ')[1];

        reset();
        $body.addClass('no-scroll');

        $modalNav.find('#day').html(nav.btnLabels[dayNum - 1]);
        $modalNav.find('#day').addClass(clickedClass);
        $prevPic.addClass('image-wrapper-active');
        $prevPic.find('.view').addClass('view-active');
        $prevPic.find('.filter-indicator').css('visibility', 'hidden');

        lazyLoad.loadImages();
    }
    
    function reset() {
        $('.image-wrapper').removeClass('image-wrapper-active');
        $('.view').removeClass('view-active');
        $body.removeClass('no-scroll');
    }
    
    function viewActive($this) {
        var dayNum = $this.find('.filter-indicator').attr('class').split(' ')[1].match(/\d/)[0];//get the number of .day<number> class of image element to use with nav.btnLabels
        var clickedClass = $this.find('.filter-indicator').attr('class').split(' ')[1];//get the .day<number> class of image element

        $modalNav.find('#day').removeClass();

        $body.addClass('no-scroll');
        $modal.show();
        $this.addClass('image-wrapper-active');
        $this.find('.view').addClass('view-active');
        $this.find('.filter-indicator').css('visibility', 'hidden');

        $modalNav.find('#day').html(nav.btnLabels[dayNum - 1]);
        $modalNav.find('#day').addClass(clickedClass);
    }
})();
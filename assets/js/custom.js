/*  jQuery Nice Select - v1.0
https://github.com/hernansartorio/jquery-nice-select
Made by HernÃ¡n Sartorio  */
!function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open") && s.trigger("click"); else if (9 == t.keyCode && s.hasClass("open")) return !1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);

$(document).ready(function () {

    /*********Nice Select Image *********/
    // Toggle dropdown open/close
    document.querySelectorAll('.nice-select').forEach(select => {
    select.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelectorAll('.nice-select').forEach(el => {
        if (el !== this) el.classList.remove('open');
        });
        this.classList.toggle('open');
    });
    }); 
    // Click outside to close dropdown
    window.addEventListener('click', () => {
    document.querySelectorAll('.nice-select').forEach(el => el.classList.remove('open'));
    }); 
    // Handle option click and update current content
    document.querySelectorAll('.nice-select .option').forEach(option => {
    option.addEventListener('click', function (e) {
        e.stopPropagation();
        const select = this.closest('.nice-select');
        const current = select.querySelector('.current');
        current.innerHTML = this.innerHTML;
        select.classList.remove('open');
    });
    });

    /********* On scroll heder Sticky *********/
    function initHeaderSticky() {
        if (jQuery(document).height() > jQuery(window).height()) {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.site-header').addClass("fixed");
            } else {
                jQuery('.site-header').removeClass("fixed");
            }
        }
    }

    $(document).ready(function () {
        initHeaderSticky()
    });
    $(window).on('resize scroll', function () {
        initHeaderSticky()
    });

    // // /********* On scroll heder back *********/
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("header-sticky").style.top = "0";
        } else {
            document.getElementById("header-sticky").style.top = "-110px";
        }
        prevScrollpos = currentScrollPos;
    }

    /********* Announcebar hide ********/
    $('#announceclose').click(function () {
        $('.announcebar').slideUp("slow");
    });

    /******  Nice Select  ******/
    $('select').niceSelect();

    /******  menu hover  ******/
    $(".menu-lnk.has-item").hover(function () {
        $(this).toggleClass("menu_active");
        $(this).find(".menu-dropdown").toggleClass("open_menu");
        $("body").toggleClass("no_scroll");
    });

    /********* Mobile Menu ********/
    $('.mobile-menu-button').on('click', function (e) {
        e.preventDefault();
        setTimeout(function () {
            $('body').addClass('no_scroll active_menu');
            $(".mobile-menu-wrapper").toggleClass("active_menu");
            $('.overlay').addClass('active');
        }, 50);
    });
    $('body').on('click', '.overlay, .menu-close-icon svg', function (e) {
        e.preventDefault();
        $('body').removeClass('no_scroll active_menu');
        $(".mobile-menu-wrapper").removeClass("active_menu");
        $('.overlay').removeClass('active');
    });

    /** footer acnav **/
    $(".footer-acnav").on("click", function () {
        if ($(window).width() < 768) {
            if ($(this).hasClass("is_open")) {
                $(this).removeClass("is_open");
                $(this).siblings(".footer-acnav-list").slideUp(200);
            } else {
                $(".footer-acnav").removeClass("is_open");
                $(this).addClass("is_open");
                $(".footer-acnav-list").slideUp(200);
                $(this).siblings(".footer-acnav-list").slideDown(200);
            }
        }
    });

    //******** progress-wrap ************//
    $(document).ready(function () {
        "use strict"; 
        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        });
    });  
   
    document.querySelectorAll('.shipping-info .custom-checkbox input[type="checkbox"]').forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        const colorNameDiv = this.closest('.colors-checkbox').querySelector('.color-name');
        const colorNamePath = this.closest('.colors-checkbox').querySelector('.color-name svg path');
        const deliveryInfoDiv = this.closest('.colors-checkbox').querySelector('.delivery-info');
  
        if (this.checked) { 
          colorNamePath.style.fill = 'var(--first-color)'; 
          colorNameDiv.style.color = 'black';
          colorNameDiv.style.fontWeight = '600'; 
          deliveryInfoDiv.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
        } else {
          // Reset SVG path fill color to default when unchecked
          colorNamePath.style.fill = ''; 
          colorNameDiv.style.color = '';
          colorNameDiv.style.fontWeight = ''; 
          deliveryInfoDiv.style.boxShadow = '';
        }
      });
    }); 
  

    /*********  Multi-level accordion nav  ********/
    $('.acnav-label').click(function () {
        var label = $(this);
        var parent = label.parent('.has-children');
        var list = label.siblings('.acnav-list');
        if (parent.hasClass('is_open')) {
            list.slideUp('fast');
            parent.removeClass('is_open');
        }
        else {
            list.slideDown('fast');
            parent.addClass('is_open');
        }
    });

    /****  TAB Js ****/
    $("ul.tabs li").click(function () {
        var $this = $(this);
        var $theTab = $(this).attr("data-tab");
        if ($this.hasClass("active")) {
        } else {
            $this
                .closest(".tabs-wrapper")
                .find("ul.tabs li, .tabs-container .tab-content")
                .removeClass("active");
            $(
                '.tabs-container .tab-content[id="' +
                $theTab +
                '"], ul.tabs li[data-tab="' +
                $theTab +
                "]"
            ).addClass("active");
        }
        $(this).addClass("active");
    }); 

    /********* Datepicker *********/  
    $(document).ready(function () {
        $('.dob-picker').each(function () {
            flatpickr(this, {
                enableTime: false,  
                dateFormat: "Y-m-d",
                altInput: true,
                altFormat: "F j, Y",
                minDate: "today",  
                defaultDate: null  
            });
        });
    }); 

    /********* Main banner Slider *********/
      const swiper = new Swiper(".roomSwiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
        breakpoints: {
        575: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
        }
    });

    // *** video-play *** // 
    $('.play-video').on('click', function () {
    const video = $('#img-video')[0];
    const videoContainer = $('.video-content'); 
        if ($(this).attr('data-click') == '1') {
            $(this).attr('data-click', '0');
            video.pause();
            $(".play-video").css("opacity", "1");
            videoContainer.removeClass('no-overlay'); // restore overlay
        } else {
            $(this).attr('data-click', '1');
            video.play();
            $(".play-video").css("opacity", "0");
            videoContainer.addClass('no-overlay'); // remove overlay
        }
    }); 
  
    /********* Brand Slider *********/
    new Swiper(".brand-slider", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        // },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            }
        }
    });  
});

/********* Banner Aniiation *********/
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, 
    {
       threshold: 0.3
    }); 
    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
});

/** Food Menu - slider **/
var swiper = new Swiper(".food-menu-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    // autoplay: true,
    navigation: {
        prevEl: '.food-menu-arrow.swiper-button-prev',
        nextEl: '.food-menu-arrow.swiper-button-next',
    },
    speed: 800,
    breakpoints: {
        1200: {
            slidesPerView: 4,
        },
        992: {
            slidesPerView: 3,
        }, 
        510: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
});

/** Testimonials - slider **/
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.testimonial-swiper', {
        loop: true,
        // autoplay: true,
        grabCursor: true,
        spaceBetween: 30, 
        pagination: {
        el: '.swiper-pagination',
        clickable: true
        },
        breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20 
        }
        }
    });
});

/** home blog - slider **/
var swiper = new Swiper(".blog-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    // autoplay: true,
    navigation: {
        prevEl: '.blog-arrow.swiper-button-prev',
        nextEl: '.blog-arrow.swiper-button-next',
    },
    speed: 800,
    breakpoints: { 
        992: {
            slidesPerView: 3,
        }, 
        510: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
});

/** Insta - slider **/
var swiper = new Swiper(".insta-slider", {
    slidesPerView: 1, 
    loop: true,
    // autoplay: true,
    navigation: {
        prevEl: '.blog-arrow.swiper-button-prev',
        nextEl: '.blog-arrow.swiper-button-next',
    },
    speed: 800,
    breakpoints: {
        1200: {
            slidesPerView: 5,
        },  
        992: {
            slidesPerView: 4,
        }, 
        510: {
            slidesPerView: 3,
        },
        420: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
});
 
/** Counter Js **/ 
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    const speed = 200; // smaller = faster count 
    function animateCounters() {
        counters.forEach(counter => {
            function updateCount() {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            }
            updateCount();
        });
    } 
    // Trigger animation when section is in viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // stop observing after run
            }
        });
    }, { threshold: 0.3 });

    const section = document.querySelector(".hotel-counter-sec");
    if (section) {
        observer.observe(section);
    }
});

/** packages - slider **/
var swiper = new Swiper(".packages-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    // autoplay: true,
    navigation: {
        prevEl: '.packages-arrow.swiper-button-prev',
        nextEl: '.packages-arrow.swiper-button-next',
    },
    speed: 800,
     breakpoints: { 
        992: {
            slidesPerView: 3,
        }, 
        510: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
}); 

//*** Documentation Side Bar css  ***//
const toggleBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.doc-sidebar');
const overlay = document.querySelector('.sidebar-overlay'); 
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}); 
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}); 

//*** */ Documentation Side Bar Close button click ***// 
document.getElementById('close-doc-btn').addEventListener('click', function () {
    document.querySelector('.doc-sidebar').classList.remove('active');
    document.querySelector('.sidebar-overlay').style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
});





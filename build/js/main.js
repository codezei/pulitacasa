(function () {
  'use strict';

  function works () {
    Fancybox.bind(".gallery a", {
      groupAll: true,
      Thumbs: {
        autoStart: true
      },
      Toolbar: {
        display: [{
          id: "counter",
          position: "center"
        }, "zoom", "slideshow", "fullscreen", "download", "close"]
      },
      animated: true,
      dragToClose: true
    });
  }

  function header () {
    var header = document.querySelector('.header');
    var burger = document.querySelector('.js-burger');
    if (!header) return;
    burger.addEventListener('click', function (e) {
      document.documentElement.classList.toggle('open-menu');
      e.currentTarget.setAttribute('aria-expanded', !(e.currentTarget.getAttribute('aria-expanded') === 'true' ? true : false));
    });
    header.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        document.documentElement.classList.remove('open-menu');
        burger.setAttribute('aria-expanded', !(burger.getAttribute('aria-expanded') === 'true' ? true : false));
      }
    });
    var linkNav = document.querySelectorAll('[href^="#"]');
    var headerHeight = 0; // let headerHeight = header.getBoundingClientRect().height

    var V = 0.2;

    for (var i = 0; i < linkNav.length; i++) {
      linkNav[i].addEventListener('click', function (e) {
        e.preventDefault();
        var w = window.pageYOffset;
        var hash = this.href.replace(/[^#]*(.*)/, '$1');
        var tar = document.querySelector(hash);
        var t = tar.getBoundingClientRect().top - headerHeight;
        var start = null;
        requestAnimationFrame(step);

        function step(time) {
          if (start === null) {
            start = time;
          }

          var progress = time - start,
              r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);
          window.scrollTo(0, r);

          if (r != w + t) {
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
        }

        if (t > 1 || t < -1) {
          requestAnimationFrame(step);
        }
      }); // gsap.to(".logo span", {
      //     opacity: 0.3,
      //     duration: 0.1,
      //     repeat: 5,
      //     yoyo: true,
      //     ease: "power1.inOut",
      //     onComplete: function() {
      //         gsap.to(".logo span", { opacity: 1, duration: 0.5 });
      //     }
      // });
    }
  }

  function services () {
    var servicesSwiper = new Swiper(".services-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      // },
      breakpoints: {
        430: {
          slidesPerView: 1.25
        },
        576: {
          slidesPerView: 1.5
        },
        768: {
          slidesPerView: 2
        },
        992: {
          slidesPerView: 2.5
        },
        1200: {
          slidesPerView: 3
        }
      },
      navigation: {
        nextEl: ".services-button-next",
        prevEl: ".services-button-prev"
      }
    });
  }

  function reviews () {
    var reviewsSwiper = new Swiper(".reviews-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        // 430: {
        //   slidesPerView: 1.5,
        // },
        576: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
      },
      navigation: {
        nextEl: ".reviews-button-next",
        prevEl: ".reviews-button-prev"
      },
      on: {
        transitionEnd: function transitionEnd(swiper) {
          var reviewTextActive = swiper.el.querySelector('.swiper-slide:not(.swiper-slide-active) .review__text.active');

          if (reviewTextActive) {
            reviewTextActive.classList.remove('active');
          }

          var reviewToggleActive = swiper.el.querySelector('.swiper-slide:not(.swiper-slide-active) .review__toggle.active');

          if (reviewToggleActive) {
            reviewToggleActive.classList.remove('active');
          }
        }
      }
    });
    var reviewTogglers = document.querySelectorAll('.review__toggle');

    for (var i = 0; i < reviewTogglers.length; i++) {
      reviewTogglers[i].addEventListener('click', function (e) {
        e.currentTarget.previousElementSibling.classList.toggle('active');
        e.currentTarget.classList.toggle('active');
      });
    }
  }

  function process () {
    var furnitureSlider = new BeerSlider(document.getElementById("furniture-slider"));
    var mattressSlider = new BeerSlider(document.getElementById("mattress-slider"));
    var carpetSlider = new BeerSlider(document.getElementById("carpet-slider"));
    var armchairSlider = new BeerSlider(document.getElementById("armchair-slider"));
    var pillowSlider = new BeerSlider(document.getElementById("pillow-slider"));
  }

  function accordion () {
    var accordions = document.querySelectorAll('.accordion');

    var _loop = function _loop(a) {
      var items = accordions[a].querySelectorAll('.accordion-item');
      var activeItem = accordions[a].querySelector('.accordion-item.active');

      for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function (e) {
          var button = e.currentTarget.querySelector('.accordion-item__btn');

          if (e.currentTarget !== activeItem && !!activeItem) {
            activeItem.classList.remove('active');
            button.setAttribute('aria-expanded', false);
          }

          if (e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.remove('active');
            button.setAttribute('aria-expanded', false);
          } else {
            e.currentTarget.classList.add('active');
            button.setAttribute('aria-expanded', true);
            activeItem = e.currentTarget;
          }
        });
      }
    };

    for (var a = 0; a < accordions.length; a++) {
      _loop(a);
    }
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function categories () {
    var categoriesNavigation = _toConsumableArray(document.querySelectorAll(".categories-navigation-swiper"));

    var categoriesContent = _toConsumableArray(document.querySelectorAll(".categories-content-swiper"));

    categoriesNavigation.map(function (categoriesNavigationSwiper) {
      var swiper = new Swiper(categoriesNavigationSwiper, {
        spaceBetween: 8,
        slidesPerView: "auto",
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        initialSlide: initialCategory || 0,
        roundLengths: true,
        on: {
          click: function click(swiper) {
            var clickedIndex = swiper.clickedIndex;

            if (clickedIndex !== undefined) {
              swiper.slideTo(clickedIndex);
            }
          }
        }
      });
      return swiper;
    });
    categoriesContent.map(function (categoriesContentSwiper, categoriesContentSwiperIndex) {
      var buttonNextSelector = categoriesContentSwiper.dataset.nextSelector || ".swiper-button-next";
      var buttonPrevSelector = categoriesContentSwiper.dataset.prevSelector || ".swiper-button-prev";
      var swiper = new Swiper(categoriesContentSwiper, {
        spaceBetween: 8,
        allowTouchMove: categoriesContentSwiper.dataset.disallowTouch ? false : true,
        slideToClickedSlide: true,
        watchSlidesProgress: true,
        initialSlide: initialCategory || 0,
        navigation: {
          nextEl: buttonNextSelector,
          prevEl: buttonPrevSelector
        },
        thumbs: {
          swiper: categoriesNavigation[categoriesContentSwiperIndex].swiper,
          multipleActiveThumbs: false
        }
      });
      return swiper;
    });
    categoriesNavigation.forEach(function (categoriesNavigationSwiper, categoriesNavigationSwiperIndex) {
      categoriesNavigationSwiper.swiper.on("slideChange", function (swiper) {
        if (categoriesContent[categoriesNavigationSwiperIndex]) {
          categoriesContent[categoriesNavigationSwiperIndex].swiper.slideTo(swiper.activeIndex);
        }
      });
    });
    categoriesContent.forEach(function (categoriesContentSwiper, categoriesContentSwiperIndex) {
      categoriesContentSwiper.swiper.on("slideChange", function (swiper) {
        if (categoriesNavigation[categoriesContentSwiperIndex]) {
          categoriesNavigation[categoriesContentSwiperIndex].swiper.slideTo(swiper.activeIndex);
        }
      });
    });
  }

  function indicators () {
    var animationDuration = 2000;
    var allProgressIndicators = document.querySelectorAll(".progress");

    function animateNumber(element, finalValue, duration) {
      var startTimestamp = null;

      var step = function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        var progress = Math.min((timestamp - startTimestamp) / duration, 1);
        var currentValue = Math.floor(progress * finalValue);
        element.textContent = "".concat(currentValue);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }

    function runAnimation(container) {
      var svgElement = container.querySelector(".progress__bar");
      var circleFg = container.querySelector(".progress__bar-fg");
      var valueElement = container.querySelector(".progress__value-number");
      var targetProgress = parseInt(svgElement.dataset.progress, 10);
      var radius = 40;
      var circleLength = 2 * Math.PI * radius;

      if (!isNaN(targetProgress)) {
        circleFg.style.strokeDasharray = circleLength;
        circleFg.style.strokeDashoffset = circleLength;
        valueElement.textContent = "0";
        setTimeout(function () {
          var offset = circleLength - targetProgress / 100 * circleLength;
          circleFg.style.strokeDashoffset = offset;
          animateNumber(valueElement, targetProgress, animationDuration);
        }, 100); // Ваша затримка у 100 мс тут доречна
      }
    }

    var observerCallback = function observerCallback(entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runAnimation(entry.target);
          observer.unobserve(entry.target);
        }
      });
    };

    var observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    var observer = new IntersectionObserver(observerCallback, observerOptions);
    allProgressIndicators.forEach(function (container) {
      var circleFg = container.querySelector(".progress__bar-fg");
      var valueElement = container.querySelector(".progress__value-number");
      var radius = 40;
      var circleLength = 2 * Math.PI * radius;
      circleFg.style.strokeDasharray = circleLength;
      circleFg.style.strokeDashoffset = circleLength;
      valueElement.textContent = "0";
      observer.observe(container);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    header();
    services();
    reviews();
    works();
    process();
    accordion();
    categories();
    indicators();
    AOS.init({
      offset: 80,
      duration: 200,
      easing: 'ease-in',
      once: true
    });
  });

}());

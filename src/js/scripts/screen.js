import $ from 'jquery';
import './spincrement';

function startCounter(selector) {
  $(selector).spincrement({
    thousandSeparator: "",
    duration: 1488,
  });
}

class Iterator {
  constructor(array, index, min = 0) {
    this.array = array;
    this.index = index || 0;
    this.min = min;
    this.max = array.length - 1;
  }

  resolve(index) {
    if (index >= this.min && index <= this.max) {
      if (index > this.index) {
        ++this.index;
      } else {
        --this.index;
      }
      return this.array[index];
    }
    return this.array[this.index];
  }

  next() {
    var index = this.index;
    return this.resolve(++index);
  }
  
  prev() {
    var index = this.index;
    return this.resolve(--index);
  }

  curent() {
    return this.array[this.index];
  }

  nextIndex() {
    var index = this.index;
    return index++;
  }

  prevIndex() {
    var index = this.index;
    return index--;
  }

  curentIndex() {
    return this.index;
  }

  find(needle) {
    var result = this.array.indexOf(needle);

    if (result === -1) return false;

    return result;
  }

}

class FullPage {
  constructor() {
    this.sections = null;
    this.actions = null;
    this.wrapper = null;
    this.wrapperSelector = null;
    this.scrollable = true;
  }

  wrapperEl(wrapper) {
    this.wrapper = document.querySelector(wrapper);
    this.wrapperSelector = wrapper;
  }

  section(sections) {
    this.sections = new Iterator(sections);
  }

  action(actions) {
    this.actions = actions;
  }

  init() {
    this.bindOnWheel(this.wrapper,this.onWheel);
  }


  bindOnWheel(elem, onWheel) {
    console.log('binds')
    var self = this;

    if (elem.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        elem.addEventListener("wheel", function (e) {
          onWheel(e,self);
        });
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", function (e) {
          onWheel(e,self);
        });
      } else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", function (e) {
          onWheel(e,self);
        });
      }
    } else { // IE8-
      elem.attachEvent("onmousewheel",function (e) {
        onWheel(e,self);
      });
    }
  }
  onWheelTop() {
    var selector = this.sections.prev();
    
    if (this.defaultFadeOut !== undefined) {
      this.make(this.defaultFadeOut,selector);
    }
    var action = this.actions[selector];
    if (action !== undefined) {
      this.make(action.fadeIn,selector);
    }

    this.make(this.defaultHook,selector);
    
  }
  preventApply(selector) {
    
    if (this.defaultFadeOut !== undefined) {
      this.make(this.defaultFadeOut,selector);
    }
    var action = this.actions[selector];
    
    var newIndex = this.sections.find(selector);

    if (newIndex !== false) {
      this.sections.index = newIndex;
    }

    if (action !== undefined) {
      this.make(action.fadeIn,selector);
    }

    this.make(this.defaultHook,selector);
  }

  onWheelBottom() {
    var selector = this.sections.next();
    
    if (this.defaultFadeIn !== undefined) {
      this.make(this.defaultFadeIn,selector);
    }

    var action = this.actions[selector];
    
    if (action !== undefined) {
      this.make(action.fadeIn,selector);
    }

    this.make(this.defaultHook,selector);

  }

  make(action,selector,...args) {
    //this.defaultHook(selector,this, ...args);
    action(selector,this,...args);
  }

  onWheel(e,ctx) {
    e = e || window.event;

    if (!ctx.scrollable) {
      return false;
    }
    ctx.scrollable = false;

    setTimeout(() => {
      ctx.scrollable = true;
    }, 2000);
  
    // wheelDelta не дает возможность узнать количество пикселей
    var curentDelta = 0;

    var delta = e.deltaY || e.detail || e.wheelDelta;

    //if (delta < 0) break;
    
    if (delta > curentDelta) {
      ctx.onWheelBottom();
    } else {
      ctx.onWheelTop();

      // /console.log();
    }

    var info = document.getElementById('delta');
  
    //info.innerHTML = +info.innerHTML + delta;
  
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  }
  
}

// if ($(window).width() > 1100) {
  
// }
function hideTwoAnim() {
  $('.second-line').removeClass('line-animate-2');
  $('.first-line').removeClass('line-animate-2-1');
  $('.first-view_footer__lines').removeClass('line-pos-end');
  $('.first-view_footer__social-media').fadeIn();
  $('.first-view_footer__contacts').removeClass('fade-contact');
}


var fullPage = new FullPage();
    fullPage.wrapperEl('#fullpage');
    fullPage.section(['#first-view','#second-view','#third-view','#fourth-view','#fifth-view','#sixth-view','#seventh-view','#eight-view']);
    //fullPage.section(['#first-view','#second-view','#third-view','#fourth-view','#sixth-view','#eight-view']);
    fullPage.action({
        '#first-view':{
            fadeIn(selector) {
              //$('.first-view_footer__arrow').fadeIn();
              $('.second-line').removeClass('line-animate-1');
              $('.first-line').removeClass('line-animate-1-1')
            },
            fadeOut(selector) {
              
            }
        },
        '#second-view':{
            fadeIn(selector) {
             /// $('.first-view_footer__arrow').fadeOut();
              setTimeout(function() {
                startCounter('.lines-counter');
              },1000);
              $('.second-line').addClass('line-animate-1');
              $('.first-line').addClass('line-animate-1-1');
              $('.first-view_footer__lines').removeClass('center-controll-line');
            },
            fadeOut(selector) {
               //alert('fadeIN second');
            }
           
        },
        '#third-view':{
            fadeIn(selector) {
              $('#fifth-view').removeClass('no-hidden-section');
              $('.second-line').removeClass('line-animate-1');
              $('.first-line').removeClass('line-animate-1-1');
              $('.first-view_footer__lines').removeClass('animation-line-fourth-view');
              $('.first-view_footer__social-media').removeClass('hiden-left-contact');
              //$('.first-view_footer__lines').addClass('center-controll-line');
              hideTwoAnim();
              //$('#third-view').addClass('no-move');
            },
            fadeOut(selector) {
               //alert('fadeIN second');
            }
        },
        '#fourth-view':{
          fadeIn(selector) {
           // alert('showed');
            $('#fourth-view').removeClass('move-top');
            $('.first-view_footer__lines').addClass('animation-line-fourth-view');
            //$('.first-view_footer__social-media').fadeOut();
            $('.first-view_footer__contacts').addClass('fade-contact');
            $('.first-view_footer__social-media').addClass('hiden-left-contact');
               //$('#third-view').addClass('no-move');
            $('.first-view_footer__lines').removeClass('animation-line-fifth-view');
            $('.first-view_footer__lines').removeClass('center-controll-line');
            },
          fadeOut() {
            // /alert('remove class');
            //$('#third-view').removeClass('no-move');
          }
        },
        '#fifth-view': {
          fadeIn() {
            $('.first-view_footer__social-media').removeClass('hiden-left-contact');
            $('.first-view_footer__lines').addClass('animation-line-fifth-view');
            $('#fourth-view').addClass('move-top');
            $('#fifth-view').removeClass('move-hidden');
            $('#seventh-view').removeClass('seventh-view-no-move');
            $('#fifth-view').addClass('no-hidden-section');
            $('.first-view_footer__lines').removeClass('animation-line-fourth-view');
            $('.first-view_footer__lines').addClass('center-controll-line');
            hideTwoAnim(); 
          }
        },
        '#sixth-view': {
          fadeIn(selector) {
            $('.first-view_footer__lines').removeClass('animation-line-fifth-view');
            
            //$('.first-view_footer').removeClass('top-controller');
            //$('#fifth-view').addClass('move-hidden'); 
            //alert('open');
           // $('#eight-view').removeClass('active-section');
           //$('#eight-view').addClass('pre-render');
           $('#eight-view').removeClass('active-last-section');
           
           $('.first-view_footer').removeClass('top-controller');
          },
        },
        '#seventh-view': {
          fadeIn(selector) {
            $('#seventh-view').removeClass('move-top-section');
            $('#eight-view').addClass('active-last-section');
            $('.first-view_footer').removeClass('top-controller');
            $('#seventh-view').addClass('seventh-view-no-move')
          }
        },
        '#eight-view': {
          fadeIn(selector) {
           //$('#sixth-view').css({'z-index':55});
           //alert('active last section');
           $('#fifth-view').removeClass('no-hidden-section');
           $('#seventh-view').addClass('move-top-section');
           $('.first-view_footer').addClass('top-controller');
           //$('.first-view_footer').addClass('top-controller'); 
          }
        }
    });
    fullPage.init();

    fullPage.defaultHook = function(selector, instance) {
      // prepare-section active-section
      var curent = $(selector);
      //alert(instance.wrapperSelector);
      console.log($(instance.wrapperSelector).children().removeClass('prepare-section').removeClass('active-section'))
      curent.addClass('active-section').removeClass('prepare-section');
      curent.prev().addClass('prepare-section').removeClass('active-section');
      curent.next().addClass('prepare-section').removeClass('active-section');
    }
    $('#btn-trigger-nav').click(function() {
      $('#main-top-nav').toggleClass('active-nav');
    });

    $('.nav-link-anchor').click(function(e) {
      e.preventDefault();
      fullPage.preventApply($(this).attr('href'));
      $('#main-top-nav').removeClass('active-nav');
    });


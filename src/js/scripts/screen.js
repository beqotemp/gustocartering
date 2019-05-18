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

}

class FullPage {
  constructor() {
    this.sections = null;
    this.actions = null;
    this.wrapper = null;
    this.wrapperSelector = null;
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
      this.make(action.fadeOut,selector);
    }

    this.make(this.defaultHook,selector);
    
  }

  onWheelBottom() {
    var selector = this.sections.next();
    if (this.defaultFadeIn !== undefined) {
      this.make(this.defaultFadeOut,selector);
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


var fullPage = new FullPage();
    fullPage.wrapperEl('#fullpage');
    fullPage.section(['#first-view','#second-view','#third-view','#fourth-view','#sixth-view','#eight-view']);
    fullPage.action({
        '#first-view':{
            fadeIn(selector) {
                
            },
            fadeOut(selector) {
              
            }
        },
        '#second-view':{
            fadeIn(selector) {
              setTimeout(function() {
                startCounter('.lines-counter');
              },1000);
            },
            fadeOut(selector) {
               //alert('fadeIN second');
            }
        },
        '#third-view':{
            fadeIn(selector) {
              //$('#third-view').addClass('no-move');
            },
            fadeOut(selector) {
               //alert('fadeIN second');
            }
        },
        '#fourth-view':{
          fadeIn(selector) {
               //$('#third-view').addClass('no-move');
            },
          fadeOut() {
            // /alert('remove class');
            //$('#third-view').removeClass('no-move');
          }
        },
        '#sixth-view': {
          fadeIn(selector) {
            $('.first-view_footer').removeClass('top-controller'); 
            //alert('open');
           // $('#eight-view').removeClass('active-section');
           //$('#eight-view').addClass('pre-render');
          },
        },
        '#eight-view': {
          fadeIn(selector) {
           $('#sixth-view').css({'z-index':55});
           $('.first-view_footer').addClass('top-controller'); 
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



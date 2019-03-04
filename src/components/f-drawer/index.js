import { LitElement, html} from 'lit-element';
import template from './template.html.js';
import css from './style.pcss';

const fDrawer = class FDawer extends LitElement {

  static get properties () {
    return {
      lineHeight: { type: String, reflect: true },
      lineWidth: { type: String, reflect: true },
      triggerSize: { type: String, reflect: true },
      closeButton: { type: Boolean, reflect: true },
      navWidth: { type: String, reflect: true },
    };
  }

  constructor () {
    super();
    this.isOpen = false;
    this.drawerClosing = false;
    this.lineHeight = '1px';
    this.lineWidth = '80%';
    this.triggerSize = '30px';
    this.closeButton = false;
    this.navWidth = '80%';
    this.shadeOpacity = 0.4;
    this.trigger = null;
    this.nav = null;
    this.lightNav = null;
    this.shade = null;
    this.isTouchDevice = 'ontouchstart' in window;
    this.swipeStart = this.isTouchDevice ? 'touchstart' : 'mousedown';
    this.swipeMove = this.isTouchDevice ? 'touchmove'  : 'mousemove';
    this.swipeEnd = this.isTouchDevice ? 'touchend'   : 'mouseup';
    this.eventListeners = {};
    this.eventListeners['swipeStartFunc'] = e => this.onSwipeStart(e);
    this.eventListeners['swipeMoveFunc'] = e => this.onSwipeMove(e);
    this.eventListeners['swipeEndFunc'] = e => this.onSwipeEnd(e);
    this.eventListeners['scrollNavFunc'] = e => this.scrollNavEvent(e);
  }

  attributeChangedCallback (name, oldval, newval) {
    console.log('attribute change: ', name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  async firstUpdated () {
    await this.updateComplete;
    this.nav = this.shadowRoot.querySelector('.nav');
    this.lightNav = this.querySelector('nav');
    this.shade = this.shadowRoot.querySelector('.shade');
    this.shade.style.display = 'none';
    document.addEventListener(this.swipeStart, this.eventListeners['swipeStartFunc'], { passive: false });
  }

  updated (changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${ oldValue }`);
    });
  }

  connectedCallback () {
    super.connectedCallback();
    console.log('inserted f-drawer element in DOM');
  }

  disconnectedCallback () {
    super.connectedCallback();
    this.nav.removeEventListener('scroll', this.eventListeners['scrollNavFunc']);
  }

  render () {
    return html`
      <style>
        ${ css }
        .trigger {
          width: ${ this.triggerSize };
          height: ${ this.triggerSize };
        }
        .lines {
          width: ${ this.triggerSize };
          height: ${ this.triggerSize };
        }
        .lines span {
          width: ${ this.lineWidth };
          height: ${ this.lineHeight };
        }
        .lines span:nth-of-type(2) {
          top: calc(50% - ${ parseInt(this.lineHeight) }%);
        }
        .nav {
          width: ${ this.navWidth };
        }
      </style>
      ${ template(this) }
    `;
  }

  drawerToggle () {
    return new Promise(resolve => {
      this.trigger = this.shadowRoot.querySelector('.trigger');
      if (!this.isOpen) {
        if (!this.closeButton) {
          this.trigger.style.display = 'none';
          this.trigger.style.opacity = 0;
        }
        this.shade.style = '';
        this.setAttribute('open', '');
        this.setScrollBlockStyle();
      } else {
        if (!this.closeButton) {
          this.trigger.style.display = 'inline-block';
          setTimeout(() => {
            this.trigger.style.opacity = 1;
          }, 500);
        }
        this.removeAttribute('open');
        this.removeScrollBlockStyle();
        setTimeout(() => {
          this.shade.style.display = 'none';
        }, 500);
      }
      this.isOpen = this.isOpen ? false : true;
      document.removeEventListener(this.swipeMove, this.eventListeners['swipeMoveFunc'], { passive: false });
      document.removeEventListener(this.swipeEnd, this.eventListeners['swipeEndFunc']);
      resolve();
    });
  }

  onSwipeStart (e) {
    if (this.isTouchDevice) {
      if (e.touches.length > 1 || e.scale && e.scale !== 1) {
        return;
      }
    }
    const offset = {
      x: this.isTouchDevice ? e.touches[0].pageX : e.pageX
    };
    if (!this.isOpen && offset.x > 30) {
      return
    }
    this.startPoint = {
      x: offset.x
    };
    // this.touchNavEvent(e);
    document.addEventListener(this.swipeMove, this.eventListeners['swipeMoveFunc'], { passive: false });
    document.addEventListener(this.swipeEnd, this.eventListeners['swipeEndFunc']);
  }

  onSwipeMove (e) {
    this.drawerClosing = true;
    const offset = {
      x: this.isTouchDevice ? e.touches[0].pageX : e.pageX
    };
    this.moveDistance = {
      x: offset.x - this.startPoint.x
    };
    this.touchNavEvent(e);
    if (this.isOpen && this.moveDistance.x < 0) {
      if (e.cancelable) {
        e.preventDefault();
      }
      this.nav.style.transition = 'none';
      this.nav.style.transform = `translate3d(${ this.moveDistance.x }px, 0, 0)`;
      this.shade.style.transition = 'none';
      this.shade.style.opacity = this.shadeOpacity + this.moveDistance.x / 700;
    }
  }

  onSwipeEnd () {
    if (!this.drawerClosing) {
      return
    }
    if (this.isOpen && this.moveDistance.x > 0) {
      return
    }
    if (Math.abs(this.moveDistance.x) > 50) {
      this.drawerToggle();
    }
    this.drawerMoving = false;
    this.isSwipe = false
    this.nav.style = '';
    this.shade.style = '';
    this.moveDistance = {};
  }

  touchNavEvent (e) {
    if (!this.isOpen) {
      return
    }
    if (e.target === this.lightNav) {
      const navHeight = this.lightNav.getBoundingClientRect();
      if (navHeight.height < window.innerHeight) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
      e.stopPropagation();
      this.nav.addEventListener('scroll', this.eventListeners['scrollNavFunc']);
    } else {
      if (e.cancelable) {
        e.preventDefault();
      }
    }
  }

  scrollNavEvent () {
    const navHeight = this.nav.getBoundingClientRect();
    if (this.nav.scrollTop === 0) {
      this.nav.scrollTop = 1;
    } else if (this.nav.scrollTop + navHeight.height === this.nav.scrollHeight) {
      this.nav.scrollTop = this.nav.scrollTop - 1;
    }
  }

  setScrollBlockStyle () {
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('body').style.overflow = 'hidden';
  }

  removeScrollBlockStyle () {
    document.querySelector('html').style.overflow = 'visible';
    document.querySelector('body').style.overflow = 'visible';
  }

}

export default fDrawer;

customElements.define('f-drawer', fDrawer);

import { LitElement, html} from 'lit-element';
import template from './template.html.js';
import css from './style.pcss';

const fDrawer = class FDawer extends LitElement {

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
    this.name = 'YUKI';
  }

  attributeChangedCallback(name, oldval, newval) {
    console.log('attribute change: ', name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  async firstUpdated () {
    await this.updateComplete;
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
  }

  render() {
    return html`
      <style>
        ${css}
      </style>
      ${template(this)}
    `;
  }
}

export default fDrawer;

customElements.define('f-drawer', fDrawer);

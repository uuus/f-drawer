
import { html } from 'lit-element';

export default self => html`
    <div class="shade" @click="${self.drawerToggle}"></div>
    <div class="trigger" @click="${self.drawerToggle}">
      <div class="lines">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="nav">
      <slot></slot>
    </div>
  `;

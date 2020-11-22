import { LightningElement, api, track } from 'lwc';

import {caseRegister} from 'c/lwcSwitch';


export default class LwcCase extends LightningElement {
    @api value;
    @api default;

    @track isVisible = false;
    @track guid = Symbol();

    connectedCallback(){
        caseRegister[this.guid] = this;
        const itemregister = new CustomEvent('privateitemregister', {
            bubbles: true,
            detail: {
                value : this.value,
                default : this.default,
                guid: this.guid,
             }
        });
        this.dispatchEvent(itemregister);
    }

}
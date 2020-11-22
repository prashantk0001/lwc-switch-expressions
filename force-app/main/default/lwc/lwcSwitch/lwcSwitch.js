import { LightningElement, track, api } from 'lwc';

const caseRegister = {};

const evaluate = (scope, expression, value) => {
    let func = `
        return (function(scope,value){
            const binder = function () {
                ;
                return {
                    expression : ${expression},
                    value : ${value},
                };
            }
            let result = binder.apply(scope);
            return (result.expression === result.value ? true : false);
        })(scope,value);
    `;
    return Function(["scope","value"],func)(scope,value);
}

export {caseRegister};

export default class LwcChoice extends LightningElement {
    @track cases = [];

    @api expression;

    @api
    get scope() {
        return this.parsedScope;
    }
    set scope(value) {
        if (value) {
            this.parsedScope = JSON.parse(JSON.stringify(value));
            this.execute(this.parsedScope);
        }
    }


    handleChildRegister(event) {
        event.stopPropagation();
        const item = event.detail;
        this.cases.push(item);
    }

    connectedCallback(){
        this.execute(this.parsedScope);
    }

    renderedCallback(){
        this.execute(this.parsedScope);
    }

    reducerForOR = (accumulator, currentValue) => accumulator || currentValue;

    execute(scope){
        let decisions = [];
        let defaultCase;
        this.cases.forEach((caseitem)=>{
            let decision;
            if(!caseitem.default){
                decision = evaluate(scope, this.expression, caseitem.value);
                caseRegister[caseitem.guid].isVisible = decision;
            }else{
                defaultCase = caseRegister[caseitem.guid];
            }
            decisions.push(decision);
        });
        if(decisions.length && defaultCase){
            let hideDefault = decisions.reduce(this.reducerForOR);
            if(!hideDefault){
                defaultCase.isVisible = true;
            }else{
                defaultCase.isVisible = false;
            }
        }
    }

    
}
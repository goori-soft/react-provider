const events = require('events');

class Model extends events.EventEmitter{
    state = {};
    attached = [];

    constructor(state){
        super();
        if(typeof(state) == 'object'){
            this.state = {...state};
        }
    }

    // changes the instance state
    setState = (state)=>{
        let hasChange = false;
        
        if(typeof(state) == 'object'){
            for(let i in state){
                if(this.state[i] !== state[i]) hasChange = true;
            }
        }

        if (hasChange){
            this.state = {...state};
            this.emit('stateChange', this.state);
        }
    }

    // returns the attached react component
    getAttached = (reactComponent)=>{
        
        let attParams = this.attached.find( attParams => {
            return attParams.component === reactComponent;
        });

        return attParams;
    }

    // detach a react component
    detach = (reactComponent)=>{
        let attParams = this.getAttached(reactComponent);
        if(attParams){
            this.removeListener('stateChange', attParams.listener);
            this.attached = this.attached.filter( item => {
                return item !== attParams;
            });
        }
    }

    attach = (reactComponent) => {
        if(reactComponent && typeof(reactComponent.forceUpdate) == 'function' && !this.getAttached(reactComponent)){

            // creates a attParams to attach
            const attParams = {
                component: reactComponent,
                isMounted: true,
                listener: ()=>{
                    if (attParams.isMounted) reactComponent.forceUpdate();
                }
            }

            const provider = this;

            provider.on('stateChange', attParams.listener);

            const reactComponentWillUnmount = reactComponent.componentWillUnmount;
            reactComponent.componentWillUnmount = function(){
                provider.detach(reactComponent);
                attParams.isMounted = false;
                if(typeof(reactComponentWillUnmount) == 'function') reactComponentWillUnmount.call(reactComponent);
            }

            this.attached.push(attParams);
        }
    }
}

module.exports = Model;
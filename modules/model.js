const events = require('events');

function Model(state = {}){
    this.state = {...state};
    this.attached = [];
    const eventEmitter = new events.EventEmitter();

    this.attach = function(reactComponent){
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

            eventEmitter.on('stateChange', attParams.listener);

            const reactComponentWillUnmount = reactComponent.componentWillUnmount;
            reactComponent.componentWillUnmount = function(){
                provider.detach(reactComponent);
                attParams.isMounted = false;
                if(typeof(reactComponentWillUnmount) == 'function') reactComponentWillUnmount.call(reactComponent);
            }

            this.attached.push(attParams);
        }
    }

    // detach a react component
    this.detach = function(reactComponent){
        let attParams = this.getAttached(reactComponent);
        if(attParams){
            eventEmitter.removeListener('stateChange', attParams.listener);
            this.attached = this.attached.filter( item => {
                return item !== attParams;
            });
        }
    }

    // returns the attached react component
    this.getAttached = function(reactComponent){
        
        let attParams = this.attached.find( attParams => {
            return attParams.component === reactComponent;
        });

        return attParams;
    }

    this.on = function(eventName, callback){
        if (typeof(callback) == 'function') eventEmitter.on(eventName, callback);
    }

    this.removeListener = function(eventName, callback){
        eventEmitter.removeListener(eventName, callback);
    }

    this.setState = function(state = {}){
        let hasChange = false;
        
        if(typeof(state) === 'object'){
            for(let i in state){
                if(this.state[i] !== state[i]) hasChange = true;
            }
        }

        if (hasChange){
            this.state = {...state};
            eventEmitter.emit('stateChange', this.state);
        }
    }

    
    return this;
}

module.exports = Model;
/**
 * ProviderController
 */
const Model = require('./modules/model');

class ProviderController{
    providers = {};

    // cria um novo provider
    create(name, state = {}){
        if(this.providers[name]) return this.providers[name];
        this.providers[name] = new Model(state);
        return this.providers[name];
    }

    // captura um provider baseado em seu nome
    get(name){
        if(this.providers[name]) return this.providers[name];
        return null;
    }
}

if(typeof(window) == 'undefined'){
    var window = null;
}

if (window && !window.providerController){
    window.providerController = new ProviderController();
}

ProviderController.Model = Model;
ProviderController.Controller = window ? window.providerController : new ProviderController();
ProviderController.Provider = window ? window.providerController.providers : ProviderController.Controller.providers;
ProviderController.createProvider = (name, state = {})=>{
    return ProviderController.Controller.create(name, state);
}

module.exports = ProviderController;
/**
 * ProviderController
 */
const Model = require('./modules/model');

function Store(){
    this.providers = {};

    // cria um novo provider
    this.create = function(name, state = {}){
        if(this.providers[name]) return this.providers[name];
        this.providers[name] = new Model(state);
        return this.providers[name];
    }

    // captura um provider baseado em seu nome
    this.get = function(name){
        if(this.providers[name]) return this.providers[name];
        return null;
    }
}

if(typeof(window) == 'undefined'){
    var window = null;
}

if (window && !window.providerController){
    window.providerController = new Store();
}

Store.Model = Model;
Store.Controller = window ? window.providerController : new Store();
Store.Provider = window ? window.providerController.providers : Store.Controller.providers;
Store.createProvider = function(name, state = {}){
    return Store.Controller.create(name, state);
}

module.exports = Store;
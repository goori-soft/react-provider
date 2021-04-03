/**
 * store
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

    this.createProvider = this.create;

    // captura um provider baseado em seu nome
    this.get = function(name){
        if(this.providers[name]) return this.providers[name];
        return null;
    }
}

if(typeof(window) == 'undefined'){
    var window = null;
}

if (window && !window.gooriStore){
    window.gooriStore = new Store();
}

Store.Model = Model;
Store.Store = window ? window.gooriStore : new Store();
Store.Provider = window ? window.gooriStore.providers : Store.Store.providers;
Store.createProvider = function(name, state = {}){
    return Store.Controller.create(name, state);
}

module.exports = Store;
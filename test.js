const {Store} = require('./index.js');

const user = Store.createProvider('user', {});

user.setState({age: 1});

console.log(user.state.age);

const me = Store.createProvider('user', {age: 36});
console.log(me.state.age);
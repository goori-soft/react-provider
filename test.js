const Provider = require('./index.js');

const user = Provider.createProvider('user', {});

user.setState({age: 1});

console.log(user.state.age);

const me = Provider.createProvider('user', {age: 36});
console.log(me.state.age);
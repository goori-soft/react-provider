# Goori React Provider
Simple state provider for react

# Install
```bash
$ npm install @goori-soft/react-provider
```

# How to user it?

In a `user.js` example:
```javascript
import Provider from '@goori-soft/react-provider'

const user = Provider.createProvider('user', {logedIn: false});
user.login = ()=>{
    user.setState({logedIn: !user.state.logedIn});
}

export default user;
```

In a `component.js` example:
```javascript
import React from 'react'
import user from 'user.js'

class MyComp extends React.Component{
    constructor(props){
        super(props);
        user.attach(this);
    }

    render(){
        return(
            <div>{user.state.logedIn ? 'Hi John' : 'Login' }</div>
            <button onClick={()=>{ user.login() }}>Login</button>
        )
    }
}
```
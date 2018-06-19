import { Button } from 'antd';
import * as React from 'react';
import './App.scss';
import CvCreator from './CvCreator'
// import {Field} from './fields/Field'

interface IAppState {
  user?: object 
}
class App extends React.Component<object, IAppState> {
  private static AUTHENTICATE_URL = 'http://localhost:5000/login/linkedin';

  constructor(props: any) {
    super(props)
    
    const url = window.location.href;
    if( url.includes('no-login') ) {
      this.state = {
        user: {}
      };
      return;
    } 

    this.state = {};

    fetch('/user', {credentials: 'include'})
    .then(r => {
      if( r.ok ) {
        return r.json()
      }
      else {
        throw Error()
      }
    })
    .then(user => {
      this.setState({user})
    })
    .catch(e => e);
  }

  public render() {
    if( this.state.user ) {
      return (<CvCreator user={this.state.user}/>)
    } else {
      return <Button type="primary" href={App.AUTHENTICATE_URL}>Login with LinkedIn</Button>
    }
  }
}

export default App;

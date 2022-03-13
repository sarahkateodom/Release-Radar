import React, { Component } from 'react';
import OAuth2Login from 'react-simple-oauth2-login';
import Artists from './Artists';
import {
  authorizationUrl,
  clientId,
  redirectUri,
} from './settings-implicit';
import LocalStorageUtility from '../utilities/LocalStorageUtility';
const ls = new LocalStorageUtility();

export default class Spotify extends Component {
  constructor(props) {
    super(props);
    this.state = {
        accessToken: '',
        authDataIsLoaded: false,
    };
  }

  onSuccess = ({ access_token: token }) => {
    this.setState({
      accessToken: token,
      authDataIsLoaded: true,
    });

    ls.set('accessToken', token);
  }

  onFailure = (response) => {
    ls.removeItem('accessToken');
    console.error(response)
  }

  renderImplicitGrant() {
    return (
      <div className="column">
        <OAuth2Login
          authorizationUrl={authorizationUrl}
          clientId={clientId}
          redirectUri={redirectUri}
          scope="user-follow-read"
          responseType="token"
          buttonText="Implicit grant login"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
      </div> 
    );
  }

  componentDidMount() {
    var storedAccessToken = ls.get('accessToken');
    if (storedAccessToken) {
      this.setState({
        accessToken: storedAccessToken,
        authDataIsLoaded: true,
      })
    }
  }

  render() {
    if (this.state.accessToken && this.state.authDataIsLoaded) {
      return <Artists accessToken={this.state.accessToken}></Artists>
    } else {
      return this.renderImplicitGrant();
    }
  }
}
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

  getAccessToken() {
    var storedAccessToken = ls.get('accessToken');
    if (storedAccessToken) {
      this.setState({
        accessToken: storedAccessToken,
        authDataIsLoaded: true,
      })
    }
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


// export default function ImplicitGrant() {
//   const [accessToken, setAccessToken] = useState(null);
//   const [error, setError] = useState(null);
//   const onSuccess = ({ access_token: token }) => setAccessToken(token);
//   const onFailure = response => console.error(response);
//   return (
//     <div className="column">
//       {
//         error && <ErrorAlert error={error} />
//       }
//       <OAuth2Login
//         authorizationUrl={authorizationUrl}
//         clientId={clientId}
//         redirectUri={redirectUri}
//         scope="user-follow-read"
//         responseType="token"
//         buttonText="Implicit grant login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//       />
//       {        
//         accessToken && <Artists accessToken={accessToken}></Artists>
//       }
   
    

//     </div>

//   );
// }
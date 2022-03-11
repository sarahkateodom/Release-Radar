import React, { useState } from 'react';
import OAuth2Login from 'react-simple-oauth2-login';
import Artists from './Artists';
import ErrorAlert from './ErrorAlert';
import {
  authorizationUrl,
  clientId,
  redirectUri,
} from './settings-implicit';

export default function ImplicitGrant() {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const onSuccess = ({ access_token: token }) => setAccessToken(token);
  const onFailure = response => console.error(response);
  return (
    <div className="column">
      {
        error && <ErrorAlert error={error} />
      }
      <OAuth2Login
        authorizationUrl={authorizationUrl}
        clientId={clientId}
        redirectUri={redirectUri}
        scope="user-follow-read"
        responseType="token"
        buttonText="Implicit grant login"
        onSuccess={onSuccess}
        onFailure={setError}
      />
      {        
        accessToken && <Artists accessToken={accessToken}></Artists>
      }
   
    

    </div>

  );
}
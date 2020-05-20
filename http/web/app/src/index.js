// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {Auth0Provider} from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";
import {Provider} from "react-redux";
import {createStore} from "redux";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

const reducer = function (logged = true, action) {
  switch (action.type) {
    case "SET_LOGGED":
      return true;
    case "LOGGED_OUT":
      return false;
    default:
      return logged;
  }
};
let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <App/>
        </Auth0Provider>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
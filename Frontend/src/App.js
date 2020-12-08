import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import {
//   ApolloClient,
//   gql,
//   NormalizedCacheObject
// } from '@apollo/client';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import allYelpReducers from './reducer/index'

const store = createStore(allYelpReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});

//  render Main component to App component
function App() {
  return (
    // Use Browser Router to route to different pages

    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>

          <div className="App">
            {/* App Component Has a Child Component called Main */}
            <Main />
          </div>
      </Provider>
      </ApolloProvider>
    </BrowserRouter>
  );

}

// Export the App component so that it can be used in index.js

export default App;

import { Suspense } from 'react';
import './App.css';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
  useRelayEnvironment,
} from 'react-relay';

import graphql from 'babel-plugin-relay/macro';
import RelayEnvironment from './RelayEnvironment';

const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
    }
  }
`;

function App(props) {
  const data = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery);

  return (
    <div className="App">
      <header className="APP">
        <p>Repository: {data.repository.name}</p>
      </header>
    </div>
  );
}

function AppContainer(props) {
  const env = useRelayEnvironment();
  const preloadedQuery = loadQuery(env, RepositoryNameQuery, {
    owner: 'facebook',
    name: 'relay',
  });

  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', marginTop: '16px' }}>loading</div>
      }
    >
      <App preloadedQuery={preloadedQuery} />
    </Suspense>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AppContainer />
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;

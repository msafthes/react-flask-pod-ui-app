import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';

import './App.css';
import { Connection } from './models/Models';
import { AppState } from './store';
import { imagesDataTest, containersDataTest, volumesDataTest } from './testData/testData';

import Layout from './components/Layout/Layout';
import Intro from './pages/Intro/Intro';


declare global {
  interface Window {
    token: String;
  }
}


const Images = React.lazy(() => {
  return import('./pages/Images/Images');
});

const Containers = React.lazy(() => {
  return import('./pages/Containers/Containers');
});

const ContainerLogs = React.lazy(() => {
  return import('./pages/ContainerLogs/ContainerLogs');
});

const Volumes = React.lazy(() => {
  return import('./pages/Volumes/Volumes');
});

interface IAppProps {
  activeConnection: Connection,
  isAuthenticated: boolean
}

const App = (props: IAppProps) => {
  const { activeConnection } = props
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 1000);

  console.log("APP, activeConnection:");
  console.log(activeConnection);
  console.log(activeConnection.username);
  console.log(activeConnection.username.length);

  const handleWindowResize = () => {
    setIsDesktop(window.innerWidth >= 1000);
  };

  useEffect(() => {
    // Did Mount
    window.addEventListener(
      'resize',
      throttle(() => {
        handleWindowResize();
      }, 200)
    );
  }, []);

  useEffect(() => {
    // Will Unmount
    return () => {
      window.removeEventListener(
        'resize',
        throttle(() => {
          handleWindowResize();
        }, 200)
      );
    }
  }, []);

  const routes = activeConnection.username.length > 0 ? (
    <Switch>
      <Route path="/" exact component={Intro} />
      <Route path="/images/" exact render={() => <Images imagesDataTest={imagesDataTest} />} />
      <Route path="/containers/" exact render={() => <Containers containersDataTest={containersDataTest} />} />
      <Route path="/container_logs/:id" render={() => <ContainerLogs />} />
      <Route path="/volumes/" render={() => <Volumes volumesDataTest={volumesDataTest} />} />
      <Redirect to="/" />
    </Switch>
  )
    :
    <Switch>
      <Route path="/" exact component={Intro} />
      <Redirect to="/" />
    </Switch>
    ;

  return (
    <div>
      <Layout isDesktop={isDesktop}>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: true,
    activeConnection: state.connections.activeConnection
  };
};

export default withRouter(
  connect(
    mapStateToProps,
  )(App)
);

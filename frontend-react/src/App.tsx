import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';

import './App.css';
import { AppState } from './store';
import { imagesDataTest, containersDataTest, volumesDataTest } from './testData/testData';

import Layout from './components/Layout/Layout';
import Intro from './pages/Intro/Intro';


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
  isAuthenticated: boolean
}

const App = (props: IAppProps) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 1000);

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

  const routes = (
    <Switch>
      <Route path="/" exact component={Intro} />
      <Route path="/images/" exact render={() => <Images imagesDataTest={imagesDataTest} />} />
      <Route path="/containers/" exact render={() => <Containers containersDataTest={containersDataTest} />} />
      <Route path="/container_logs/:id" render={() => <ContainerLogs />} />
      <Route path="/volumes/" render={() => <Volumes volumesDataTest={volumesDataTest} />} />
      <Redirect to="/" />
    </Switch>
  );

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
    isAuthenticated: true
  };
};

export default withRouter(
  connect(
    mapStateToProps,
  )(App)
);

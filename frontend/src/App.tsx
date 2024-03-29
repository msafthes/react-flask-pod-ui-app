import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import throttle from 'lodash.throttle';

import './App.css';
import { imagesDataTest, containersDataTest, volumesDataTest } from './testData/testData';

import Layout from './components/Layout/Layout';
import Intro from './pages/Intro/Intro';


declare global {
  interface Window {
    token: String;
  }
}


// These components (pages) are loaded only when first requested by the user, else it never loads
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


const App = () => {
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

  // Setting up the Routing functionality, if no valid URL is accessed, it redirects to the home (Intro) page
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

export default withRouter(App);

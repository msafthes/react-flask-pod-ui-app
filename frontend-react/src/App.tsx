import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';

import './App.css';
import { AppState } from './store';

import Layout from './components/Layout/Layout';
import Intro from './pages/Intro/Intro';


const Images = React.lazy(() => {
  return import('./pages/Images/Images');
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

  const imagesDataTest = [
    {
      "key": 0,
      "created": "6 weeks ago",
      "id": "6678c7c2e56c",
      "repository": "docker.io/library/nginx",
      "size": "131 MB",
      "tag": "1.17.10-alpine-perl"
    },
    {
      "key": 1,
      "created": "3 months ago",
      "id": "e7d92cdc71fe",
      "repository": "docker.io/library/alpine",
      "size": "5.86 MB",
      "tag": "latest"
    }
  ];

  let routes = (
    <Switch>
      <Route path="/" exact component={Intro} />
      <Route path="/images/" render={() => <Images imagesData={imagesDataTest} />} />
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

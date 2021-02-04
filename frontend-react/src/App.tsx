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

  const containersDataTest = [
    {
      key: 0,                                               // 0
      containerId: "5ae4a214e530",                          // "5ae4a214e530"
      image: "registry.fedoraproject.org/f29/httpd:latest", // "registry.fedoraproject.org/f29/httpd:latest"
      command: "/usr/bin/run-http...",                      // "/usr/bin/run-http..."
      created: "4 minutes ago",                             // "4 minutes ago"
      ports: "0.0.0.0:8080->8080/tcp",                      // "0.0.0.0:8080->8080/tcp"
      names: "cool_kalam"                                   // "cool_kalam"
    },
    {
      key: 1,                                               // 0
      containerId: "1235ae4a214e530123",                    // "5ae4a214e530"
      image: "second.fedoraproject.org/second",             // "registry.fedoraproject.org/f29/httpd:latest"
      command: "test/test/usr/bin/run-http...",             // "/usr/bin/run-http..."
      created: "21 minutes ago",                            // "4 minutes ago"
      ports: "1.1.1.1:8080->8080/tcp",                      // "0.0.0.0:8080->8080/tcp"
      names: "test_name"                                    // "cool_kalam"
    },
  ];

  const volumesDataTest = [
    {
      Anonymous: false,
      CreatedAt: "2020-12-14T11:56:14.6300363+01:00",
      Driver: "local",
      GID: 0,
      Labels: {},
      Mountpoint: "/home/thesis/.local/share/containers/storage/volumes/my-vol-1/_data",
      Name: "my-vol-1",
      Options: {},
      Scope: "local",
      UID: 0
    },
    {
      Anonymous: false,
      CreatedAt: "2020-12-14T11:56:20.1633446+01:00",
      Driver: "local",
      GID: 0,
      Labels: {},
      Mountpoint: "/home/thesis/.local/share/containers/storage/volumes/my-vol-2/_data",
      Name: "my-vol-2",
      Options: {},
      Scope: "local",
      UID: 0
    },
  ];

  let routes = (
    <Switch>
      <Route path="/" exact component={Intro} />
      <Route path="/images/" exact render={() => <Images imagesDataTest={imagesDataTest} />} />
      <Route path="/containers/" exact render={() => <Containers containersDataTest={containersDataTest} />} />
      <Route path="/containers/:id" render={() => <ContainerLogs />} />
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

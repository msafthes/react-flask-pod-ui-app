import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import throttle from 'lodash.throttle';

import './App.css';

import Layout from './components/Layout/Layout';
import Intro from './pages/Intro/Intro';
import Images from './pages/Images/Images';


class App extends Component {
  state = {
    isDesktop: window.innerWidth >= 1000,
  };

  handleWindowResize = () => {
    this.setState({ isDesktop: window.innerWidth >= 1000 });
  };

  componentDidMount() {
    window.addEventListener(
      'resize',
      throttle(() => {
        this.handleWindowResize();
      }, 200)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      throttle(() => {
        this.handleWindowResize();
      }, 200)
    );
  }

  render() {
    const { isDesktop } = this.state;

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

    // console.log("imagesDataTest:");
    // console.log(imagesDataTest);

    return (
      <BrowserRouter>
        <div>
          <Layout isDesktop={isDesktop}>
            <Switch>
              <Route path="/images/" render={() => <Images imagesData={imagesDataTest} />} />
              <Route path="/" exact component={Intro} />
              <Redirect to="/" />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

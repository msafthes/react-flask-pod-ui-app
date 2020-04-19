import React, { Component } from 'react';
import css from './Layout.module.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

type MyProps = { isDesktop: boolean };
type MyState = { showSideDrawer: boolean };
// class App extends React.Component<MyProps, MyState> {
//     ...
// }

// class Layout extends Component {
class Layout extends React.Component<MyProps, MyState> {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        const { isDesktop } = this.props;

        return (
            <React.Fragment>
                <Toolbar
                    isDesktop={isDesktop}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                {!isDesktop && (
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                    />
                )}

                <main className={css.Layout}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

export default Layout;

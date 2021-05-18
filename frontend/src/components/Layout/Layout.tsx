import React, { useState } from 'react';
import css from './Layout.module.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


type LayoutProps = {
    isDesktop: boolean,
    children: React.ReactNode,
};

const Layout = (props: LayoutProps) => {
    const [showSideDrawer, setShowSideDrawer] = useState<boolean>(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <React.Fragment>
            <Toolbar
                isDesktop={props.isDesktop}
                drawerToggleClicked={sideDrawerToggleHandler}
            />

            {!props.isDesktop && (
                <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler}
                />
            )}

            <main className={css.Layout}>{props.children}</main>
        </React.Fragment>
    );
}

export default Layout;

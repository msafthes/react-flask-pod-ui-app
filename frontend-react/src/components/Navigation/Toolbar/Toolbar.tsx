import React from 'react';
import { NavLink } from 'react-router-dom';

import css from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
    <header className={css.Toolbar}>
        {!props.isDesktop && (
            <React.Fragment>
                <DrawerToggle clicked={props.drawerToggleClicked} />
                <div className={css.Name}>
                    <NavLink
                        to="/"
                        className={css.Link}
                    >
                        Podman UI
                    </NavLink>
                </div>
            </React.Fragment>
        )}
        {props.isDesktop && (
            <nav>
                <NavigationItems isDesktop />
            </nav>
        )}
    </header>
);

export default toolbar;

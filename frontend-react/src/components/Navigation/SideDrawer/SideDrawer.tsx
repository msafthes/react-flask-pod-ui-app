import React from 'react';

import css from './SideDrawer.module.css';

import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
    let attachedClasses = [css.SideDrawer, css.Close];
    if (props.open) {
        attachedClasses = [css.SideDrawer, css.Open];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <nav>
                    <NavigationItems isDesktop={false} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;

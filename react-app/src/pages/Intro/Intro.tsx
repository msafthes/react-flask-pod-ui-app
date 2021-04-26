import React from 'react';
import { NavLink } from 'react-router-dom';

import css from './Intro.module.css';
import { useViewport } from '../../Viewport';


const Intro = () => {
    const { width, phone, tabletPortrait, tabletLandscape, desktop } = useViewport();

    return (
        <div className={css.Intro}>
            <div className={css.Content}>
                <h1>Welcome to Podman Web UI Demo!</h1>
                <h2>No active connection found.</h2>
                <h3>Please add a Remote Podman connection by clicking the "CONNECTIONS" button in the navigation.</h3>
                <h3>After that, click ACTIVATE button for one of the connections that you have added and you can then use all the pages in the navigation.</h3>
            </div>
        </div>
    );
};

export default Intro;

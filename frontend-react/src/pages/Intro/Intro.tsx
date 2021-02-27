import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Intro.module.css';

import { useViewport } from '../../Viewport';


const Intro = () => {
    const { width, phone, tabletPortrait, tabletLandscape, desktop } = useViewport();
    console.log(`width=${width}, phone=${phone}, tabletPortrait=${tabletPortrait}, tabletLandscape=${tabletLandscape}, desktop=${desktop}`);

    return (
        <div className={css.Intro}>
            <div className={css.Content}>
                <h1>Welcome to Podman Web UI Demo!</h1>
                <h2>Navigate to images/containers/volumes pages</h2>
                <NavLink to="/containers" className={css.Link}>
                    Try containers!
                </NavLink>
            </div>
        </div>
    );
};

export default Intro;

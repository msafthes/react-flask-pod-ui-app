import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Intro.module.css';

const Intro = () => {
    return (
        <div className={css.Intro}>
            <div className={css.Content}>
                <h1>Welcome to Podman Web UI Demo!</h1>
                <h2>Navigate to images/containers/volumes pages</h2>
                <NavLink to="/images" className={css.Link}>
                    Try images!
                </NavLink>
            </div>
        </div>
    );
};

export default Intro;

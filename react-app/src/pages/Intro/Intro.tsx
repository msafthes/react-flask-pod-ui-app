import React from 'react';
import css from './Intro.module.css';


const Intro = () => {
    return (
        <div className={css.Intro}>
            <div className={css.Content}>
                <h1>Welcome to Podman Web UI!</h1>
                <h3>The default Podman connection is "Local" meaning it uses a Podman that runs on the application's server.</h3>
                <h3>Please add a Remote Podman connection by clicking the "CONNECTIONS" button in the navigation to use any Remote Podman.</h3>
            </div>
        </div>
    );
};

export default Intro;

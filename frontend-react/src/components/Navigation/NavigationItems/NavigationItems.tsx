import React from 'react';
import { NavLink } from 'react-router-dom';

import css from './NavigationItems.module.css';

const NavigationItems = props => (
    <ul className={css.List}>
        {props.isDesktop && (
            <li className={css.Name}>
                <NavLink
                    to="/"
                    className={css.Link}
                    activeClassName={css.active}
                >
                    Podman UI
                </NavLink>
            </li>
        )}
        <li className={css.Item}>
            <NavLink
                to="/"
                exact
                className={css.Link}
                activeClassName={css.active}
            >
                Home
            </NavLink>
        </li>
        <li className={css.Item}>
            <NavLink
                to="/images"
                className={css.Link}
                activeClassName={css.active}
            >
                Images
            </NavLink>
        </li>
        <li className={css.Item}>
            <NavLink
                to="/containers"
                className={css.Link}
                activeClassName={css.active}
            >
                Containers
            </NavLink>
        </li>
    </ul>
);

export default NavigationItems;

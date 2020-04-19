import React from 'react';
import css from './Link.module.css';

const Link = props => {
    const classes = [css.Link];
    props.solo && classes.push(css.Solo);
    props.right && classes.push(css.Right);

    return (
        <a
            className={classes.join(' ')}
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.children}
        </a>
    );
};

export default Link;

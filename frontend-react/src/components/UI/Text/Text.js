import React from 'react';
import css from './Text.module.css';

const Text = props => {
    const classes = [css.Text];
    props.center && classes.push(css.Center);
    props.marginBottom && classes.push(css.marginBottom);

    return <p className={classes.join(' ')}>{props.children}</p>;
};

export default Text;

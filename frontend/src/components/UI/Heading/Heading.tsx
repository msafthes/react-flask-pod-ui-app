import React from 'react';
import css from './Heading.module.css';

const Heading = props => {
    const classes = [css.Heading];
    props.smallMargin && classes.push(css.SmallMargin);
    props.smallFont && classes.push(css.SmallFont);

    return <h2 className={classes.join(' ')}>{props.children}</h2>;
};

export default Heading;

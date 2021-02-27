import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const MenuVolumes = props => {
    const { volumeName, volumeOperation } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const name = {};
    name[volumeName] = true;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button variant="outlined" color="secondary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Actions
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => volumeOperation(name, "remove")}>Remove</MenuItem>
                <MenuItem onClick={handleClose}>Close</MenuItem>
            </Menu>
        </div>
    )
}

export default MenuVolumes;

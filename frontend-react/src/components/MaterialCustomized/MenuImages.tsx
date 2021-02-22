import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const MenuImages = props => {
    const { imageId, removeImage } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const id = {};

    if (imageId) {
        id[imageId] = true;
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log("ID:");
    console.log(id);
    console.log("imageId:");
    console.log(imageId);

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
                <MenuItem onClick={() => removeImage(id)}>Remove</MenuItem>
                <MenuItem onClick={handleClose}>Close</MenuItem>
            </Menu>
        </div>
    )
}

export default MenuImages;

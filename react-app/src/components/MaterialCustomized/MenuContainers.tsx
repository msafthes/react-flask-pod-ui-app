import React, { useState } from 'react';

import PageviewIcon from '@material-ui/icons/Pageview';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom';


const MenuContainers = props => {
    const { containerId, containerOperation } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const id = {};
    id[containerId] = true;

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
                <Link to={`/container_logs/${containerId}`} style={{ textDecoration: 'none', marginLeft: '2.5%' }}>
                    <Button
                        startIcon={<PageviewIcon />}
                        onClick={() => console.log(`clicked ID: ${containerId}`)}>
                        Show Logs
                    </Button>
                </Link>
                <MenuItem onClick={() => containerOperation(id, "remove")}>Remove</MenuItem>
                <MenuItem onClick={() => containerOperation(id, "stop")}>Stop</MenuItem>
                <MenuItem onClick={() => containerOperation(id, "kill")}>Kill</MenuItem>
                <MenuItem onClick={handleClose}>Close</MenuItem>
            </Menu>
        </div>
    )
}

export default MenuContainers;

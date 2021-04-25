import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import copy from "clipboard-copy";

import css from './MenuStyles.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';

import { Connection } from '../../models/Models';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@material-ui/icons/Delete';
import CastConnectedIcon from '@material-ui/icons/CastConnected';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Alert, AlertTitle } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import {
    withStyles,
    Theme,
} from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';


interface IMenuConnectionsProps {
    connections: Connection[],
    activeConnection: Connection,
    key: string,
    fetchKey: any,
    addConnection: any,
    removeConnection: any,
    loading: boolean,
    errorConnections: string,
}

const MenuConnections = (props: IMenuConnectionsProps) => {
    const { key, fetchKey, connections, activeConnection, addConnection, removeConnection, loading, errorConnections } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [showError, setShowError] = useState<boolean>(false);
    const [showBackendError, setShowBackendError] = useState<boolean>(false);
    const [errorInfo, setErrorInfo] = useState<string>("");

    const [openConnectionModal, setOpenConnectionModal] = useState(false);
    const [newConnection, setNewConnection] = useState<Connection>({ username: '', ip: '', podmanSocketPath: '' });

    useEffect(() => {
        setShowBackendError(errorConnections.length > 0);
    }, [errorConnections]);

    const handleConnectionOpen = () => {
        setOpenConnectionModal(true);
    };

    const handleConnectionClose = () => {
        setOpenConnectionModal(false);
    };

    const onChangeNewUsername = (e) => {
        setNewConnection({ ...newConnection, username: e.target.value });
    };

    const onChangeNewIp = (e) => {
        setNewConnection({ ...newConnection, ip: e.target.value });
    };

    const onChangeNewPath = (e) => {
        setNewConnection({ ...newConnection, podmanSocketPath: e.target.value });
    };

    const handleAddConnection = () => {
        setOpenConnectionModal(false);
        if (!newConnection.username || !newConnection.ip || !newConnection.podmanSocketPath ||
            connections.some(connection => connection.username === newConnection.username && connection.ip === newConnection.ip)) {
            return;
        }
        addConnection(newConnection);
        setNewConnection({ username: '', ip: '', podmanSocketPath: '' });
    };

    const handleRemoveConnection = (removedConnection: Connection) => {
        removeConnection(removedConnection);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const test: Connection = {
        username: "usernameTest2",
        ip: "123.456.789",
        podmanSocketPath: "/run/user/1001/podman/podman.sock",
    }
    const test2: Connection = {
        username: "usernameTest222222",
        ip: "987.654.321",
        podmanSocketPath: "/run/user/2222/podman/podman.sock",
    }

    const testKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDWVxhhQ8l4D8mWLt61ajuTPUlKCCLyS5bO4iQRMOmYaEd3LoLDQEUxepUqbdrEgQBj1NR+mdAsSq8BmCrmB8Kgi3+Spbd1lci5ZljKYiwhC7BYytQeQAty+yEP+FB05aYy4SgIE9kEDygDhCHTNNLx1oLmCVNVOerGuAB3ovEyeaSFEJHK44/foLVTr9uOYyUoBKJKsDjiIqP4bH9CiVKe0HBsaibzcKnPlNkfYf5xnhUBcGQ7TWm7PQ2d1rw/tsnggk3W+8SF1IH190xi98uus2oo4+5aJZbe0RejJh8UTeXUS+pnaPsZrUo0RX09Mj9PNaPHzrzVuqFsTrr1l0SzQy1404wSYtXtPe00gg0TeMeVu98fXZya7rP479UNJZ+VBPM0nftnBt/0ozAXhGj2drn4ZYjzFwLkHlAPPE5gt5ruJEwxzJ80ZofTLjgfKWcubaynTvB+gmlgropgErvuZmvbmXLZY6YoCKUwh2O4m0J8/fUooQalbi5XisKQHQ0= msafpc@martinpc-virtual-machine";

    if (connections.length === 0) {
        connections.push(test);
        connections.push(test2);
        activeConnection.username = test.username;
        activeConnection.ip = test.ip;
        activeConnection.podmanSocketPath = test.podmanSocketPath;
    }

    // console.log("connections:");
    // console.log(connections);
    // console.log("newConnection:");
    // console.log(newConnection);
    // console.log("activeConnection:");
    // console.log(activeConnection);

    const ActiveLabel = withStyles((theme: Theme) => ({
        root: {
            color: theme.palette.getContrastText(purple[500]),
            backgroundColor: purple[500],
            '&:hover': {
                backgroundColor: purple[700],
            },
        },
    }))(Button);

    let connectionItems = null;

    if (connections && connections.length > 0) {
        connectionItems = <Grid container direction="column">
            {
                (connections.map((connection: Connection, i) => {
                    return <React.Fragment key={connection.ip}>
                        <Grid container>
                            <Grid item className={css.Connection}>{connection.username}@{connection.ip}</Grid>
                            <Grid container className={css.ConnectionActions}>
                                {activeConnection.username === connection.username && activeConnection.ip === connection.ip ?
                                    <Button className={css.ConnectionAction} variant="contained" color="secondary" aria-controls="simple-menu" aria-haspopup="true"
                                        onClick={handleAddConnection}>
                                        Activate
                                </Button>
                                    :
                                    <ActiveLabel variant="contained" color="primary" className={css.Active}>
                                        Active
                                    </ActiveLabel>
                                }
                                <Button className={css.ConnectionAction} variant="contained" color="secondary" aria-controls="simple-menu" aria-haspopup="true"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleRemoveConnection(connection)}>
                                    Remove
                            </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                }))
            }
        </Grid>
    }

    return (
        <div>
            <Button color="secondary" aria-controls="simple-menu" aria-haspopup="true"
                startIcon={<CastConnectedIcon />}
                onClick={handleClick}>
                Connections
            </Button>

            {showError &&
                <Alert severity="error" onClose={() => { setShowError(!showError) }}>
                    <AlertTitle><strong>Error</strong></AlertTitle>
                        The following containers are running and cannot be removed:
                        {(errorInfo.length > 0) ?
                        (errorInfo.split(' ').map((id, i) => {
                            return <Typography key={id} variant="body1" component="div" align="left">
                                <strong>container: {id}</strong><strong></strong>
                            </Typography>
                        }))
                        :
                        ''
                    }
                </Alert>
            }

            {showBackendError &&
                <Alert severity="error" onClose={() => { setShowBackendError(!showBackendError) }}>
                    <AlertTitle><strong>Backend Error</strong></AlertTitle>
                    {errorConnections.length > 0 &&
                        <p className={css.Error}>{errorConnections}</p>
                    }
                </Alert>
            }

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* <MenuItem onClick={addConnection}>Add Connection</MenuItem> */}
                <Button className={css.ConnectionAdd} variant="contained" color="primary" onClick={handleConnectionOpen}>
                    Add Connection
                        </Button>
                <Dialog open={openConnectionModal} onClose={handleConnectionClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Connection</DialogTitle>
                    <DialogContent>
                        <Grid>
                            Please add this ssh key to the authorized_keys file in your .ssh folder:
                        </Grid>
                        {testKey.length > 0 ?
                            <Button
                                className={css.Key}
                                variant="contained"
                                color="primary"
                                onClick={() => copy(testKey)}
                            >
                                Copy Key
                    </Button>
                            :
                            <LoadingIndicator />
                        }

                        <Grid>
                            <br></br>Enter the following details:
                        </Grid>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Username"
                            type="text"
                            fullWidth
                            onChange={onChangeNewUsername}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="IP Address"
                            type="text"
                            fullWidth
                            onChange={onChangeNewIp}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Path to Podman Socket (example: /run/user/1001/podman/podman.sock)"
                            type="text"
                            fullWidth
                            onChange={onChangeNewPath}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAddConnection} color="primary">
                            Finish
                            </Button>
                    </DialogActions>
                </Dialog>
                {connectionItems}
                <Button className={css.Close} variant="contained" onClick={handleClose}>Close</Button>
                {/* <MenuItem onClick={handleClose}>Close</MenuItem> */}
            </Menu>
        </div>
    )
}


const mapStateToProps = (state: AppState) => {
    return {
        connections: state.connections.connections,
        activeConnection: state.connections.activeConnection,
        key: state.connections.key,
        loading: state.volumes.loading,
        errorConnections: state.connections.error,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchKey: () =>
            dispatch(actions.fetchKey()),
        addConnection: (connection: Connection) =>
            dispatch(actions.addConnection(connection)),
        removeConnection: (connection: Connection) =>
            dispatch(actions.removeConnection(connection)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuConnections);

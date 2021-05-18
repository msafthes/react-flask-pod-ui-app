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
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert, AlertTitle } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';


interface IMenuConnectionsProps {
    connections: Connection[],
    activeConnection: Connection,
    sshKey: string,
    fetchKey: any,
    addConnection: any,
    removeConnection: any,
    activateConnection: any,
    loading: boolean,
    errorConnections: string,
}

const MenuConnections = (props: IMenuConnectionsProps) => {
    const { sshKey, fetchKey, connections, activeConnection, activateConnection, addConnection, removeConnection, loading, errorConnections } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [showError, setShowError] = useState<boolean>(false);
    const [showBackendError, setShowBackendError] = useState<boolean>(false);
    const [errorInfo, setErrorInfo] = useState<string>("");

    const [openConnectionModal, setOpenConnectionModal] = useState(false);
    const [newConnection, setNewConnection] = useState<Connection>({ username: '', ip: '', podmanSocketPath: '' });

    useEffect(() => {
        fetchKey();
    }, [fetchKey]);

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
            connections.some(connection => connection.username === newConnection.username)) {
            handleClose();
            setErrorInfo("Invalid details, please try again.");
            setShowError(true);
            return;
        }
        addConnection(newConnection);
        setNewConnection({ username: '', ip: '', podmanSocketPath: '' });
    };

    const handleRemoveConnection = (removedConnection: Connection) => {
        removeConnection(removedConnection);
    };

    const handleActivateConnection: any = (activatedConnection: Connection) => {
        activateConnection(activatedConnection);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let connectionItems = null;

    if (connections && connections.length > 0) {
        connectionItems = <Grid container direction="column">
            {
                (connections.map((connection: Connection, i) => {
                    return <React.Fragment key={connection.ip}>
                        {< MenuItem
                            onClick={activeConnection.username !== connection.username ?
                                () => handleActivateConnection(connection)
                                :
                                () => { }}
                            selected={activeConnection.username === connection.username}>
                            {connection.username}{connection.username !== "Local" && "@"}{connection.ip}
                            {connection.username !== "Local" && <DeleteIcon onClick={() => handleRemoveConnection(connection)} color="secondary" className={css.RemoveConnection} />}
                        </MenuItem>}
                    </React.Fragment>
                }))
            }
        </Grid >
    }

    return (
        <div>
            <Button variant="text" color="primary" aria-controls="simple-menu" aria-haspopup="true" className={css.ButtonConnections}
                startIcon={<CastConnectedIcon />}
                onClick={handleClick}>
                Connections
            </Button>

            {
                showError &&
                <Alert severity="error" onClose={() => { setShowError(!showError) }}>
                    <AlertTitle><strong>Error</strong></AlertTitle>
                    {(errorInfo.length > 0) ?
                        errorInfo
                        :
                        ''
                    }
                </Alert>
            }

            {
                showBackendError &&
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
                <MenuItem onClick={handleConnectionOpen}><AddIcon color="primary" fontSize="large" className={css.ConnectionAdd} />Add Connection</MenuItem>
                <Dialog open={openConnectionModal} onClose={handleConnectionClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New Connection</DialogTitle>
                    <DialogContent>
                        <Grid>
                            Make sure you have a Podman Socket Service running on your machine.
                            You can verify that the socket is listening with Podman command:<br></br> <b>podman --remote info</b>
                        </Grid>
                        <Grid><br></br>
                            Please add this ssh key to the authorized_keys file in your .ssh folder:
                        </Grid>
                        {sshKey ?
                            <Button
                                className={css.Key}
                                variant="contained"
                                color="primary"
                                onClick={() => copy(sshKey)}
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
            </Menu>
        </div >
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        connections: state.connections.connections,
        activeConnection: state.connections.activeConnection,
        sshKey: state.connections.sshKey,
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
        activateConnection: (connection: Connection) =>
            dispatch(actions.activateConnection(connection)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuConnections);

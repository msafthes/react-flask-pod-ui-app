import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Containers.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import MenuContainers from '../../components/MaterialCustomized/MenuContainers';

import { Container } from '../../models/Models';
import { isAllTrue, handleSelectAll, isSelectedAny, extractSelected } from '../../helpers/helpers';
import { useViewport } from '../../Viewport';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Typography } from '@material-ui/core';


interface IContainersProps {
    containers: Container[],
    errorContainers: string,
    loading: boolean,
    fetchContainers: Function,
    removeContainers: Function,
    stopContainers: Function,
    killContainers: Function,
    containerRun: Function,

    containersDataTest: Container[]
}

const Containers = (props: IContainersProps) => {
    const { fetchContainers, removeContainers, stopContainers, killContainers, containerRun, containers, errorContainers, loading } = props;
    const { width, phone, tabletPortrait, tabletLandscape, desktop } = useViewport();

    const defaultSelectedContainers = {};

    for (const [key, value] of Object.entries(containers)) {
        defaultSelectedContainers[value.containerId] = false
    }

    const [selectedContainers, setSelectedContainers] = useState<any>({ ...defaultSelectedContainers });
    const [openRunModal, setOpenRunModal] = useState(false);
    const [runCommand, setRunCommand] = useState("");
    const [showError, setShowError] = useState<boolean>(false);
    const [showBackendError, setShowBackendError] = useState<boolean>(false);
    const [errorInfo, setErrorInfo] = useState<string>("");

    const allTrue = isAllTrue(selectedContainers);

    useEffect(() => {
        fetchContainers();
    }, [fetchContainers]);

    useEffect(() => {
        const newSelected = {};
        for (const [key, value] of Object.entries(containers)) {
            newSelected[value.containerId] = false
        }
        setSelectedContainers({ ...newSelected });
    }, [containers]);

    useEffect(() => {
        setShowBackendError(errorContainers.length > 0);
    }, [errorContainers]);

    const handleRunOpen = () => {
        setOpenRunModal(true);
    };

    const handleRunClose = () => {
        setOpenRunModal(false);
    };

    const onChangeRun = (e) => {
        setRunCommand(e.target.value);
    };

    const handleContainerRun = () => {
        setOpenRunModal(false);
        if (runCommand.length == 0) {
            return;
        }
        containerRun(runCommand);
        setRunCommand('');
    };

    const handleCheckboxChange = changeEvent => {
        const { id } = changeEvent.target;
        const old = { ...selectedContainers };

        for (const [key, value] of Object.entries(old)) {
            if (id === key) {
                old[key] = !old[key];
            }
        }

        setSelectedContainers(old);
    };

    const handleRemoveContainers = (selectedContainers, containerIds) => {
        let runningContainersIds = [];
        containers.forEach((container) => {
            if ((selectedContainers[container.containerId] === true) && (container.status.startsWith('Up '))) {
                runningContainersIds.push(container.containerId);
            }
        });

        if (runningContainersIds.length > 0) {
            setShowError(true);
            runningContainersIds = [...new Set(runningContainersIds)];
            setErrorInfo(runningContainersIds.join(" "));
        } else {
            removeContainers(containerIds);
        }
    };

    // Function to handle various container operations, ready to be used for "all" containers as well
    const handleContainerOperation = (selectedContainers, mode: string) => {
        const containerIds = extractSelected(selectedContainers);

        switch (mode.toLowerCase()) {
            case "remove":
                handleRemoveContainers(selectedContainers, containerIds);
                break;
            case "stop":
                stopContainers(containerIds);
                break;
            case "kill":
                killContainers(containerIds);
                break;
            default: console.log("Unknown operation!");
        }

        const updated = { ...selectedContainers };

        for (const [key, value] of Object.entries(updated)) {
            if (value === true) {
                updated[key] = false
            }
        }

        setSelectedContainers(updated);
    };

    const selectAll = () => {
        const updated = handleSelectAll(selectedContainers);
        setSelectedContainers(updated);
    };

    const isSelected = isSelectedAny(selectedContainers);

    const containersTitleClasses = [css.Content, css.Heading];
    const useStyles = makeStyles({
        buttonGroup: {
            alignSelf: "flex-start"
        }
    });
    const classes = useStyles();

    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (containers) {
        content = <Grid container direction="column">
            {(containers && containers.length) ?
                (containers.map((container, i) => {
                    return <React.Fragment key={container.containerId}>

                        <Accordion>

                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                            >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox
                                        color="primary"
                                        onChange={handleCheckboxChange}
                                        id={container.containerId}
                                        checked={selectedContainers[container.containerId] || false} />}
                                    label=""
                                />
                                <Grid item container className={css.Content}>
                                    <Tooltip title={container.containerId}>
                                        <Grid className={css.ContainerId}>{container.containerId}</Grid>
                                    </Tooltip>
                                    {(desktop || tabletLandscape) &&
                                        <Tooltip title={container.status}>
                                            <Grid className={css.Status}>{container.status}</Grid>
                                        </Tooltip>
                                    }
                                    {!phone &&
                                        <Tooltip title={container.image}>
                                            <Grid className={css.Image}>{container.image}</Grid>
                                        </Tooltip>
                                    }
                                    {desktop &&
                                        <Tooltip title={container.ports}>
                                            <Grid className={css.Ports}>{container.ports}</Grid>
                                        </Tooltip>
                                    }

                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<MenuContainers
                                            containerId={container.containerId}
                                            containerOperation={handleContainerOperation}
                                        />}
                                        label=""
                                    />
                                </Grid>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Grid container direction="column">
                                    <Grid container direction="row">
                                        <Grid className={css.DetailTitle}>Names:</Grid>
                                        <Grid className={css.Names}>{container.names}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid className={css.DetailTitle}>Created:</Grid>
                                        <Grid className={css.Created}>{container.created}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid className={css.DetailTitle}>Command:</Grid>
                                        <Grid className={css.Command}>{container.command}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid className={css.DetailTitle}>Ports:</Grid>
                                        <Grid className={css.Ports}>{container.ports}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid className={css.DetailTitle}>Image:</Grid>
                                        <Grid className={css.Image}>{container.image}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid className={css.DetailTitle}>Status:</Grid>
                                        <Grid className={css.Status}>{container.status}</Grid>
                                    </Grid>
                                </Grid>

                            </AccordionDetails>

                        </Accordion>

                    </React.Fragment>

                }))
                :
                ''
            }
        </Grid>
    }

    return (
        <div className={css.Containers}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Podman Containers</h1>
                <p>Showing information about Containers and offering various operations with them</p>
                <Grid container className={css.Buttons}>
                    <Grid item className={css.Button}>
                        <Button
                            disabled={!isSelected}
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleContainerOperation(selectedContainers, "remove")}>
                            Remove Selected
                        </Button>
                    </Grid>
                    <Grid item className={css.Button}>
                        <Button variant="outlined" color="primary" onClick={handleRunOpen}>
                            Run
                        </Button>
                        <Dialog open={openRunModal} onClose={handleRunClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Run</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the command for "podman run"
                            </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Podman Run"
                                    type="text"
                                    fullWidth
                                    onChange={onChangeRun}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleContainerRun} color="primary">
                                    Run
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>

                    {loading && <LoadingIndicator />}

                </Grid>

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
                        {errorContainers.length > 0 &&
                            <p className={css.Error}>{errorContainers}</p>
                        }
                    </Alert>
                }

                <div className={css.Info}>
                    <div className={containersTitleClasses.join(' ')}>
                        <Checkbox
                            color="primary"
                            onChange={selectAll}
                            checked={allTrue || false} />
                        <div className={css.ContainerId}>ID</div>
                        {(desktop || tabletLandscape) &&
                            <div className={css.Status}>Status</div>
                        }
                        {!phone &&
                            <div className={css.Image}>Image</div>
                        }
                        {desktop &&
                            <div className={css.Ports}>Ports</div>
                        }
                    </div>
                    {content}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        containers: state.containers.containers,
        loading: state.containers.loading,
        errorContainers: state.containers.error,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchContainers: () =>
            dispatch(actions.fetchContainers()),
        removeContainers: (selectedContainers) =>
            dispatch(actions.removeContainers(selectedContainers)),
        stopContainers: (selectedContainers) =>
            dispatch(actions.stopContainers(selectedContainers)),
        killContainers: (selectedContainers) =>
            dispatch(actions.killContainers(selectedContainers)),
        containerRun: (command) =>
            dispatch(actions.containerRun(command))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Containers);

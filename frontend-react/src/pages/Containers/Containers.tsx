import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Containers.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Container } from '../../models/Models';

import { isAllTrue, handleSelectAll, isSelectedAny } from '../../helpers/helpers';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
// import PageviewIcon from '@material-ui/icons/Pageview';
import { makeStyles } from '@material-ui/core/styles';

// import { Link } from 'react-router-dom';

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
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import { withStyles } from '@material-ui/core/styles';
// import Menu, { MenuProps } from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';

// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

import MenuContainers from '../../components/MaterialCustomized/MenuContainers';
import Tooltip from '@material-ui/core/Tooltip';


interface IContainersProps {
    containers: Container[],
    loading: boolean,
    fetchContainers: Function,
    removeContainers: Function,
    containerRun: Function,

    containersDataTest: Container[]
}

const Containers = (props: IContainersProps) => {
    const { fetchContainers, removeContainers, containerRun, containers } = props;
    const defaultSelectedContainers = {};

    for (const [key, value] of Object.entries(containers)) {
        defaultSelectedContainers[value.containerId] = false
    }

    const [selectedContainers, setSelectedContainers] = useState<any>({ ...defaultSelectedContainers });
    const [openRunModal, setOpenRunModal] = React.useState(false);
    const [runCommand, setRunCommand] = React.useState("");

    const allTrue = isAllTrue(selectedContainers);
    // console.log(`OUTSIDE functions allTrue: ${allTrue}`);

    useEffect(() => {
        fetchContainers();
    }, [fetchContainers]);

    // console.log(selectedContainers);

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
            console.log("empty run command");
            return;
        }
        setRunCommand('');
        containerRun(runCommand);
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
        // console.log(selectedContainers);
    };

    const handleRemoveContainers = selectedContainers => {
        console.log("triggered handleRemoveContainers(), selectedContainers:");
        // console.log(selectedContainers);
        const containerIds = [];
        for (const [key, value] of Object.entries(selectedContainers)) {
            if (value === true) {
                containerIds.push(key);
            }
        }
        // console.log("containerIds:");
        // console.log(containerIds);
        // console.log("DE-selecting containers:");
        const updated = { ...selectedContainers };

        for (const [key, value] of Object.entries(updated)) {
            if (value === true) {
                updated[key] = false
            }
        }
        setSelectedContainers(updated);
        // console.log(selectedContainers);

        console.log("TEMPORARILY DISABLED actual removing! containerIds:");
        console.log(containerIds);
        // removeContainers(containerIds);
    };

    const selectAll = () => {
        const updated = handleSelectAll(selectedContainers);
        setSelectedContainers(updated);
        // console.log(selectedContainers);
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

    if (!props.loading) {
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
                                        onClick={handleCheckboxChange}
                                        id={container.containerId}
                                        checked={selectedContainers[container.containerId]} />}
                                    // label="Select"
                                    label=""
                                />
                                <Grid item container className={css.Content}>
                                    <Tooltip title={container.containerId}>
                                        <Grid className={css.ContainerId}>{container.containerId}</Grid>
                                    </Tooltip>
                                    <Tooltip title={container.status}>
                                        <Grid className={css.Status}>{container.status}</Grid>
                                    </Tooltip>
                                    <Tooltip title={container.image}>
                                        <Grid className={css.Image}>{container.image}</Grid>
                                    </Tooltip>
                                    <Tooltip title={container.command}>
                                        <Grid className={css.Command}>{container.command}</Grid>
                                    </Tooltip>
                                    <Tooltip title={container.ports}>
                                        <Grid className={css.Ports}>{container.ports}</Grid>
                                    </Tooltip>
                                    <Tooltip title={container.created}>
                                        <Grid className={css.Created}>{container.created}</Grid>
                                    </Tooltip>

                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<MenuContainers
                                            containerId={container.containerId}
                                            removeContainer={handleRemoveContainers}
                                        />}
                                        // label="Select"
                                        label=""
                                    />
                                </Grid>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Grid className={css.DetailTitle}>Names:</Grid>
                                <Grid className={css.Names}>{container.names}</Grid>
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
                <Grid container className={css.Content}>
                    <Grid item className={css.Buttons}>
                        <Button
                            disabled={!isSelected}
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleRemoveContainers(selectedContainers)}>
                            Remove Selected
                        </Button>
                    </Grid>
                    <Grid item className={css.Buttons}>
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
                </Grid>

                {/* <div>
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
                </div> */}

                <div className={css.Info}>
                    <div className={containersTitleClasses.join(' ')}>
                        <Checkbox color="primary" onClick={selectAll} checked={allTrue} />
                        <div className={css.ContainerId}>Container ID</div>
                        <div className={css.Status}>Status</div>
                        <div className={css.Image}>Image</div>
                        <div className={css.Command}>Command</div>
                        <div className={css.Ports}>Ports</div>
                        <div className={css.Created}>Created</div>
                        {/* <div className={css.Names}>Names</div> */}
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
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchContainers: () =>
            dispatch(actions.fetchContainers()),
        removeContainers: (selectedContainers) =>
            dispatch(actions.removeContainers(selectedContainers)),
        containerRun: (command, containers) =>
            dispatch(actions.containerRun(command))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Containers);

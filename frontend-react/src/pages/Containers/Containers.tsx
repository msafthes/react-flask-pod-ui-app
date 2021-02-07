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
import PageviewIcon from '@material-ui/icons/Pageview';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

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
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withStyles } from '@material-ui/core/styles';
// import Menu, { MenuProps } from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import IsolatedMenu from '../../components/MaterialCustomized/IsolatedMenu';


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
    console.log(`OUTSIDE functions allTrue: ${allTrue}`);

    useEffect(() => {
        fetchContainers();
    }, [fetchContainers]);

    console.log(selectedContainers);

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
        console.log(selectedContainers);
    };

    const handleSelectedContainersOperation = selectedContainers => {
        console.log("triggered handleSelectedContainersOperation(), selectedContainers:");
        console.log(selectedContainers);
        const containerIds = [];
        for (const [key, value] of Object.entries(selectedContainers)) {
            if (value === true) {
                containerIds.push(key);
            }
        }
        console.log("containerIds:");
        console.log(containerIds);
        console.log("DE-selecting containers:");
        const updated = { ...selectedContainers };

        for (const [key, value] of Object.entries(updated)) {
            if (value === true) {
                updated[key] = false
            }
        }
        setSelectedContainers(updated);
        console.log(selectedContainers);

        // removeContainers(containerIds);
    };

    const selectAll = () => {
        const updated = handleSelectAll(selectedContainers);
        setSelectedContainers(updated);
        console.log(selectedContainers);
    };

    const isSelected = isSelectedAny(selectedContainers);

    const containersTitleClasses = [css.Content, css.Heading];
    const useStyles = makeStyles({
        buttonGroup: {
            alignSelf: "flex-start"
        }
    });
    const classes = useStyles();




    // const StyledMenu = withStyles({
    //     paper: {
    //         border: '1px solid #d3d4d5',
    //     },
    // })((props: MenuProps) => (
    //     <Menu
    //         elevation={0}
    //         getContentAnchorEl={null}
    //         anchorOrigin={{
    //             vertical: 'bottom',
    //             horizontal: 'center',
    //         }}
    //         transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'center',
    //         }}
    //         {...props}
    //     />
    // ));

    // const StyledMenuItem = withStyles((theme) => ({
    //     root: {
    //         '&:focus': {
    //             backgroundColor: theme.palette.primary.main,
    //             '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
    //                 color: theme.palette.common.white,
    //             },
    //         },
    //     },
    // }))(MenuItem);

    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };






    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (!props.loading) {
        content = <Grid container direction="column">
            {(containers && containers.length) ?
                (containers.map((container, i) => {
                    return <React.Fragment key={container.containerId}>
                        <IsolatedMenu
                            containerId={container.containerId}
                            removeContainer={handleSelectedContainersOperation}
                        />
                        <Grid item container className={css.Content}>
                            <Checkbox color="primary" onClick={handleCheckboxChange} id={container.containerId} checked={selectedContainers[container.containerId]} />
                            <Grid className={css.ContainerId}>{container.containerId}</Grid>
                            <Grid className={css.Image}>{container.image}</Grid>
                            <Grid className={css.Command}>{container.command}</Grid>
                            <Grid className={css.Created}>{container.created}</Grid>
                            <Grid className={css.Ports}>{container.ports}</Grid>
                            <Grid className={css.Names}>{container.names}</Grid>
                            <Grid className={css.Status}>{container.status}</Grid>
                        </Grid>
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
                <ButtonGroup className={classes.buttonGroup}>
                    <Button
                        disabled={!isSelected}
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleSelectedContainersOperation(selectedContainers)}>
                        Remove Selected
                    </Button>
                </ButtonGroup>

                <div>
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
                </div>

                <div className={css.Info}>
                    <div className={containersTitleClasses.join(' ')}>
                        <Checkbox color="primary" onClick={selectAll} checked={allTrue} />
                        <div className={css.ContainerId}>Container ID</div>
                        <div className={css.Image}>Image</div>
                        <div className={css.Command}>Command</div>
                        <div className={css.Created}>Created</div>
                        <div className={css.Ports}>Ports</div>
                        <div className={css.Names}>Names</div>
                        <div className={css.Status}>Status</div>
                    </div>
                    {/* <Accordion>
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
                                control={<Checkbox color="primary" onClick={selectAll} checked={allTrue} />}
                                label="Select"
                            />
                            <div className={containersTitleClasses.join(' ')}>
                                <div className={css.ContainerId}>Container ID</div>
                                <div className={css.Image}>Image</div>
                                <div className={css.Command}>Command</div>
                                <div className={css.Created}>Created</div>
                                <div className={css.Ports}>Ports</div>
                                <div className={css.Names}>Names</div>
                                <div className={css.Status}>Status</div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                The click event of the nested action will propagate up and expand the accordion unless
                                you explicitly stop it.
                            </Typography>
                        </AccordionDetails>
                    </Accordion> */}
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
        containerRun: (command) =>
            dispatch(actions.containerRun(command))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Containers);

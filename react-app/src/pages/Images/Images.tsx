import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Images.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import MenuImages from '../../components/MaterialCustomized/MenuImages';

import { Image, Container } from '../../models/Models';
import { isAllTrue, handleSelectAll, isSelectedAny, extractIds } from '../../helpers/helpers';
import { useViewport } from '../../Viewport';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';


interface IImagesProps {
    images: Image[],
    loading: boolean,
    errorContainers: string,
    errorImages: string,
    fetchImages: Function,
    removeImages: Function,
    pruneImages: Function,
    pullImage: Function,

    imagesDataTest: Image[],
    containers: Container[],
    fetchContainers: Function,
}

const Images = (props: IImagesProps) => {
    const { fetchImages, removeImages, pruneImages, pullImage, images, containers, fetchContainers, errorContainers, errorImages } = props;
    const { width, phone, tabletPortrait, tabletLandscape, desktop } = useViewport();

    const defaultSelectedImages = {};

    for (const [key, value] of Object.entries(images)) {
        defaultSelectedImages[value.id] = false
    }

    const [selectedImages, setSelectedImages] = useState<any>({ ...defaultSelectedImages });
    const [showError, setShowError] = useState<boolean>(false);
    const [showBackendError, setShowBackendError] = useState<boolean>(false);
    const [errorInfo, setErrorInfo] = useState<string>("");
    const [openPullModal, setOpenPullModal] = useState(false);
    const [pullImageName, setPullImageName] = useState("");

    const allTrue = isAllTrue(selectedImages);

    useEffect(() => {
        fetchImages();
        fetchContainers();
    }, [fetchImages, fetchContainers]);

    useEffect(() => {
        setShowBackendError(errorContainers.length > 0 || errorImages.length > 0);
    }, [errorContainers, errorImages]);

    useEffect(() => {
        const newSelected = {};
        for (const [key, value] of Object.entries(images)) {
            newSelected[value.id] = false
        }
        setSelectedImages({ ...newSelected });
    }, [images]);

    const handleCheckboxChange = changeEvent => {
        const { id } = changeEvent.target;
        const old = { ...selectedImages };

        for (const [key, value] of Object.entries(old)) {
            if (id === key) {
                old[key] = !old[key];
            }
        }

        setSelectedImages(old);
    };

    const handlePullOpen = () => {
        setOpenPullModal(true);
    };

    const handlePullClose = () => {
        setOpenPullModal(false);
    };

    const onChangePull = (e) => {
        setPullImageName(e.target.value);
    };

    const handleImagePull = () => {
        setOpenPullModal(false);
        if (pullImageName.length == 0) {
            return;
        }
        pullImage(pullImageName);
        setPullImageName('');
    };

    const handleRemoveImages = (images, imageIds) => {
        // console.log("handleRemoveImages()");
        const usedImages = [];
        let usedImagesNames = [];

        images.forEach((image) => {
            if (selectedImages[image.id] === true) {
                const imageRepoTag = (image.tag === '') ? `${image.repository}` : `${image.repository}:${image.tag}`;
                containers.forEach((container) => {
                    if (container.image === imageRepoTag) {
                        usedImages.push(image);
                        usedImagesNames.push(imageRepoTag);
                    }
                });
            }
        });

        if (usedImages.length > 0) {
            setShowError(true);
            usedImagesNames = [...new Set(usedImagesNames)];
            setErrorInfo(usedImagesNames.join(" "));
        } else {
            removeImages(imageIds);
        }
    };

    const handleImageOperation = (selectedImages, mode: string) => {
        // console.log(`triggered handleImageOperation(), mode: ${mode}`);
        const imageIds = extractIds(selectedImages);

        switch (mode.toLowerCase()) {
            case "remove":
                handleRemoveImages(images, imageIds);
                break;
            default: console.log("Unknown operation!");
        }

        const updated = { ...selectedImages };

        for (const [key, value] of Object.entries(updated)) {
            if (value === true) {
                updated[key] = false
            }
        }
        setSelectedImages(updated);
    };

    const selectAll = () => {
        const updated = handleSelectAll(selectedImages);
        setSelectedImages(updated);
    };

    const isSelected = isSelectedAny(selectedImages);

    const imagesTitleClasses = [css.Content, css.Heading];
    const useStyles = makeStyles({
        buttonGroup: {
            alignSelf: "flex-start",
        }
    });
    const classes = useStyles();

    let content = <div className={css.Wrapper}><LoadingIndicator /></div>

    if (!props.loading) {
        content = <Grid container direction="column">
            {(images && images.length) ?
                (images.map((image, i) => {
                    return <React.Fragment key={image.id}>

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
                                        id={image.id}
                                        checked={selectedImages[image.id] || false} />}
                                    label=""
                                />
                                <Grid item container className={css.Content}>
                                    <Tooltip title={image.repository}>
                                        <Grid className={css.Repository}>{image.repository}</Grid>
                                    </Tooltip>
                                    {(desktop || tabletLandscape) &&
                                        <Tooltip title={image.tag}>
                                            <Grid className={css.Tag}>{image.tag}</Grid>
                                        </Tooltip>
                                    }
                                    {!phone &&
                                        <Tooltip title={image.id}>
                                            <Grid className={css.Id}>{image.id}</Grid>
                                        </Tooltip>
                                    }
                                    {(desktop || tabletLandscape) &&
                                        <Tooltip title={image.created}>
                                            <Grid className={css.Created}>{image.created}</Grid>
                                        </Tooltip>
                                    }
                                    {desktop &&
                                        <Tooltip title={image.size}>
                                            <Grid className={css.Size}>{image.size}</Grid>
                                        </Tooltip>
                                    }

                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<MenuImages
                                            imageId={image.id}
                                            imageOperation={handleImageOperation}
                                        />}
                                        label=""
                                    />
                                </Grid>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Grid container direction="column">
                                    <Grid container direction="row">
                                        <Grid item className={css.DetailTitle}>Size:</Grid>
                                        <Grid item className={css.Size}>{image.size}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid item className={css.DetailTitle}>Created:</Grid>
                                        <Grid item className={css.Created}>{image.created}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid item className={css.DetailTitle}>Tag:</Grid>
                                        <Grid item className={css.Tag}>{image.tag}</Grid>
                                    </Grid>
                                    <Grid container direction="row">
                                        <Grid item className={css.DetailTitle}>ID:</Grid>
                                        <Grid item className={css.Id}>{image.id}</Grid>
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
        <div className={css.Images}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Podman Images</h1>
                <p>Showing information about images based on the `podman images` command</p>
                <Grid container className={css.Buttons}>
                    <Grid item className={css.Button}>
                        <Button
                            disabled={!isSelected}
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleImageOperation(selectedImages, "remove")}>
                            Remove Selected
                    </Button>
                    </Grid>
                    <Grid item className={css.Button}>
                        <Button
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => pruneImages()}>
                            Remove unused images
                        </Button>
                    </Grid>

                    <Grid item className={css.Button}>
                        <Button variant="outlined" color="primary" onClick={handlePullOpen}>
                            Pull
                        </Button>
                        <Dialog open={openPullModal} onClose={handlePullClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Pull</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the image you want to pull"
                            </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Image Pull"
                                    type="text"
                                    fullWidth
                                    onChange={onChangePull}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleImagePull} color="primary">
                                    Pull
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>

                </Grid>

                {showError &&
                    <Alert severity="error" onClose={() => { setShowError(!showError) }}>
                        <AlertTitle><strong>Error</strong></AlertTitle>
                        The following images are being used and cannot be deleted:
                        {(errorInfo.length > 0) ?
                            (errorInfo.split(' ').map((name, i) => {
                                return <Typography key={name} variant="body1" component="div" align="left">
                                    <strong>image: {name}</strong><strong></strong>
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
                        {errorImages.length > 0 &&
                            <p className={css.Error}>{errorImages}</p>
                        }
                    </Alert>
                }


                <div className={css.Info}>
                    <div className={imagesTitleClasses.join(' ')}>
                        <Checkbox color="primary" onChange={selectAll} checked={allTrue || false} />
                        <div className={css.Repository}>Repository</div>
                        {(desktop || tabletLandscape) &&
                            <div className={css.Tag}>Tag</div>
                        }
                        {!phone &&
                            <div className={css.Id}>ID</div>
                        }
                        {(desktop || tabletLandscape) &&
                            <div className={css.Created}>Created</div>
                        }
                        {desktop &&
                            <div className={css.Size}>Size</div>
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
        images: state.images.images,
        containers: state.containers.containers,
        errorImages: state.images.error,
        errorContainers: state.containers.error,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchImages: () =>
            dispatch(actions.fetchImages()),
        removeImages: (selectedImages: String[]) =>
            dispatch(actions.removeImages(selectedImages)),
        pruneImages: () =>
            dispatch(actions.pruneImages()),
        pullImage: (name) =>
            dispatch(actions.pullImage(name)),
        fetchContainers: () =>
            dispatch(actions.fetchContainers()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Images);

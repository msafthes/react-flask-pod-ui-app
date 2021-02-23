import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Images.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Image, Container } from '../../models/Models';

import { isAllTrue, handleSelectAll, isSelectedAny, extractIds } from '../../helpers/helpers';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MenuImages from '../../components/MaterialCustomized/MenuImages';
import Tooltip from '@material-ui/core/Tooltip';


interface IImagesProps {
    images: Image[],
    loading: boolean,
    fetchImages: Function,
    removeImages: Function,
    pruneImages: Function,

    imagesDataTest: Image[],
    containers: Container[],
    fetchContainers: Function,
}

const Images = (props: IImagesProps) => {
    const { fetchImages, removeImages, pruneImages, images, containers, fetchContainers } = props;

    const defaultSelectedImages = {};

    for (const [key, value] of Object.entries(images)) {
        defaultSelectedImages[value.id] = false
    }

    const [selectedImages, setSelectedImages] = useState<any>({ ...defaultSelectedImages });
    const [showError, setShowError] = useState<boolean>(false);
    const [errorInfo, setErrorInfo] = useState<string>("");

    const allTrue = isAllTrue(selectedImages);

    useEffect(() => {
        fetchImages();
        fetchContainers();
    }, [fetchImages, fetchContainers]);

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

    const handleRemoveImages = selectedImages => {
        console.log("triggered handleRemoveImages()")

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

        const imageIds = extractIds(selectedImages);
        const updated = { ...selectedImages };

        for (const [key, value] of Object.entries(updated)) {
            if (value === true) {
                updated[key] = false
            }
        }
        setSelectedImages(updated);

        if (usedImages.length > 0) {
            console.log("SELECTION INVALID - there are used images");
            setShowError(true);
            usedImagesNames = [...new Set(usedImagesNames)];
            setErrorInfo(usedImagesNames.join(" "));
        } else {
            console.log("Ready for deletion");
            removeImages(imageIds);
        }
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
                                        onClick={handleCheckboxChange}
                                        id={image.id}
                                        checked={selectedImages[image.id]} />}
                                    // label="Select"
                                    label=""
                                />
                                <Grid item container className={css.Content}>
                                    <Tooltip title={image.repository}>
                                        <Grid className={css.Repository}>{image.repository}</Grid>
                                    </Tooltip>
                                    <Tooltip title={image.tag}>
                                        <Grid className={css.Tag}>{image.tag}</Grid>
                                    </Tooltip>
                                    <Tooltip title={image.id}>
                                        <Grid className={css.Id}>{image.id}</Grid>
                                    </Tooltip>
                                    <Tooltip title={image.created}>
                                        <Grid className={css.Created}>{image.created}</Grid>
                                    </Tooltip>
                                    <Tooltip title={image.size}>
                                        <Grid className={css.Size}>{image.size}</Grid>
                                    </Tooltip>

                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={(event) => event.stopPropagation()}
                                        onFocus={(event) => event.stopPropagation()}
                                        control={<MenuImages
                                            imageId={image.id}
                                            removeImage={handleRemoveImages}
                                        />}
                                        // label="Select"
                                        label=""
                                    />
                                </Grid>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography>
                                    There are no additional data to display yet.
                        </Typography>
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
                <Grid container className={css.Content}>
                    <Grid item className={css.Buttons}>
                        <Button
                            disabled={!isSelected}
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleRemoveImages(selectedImages)}>
                            Remove Selected
                    </Button>
                    </Grid>
                    <Grid item className={css.Buttons}>
                        <Button
                            color="secondary"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => pruneImages()}>
                            Remove unused images
                    </Button>
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


                <div className={css.Info}>
                    <div className={imagesTitleClasses.join(' ')}>
                        <Checkbox color="primary" onClick={selectAll} checked={allTrue} />
                        <div className={css.Repository}>Repository</div>
                        <div className={css.Tag}>Tag</div>
                        <div className={css.Id}>ID</div>
                        <div className={css.Created}>Created</div>
                        <div className={css.Size}>Size</div>
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
        fetchContainers: () =>
            dispatch(actions.fetchContainers()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Images);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Images.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Image, Container } from '../../models/Models';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Typography } from '@material-ui/core';


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

    let allTrue = true;
    for (const [key, value] of Object.entries(selectedImages)) {
        if (value === false) {
            allTrue = false;
            break;
        }
    }

    console.log(`OUTSIDE functions allTrue: ${allTrue}`);

    useEffect(() => {
        fetchImages();
        fetchContainers();
    }, [fetchImages, fetchContainers]);

    console.log(selectedImages);

    const handleCheckboxChange = changeEvent => {
        const { id } = changeEvent.target;
        const old = { ...selectedImages };

        for (const [key, value] of Object.entries(old)) {
            if (id === key) {
                old[key] = !old[key];
            }
        }

        setSelectedImages(old);
        console.log(selectedImages);
    };

    const handleSelectedImagesOperation = selectedImages => {
        console.log("triggered handleSelectedImagesOperation(), selectedImages:");
        console.log(selectedImages);



        console.log("selectAll(), selectedImages:");
        console.log(selectedImages);

        console.log("images");
        console.log(images);

        const usedImages = [];
        const usedImagesNames = [];

        images.forEach((image) => {
            console.log(image);
            if (selectedImages[image.id] === true) {
                const imageRepoTag = (image.tag === '') ? `${image.repository}` : `${image.repository}:${image.tag}`;
                console.log(`imageRepoTag: ${imageRepoTag}`);
                containers.forEach((container) => {
                    console.log(container);
                    if (container.image === imageRepoTag) {
                        console.log("FOUND USED IMAGE!");
                        usedImages.push(image);
                        usedImagesNames.push(imageRepoTag);
                    }
                });
            }
        });

        console.log(usedImages);

        const imageIds = [];
        for (const [key, value] of Object.entries(selectedImages)) {
            if (value === true) {
                imageIds.push(key);
            }
        }
        console.log("imageIds:");
        console.log(imageIds);
        console.log("DE-selecting images:");
        const updated = { ...selectedImages };

        for (const [key, value] of Object.entries(updated)) {
            if (value === true) {
                updated[key] = false
            }
        }
        setSelectedImages(updated);
        console.log(selectedImages);

        if (usedImages.length > 0) {
            console.log("SELECTION INVALID - there are used images");
            console.log(usedImages);
            console.log(usedImagesNames);
            setShowError(true);
            setErrorInfo(usedImagesNames.join(" "));
        } else {
            console.log("Ready for deletion");
            removeImages(imageIds);
        }
    };

    console.log(`===> errorInfo: ${errorInfo}`);

    const selectAll = () => {
        console.log("selectAll(), selectedImages:");
        console.log(selectedImages);

        let allTrue = true;
        for (const [key, value] of Object.entries(selectedImages)) {
            if (value === false) {
                allTrue = false;
                break;
            }
        }

        const updated = { ...selectedImages };
        for (const [key, value] of Object.entries(updated)) {
            if (allTrue) {
                updated[key] = false
            } else {
                updated[key] = true
            }
        }

        setSelectedImages(updated);
        console.log(selectedImages);
    };

    const isSelectedAny = () => {
        console.log("isSelectedAny(), selectedImages:");
        console.log(selectedImages);

        for (const [key, value] of Object.entries(selectedImages)) {
            if (value === true) {
                console.log("TRUE - selected image found");
                return true
            }
        }

        console.log("FALSE - no selected image found");
        return false;
    };

    const isSelected = isSelectedAny();

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
                    return <Grid item container className={css.Content} key={image.id}>
                        <Checkbox color="primary" onClick={handleCheckboxChange} id={image.id} checked={selectedImages[image.id]} />
                        <Grid className={css.Repository}>{image.repository}</Grid>
                        <Grid className={css.Tag}>{image.tag}</Grid>
                        <Grid className={css.Id}>{image.id}</Grid>
                        <Grid className={css.Created}>{image.created}</Grid>
                        <Grid className={css.Size}>{image.size}</Grid>
                    </Grid>

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
                <ButtonGroup className={classes.buttonGroup}>
                    <Button disabled={!isSelected} color="secondary" startIcon={<DeleteIcon />} onClick={() => handleSelectedImagesOperation(selectedImages)}>Remove</Button>
                    <Button color="secondary" startIcon={<DeleteIcon />} onClick={() => pruneImages()}>Remove unused images</Button>
                </ButtonGroup>

                {showError &&
                    <Alert severity="error" onClose={() => { setShowError(!showError) }}>
                        <AlertTitle><strong>Error</strong></AlertTitle>
                        The following images are being used and cannot be deleted:

                        {(errorInfo.length > 0) ?
                            (errorInfo.split(' ').map((name, i) => {
                                return <Typography variant="body1" component="div" align="left">
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

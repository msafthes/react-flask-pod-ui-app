import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as actions from '../../store/actions/index';
import { AppState } from '../../store';

import css from './Images.module.css';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import { Image } from '../../models/Models';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';


interface IImagesProps {
    images: Image[],
    loading: boolean,
    fetchImages: Function,
    removeImages: Function,

    imagesDataTest: Image[]
}

const Images = (props: IImagesProps) => {
    const { fetchImages, removeImages, images } = props;

    const defaultSelectedImages = {};

    for (const [key, value] of Object.entries(images)) {
        defaultSelectedImages[value.id] = false
    }

    const [selectedImages, setSelectedImages] = useState<any>({ ...defaultSelectedImages });

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
    }, [fetchImages]);

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

        removeImages(imageIds);
    };

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

    const imagesTitleClasses = [css.Content, css.Heading];
    const useStyles = makeStyles({
        buttonGroup: {
            alignSelf: "flex-start"
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
                    <Button color="secondary" startIcon={<DeleteIcon />} onClick={() => handleSelectedImagesOperation(selectedImages)}>Remove</Button>
                </ButtonGroup>

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
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        fetchImages: () =>
            dispatch(actions.fetchImages()),
        removeImages: (selectedImages) =>
            dispatch(actions.removeImages(selectedImages))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Images);

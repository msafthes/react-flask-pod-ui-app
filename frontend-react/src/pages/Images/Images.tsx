import React, { useState, useCallback, useEffect } from 'react';
import css from './Images.module.css';

import axios from 'axios';

const Images = (props) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://127.0.0.1:5000/images',
            );
            setImages(result.data);
        };
        fetchData();
    }, []);

    const imagesTitleClasses = [css.Content, css.Heading];

    return (
        <div className={css.Images}>
            <div className={css.Wrapper}>
                <h1 className={css.Headline}>Podman Images</h1>
                <p>Showing information about images based on the `podman images` command</p>
                <div className={css.Info}>
                    <div className={imagesTitleClasses.join(' ')}>
                        <div className={css.Repository}>Repository</div>
                        <div className={css.Tag}> Tag</div>
                        <div className={css.Id}>ID</div>
                        <div className={css.Created}>Created</div>
                        <div className={css.Size}>Size</div>
                    </div>
                    {props.imagesData.map((image, i) => {
                        return <div className={css.Content} key={image.key}>
                            <div className={css.Repository}>{image.repository}</div>
                            <div className={css.Tag}>{image.tag}</div>
                            <div className={css.Id}>{image.id}</div>
                            <div className={css.Created}>{image.created}</div>
                            <div className={css.Size}>{image.size}</div>
                        </div>
                    })}
                    {props.images && props.images.map((image, i) => {
                        return <div className={css.Content} key={image.key}>
                            <div className={css.Repository}>{image.repository}</div>
                            <div className={css.Tag}>{image.tag}</div>
                            <div className={css.Id}>{image.id}</div>
                            <div className={css.Created}>{image.created}</div>
                            <div className={css.Size}>{image.size}</div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Images;

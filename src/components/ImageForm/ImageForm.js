import React from 'react';
import styles from './ImageForm.module.css';

const ImageForm = ({value, onInputChange, onSubmit}) =>{
    return(
        <div className={styles.container}>
            <input className={styles.imageInput}
            type="url" placeholder="Paste the image url here"
            onChange={onInputChange} value={value}
            />
            <button
            className={styles.button}
            onClick={onSubmit}
            >{'Detect faces!'}</button>
        </div>
    );
}
export default ImageForm;
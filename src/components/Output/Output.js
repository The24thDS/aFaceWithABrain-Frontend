import React from 'react';
import styles from './Output.module.css';


const Image = ({source, faces}) =>{
    let boxes = []
    if(faces.length)
        boxes = faces.map( face => <div key={face.top+face.left} className={styles.box} style={face}></div>)
    return(
        <div className={styles.container}>
            <img className={styles.image} src={source} alt={faces.length?"Image is loading":source}/>
            {boxes}
        </div>
    );
}
export default Image;
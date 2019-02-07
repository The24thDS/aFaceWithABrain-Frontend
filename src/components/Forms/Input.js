import React from 'react';
import styles from './Input.module.css';

const Input = ({ name, type, text, required, submitInput, recordInput}) => {
    if(type!=="submit"){
        return (
            <label className={styles.label}>{text}
                {
                    required==="true"?
                    <input onChange={recordInput} className={styles.input} name={name} type={type} required/>
                    :
                    <input onChange={recordInput} className={styles.input} name={name} type={type} />
                }
            </label>
        )
    } else {
        return (
                <input 
                className={styles.submit}
                name={name} 
                type={type} 
                value={text}
                onClick={submitInput}
                />
        )
    }
}
export default React.memo(Input);
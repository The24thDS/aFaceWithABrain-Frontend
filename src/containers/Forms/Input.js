import React from 'react';
import styles from './Input.module.css';

const Input = ({ name, type, text, infos, status, onInputClick, onInputChange, verifyInput}) => {
    if(type!=="submit"){
        return (
            <span className={styles.label}>{text}
                {
                    infos?infos.map(info => <em>{`${info}`}</em>):''
                }
                <div className={styles.inputContainer}>
                    <input 
                        onBlur={verifyInput}
                        onClick={onInputClick}
                        className={styles.input} 
                        name={name} type={type} 
                    />
                    {status?<div style={{width: '25px', height: '25px', position: 'relative'}}></div>:''}
                </div>
            </span>
        )
    } else {
        return (
                <input 
                className={styles.submit}
                name={name} 
                type={type} 
                value={text}
                onClick={onInputClick}
                />
        )
    }
}
export default React.memo(Input);
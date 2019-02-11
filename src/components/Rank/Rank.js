import React from 'react';

const Rank = ({username, entries}) =>{
    return(
        <h2 className="HemiHead" style={{fontSize: '35px'}}>
            {`Hello ${username}! Your current entry count is ${entries}`}
        </h2>
    );
}
export default Rank;
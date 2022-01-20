import React from 'react';

const Record = (props) => {
    return (
        <div className={props.class}>
            <span>{props.title}: Rs.{props.amount}</span>
        </div>
    );
};

export default Record;
import React from 'react';
import './reqContainer.css';

const ReqContainer = ({ Req, title, allMessages, getRequestMessages }) => {


    return (
        <div className='reqContainer'>
            <div className='title'>{title}</div>
            {allMessages?.map((el) => <Req el={el} getRequestMessages={getRequestMessages} />)}
        </div>
    )
}


export default ReqContainer;
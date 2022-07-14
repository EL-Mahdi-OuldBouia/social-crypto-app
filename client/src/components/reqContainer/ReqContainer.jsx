import React from 'react';
import './reqContainer.css';

const ReqContainer = ({ Req, title }) => {
    return (
        <div className='reqContainer'>
            <div className='title'>{title}</div>
            <Req />
            <Req />
            <Req />
        </div>
    )
}

export default ReqContainer
import React from 'react';
import './share.css';
import image from '../../imgs/logo.png';
import { PermMedia, EmojiEmotions, Label } from '@mui/icons-material';


const Share = () => {
    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={image} alt="" width='40' className='shareProfileImg' />
                    <input type="text" className='shareInput' placeholder="What's on ur Mind" />
                </div>
                <hr className='shareHr' />

                <div className="shareBottom">
                    <div className="shareOptions">

                        <div className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo Or Video</span>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='gold' className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className='shareButton'>Share</button>
                </div>
            </div>
        </div>
    )
}

export default Share;
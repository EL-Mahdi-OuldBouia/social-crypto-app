import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePostsActions } from '../../store/updatePosts-slice';
import './share.css';
import { PermMedia, EmojiEmotions, Label } from '@mui/icons-material';
import axios from 'axios';



const Share = () => {
    const [shareImage, setShareImage] = useState(null);
    const [toBeSharedFileURL, setToBeSharedFileURL] = useState("")
    const [imageDescription, setImageDescription] = useState('');
    const userId = useSelector(state => state.user.user);
    const updatePostsState = useSelector(state => state.updatePosts.update)
    const dispatch = useDispatch();

    const shareImageHandler = (e) => {
        e.preventDefault();
        const dataFile = new FormData();
        console.log('a preview of the file ', toBeSharedFileURL);
        dataFile.append('image', shareImage);
        dataFile.append('userId', userId.userId);
        dataFile.append('username', userId.username);
        dataFile.append('desc', imageDescription);

        if (imageDescription.trim() !== "" || shareImage !== null) {
            axios.post('/posts/', dataFile)
                .then((res) => {
                    setToBeSharedFileURL("")
                    setImageDescription("");
                    setShareImage(null);
                })
                .catch((err) => {
                    console.log('An error was occured in adding a new post')
                })
            dispatch(updatePostsActions.updatePosts());
            console.log('the updatePostsState', updatePostsState)
        }
    }

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    {toBeSharedFileURL && <img className='shareProfileImg' src={toBeSharedFileURL} alt="" width="200px" height="150px" />}
                    <input type="text" className='shareInput'
                        onChange={e => setImageDescription(e.target.value)}
                        placeholder="What's on ur Mind" value={imageDescription} />
                </div>
                <hr className='shareHr' />

                <div className="shareBottom">
                    <div className="shareOptions">

                        <div className="shareOption">
                            <div className="upload">
                                <input className="uploadInput" onChange={e => {
                                    setShareImage(e.target.files[0]);
                                    setToBeSharedFileURL(URL.createObjectURL(e.target.files[0]));
                                }}
                                    type="file" name="image" id="" />
                                <PermMedia htmlColor='tomato' className='shareIcon' />
                            </div>

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
                    <button className='shareButton' onClick={shareImageHandler}>Share</button>
                </div>
            </div>
        </div>
    )
}

export default Share;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './post.css';
import profileImg from '../../imgs/logo.png';
import Comments from '../comments/Comments';
import { Favorite, ThumbUp } from '@mui/icons-material';
import { FaTrash } from 'react-icons/fa';
import { Buffer } from 'buffer';
import axios from 'axios';

const Post = ({ postId, setRemovedPost }) => {
    const [post, setPost] = useState({});
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [numberOfComments, setNumberOfComments] = useState(0);
    const [postImage, setPostImage] = useState(null);
    const [commentToAdd, setCommentToAdd] = useState("");
    const [showComments, setShowComments] = useState(true);
    const [comments, setComments] = useState([]);
    const [updatePost, setUpdatePost] = useState(true);
    const userId = useSelector(state => state.user.user);
    const [postLikes, setPostLikes] = useState([]);


    useEffect(() => {
        const fetchPost = async () => {

            await fetch('/posts/' + postId, {
                method: 'GET'
            })
                .then(data => {
                    data.json().then((data) => {
                        setPost(data);
                        const img = Buffer.from(data.image.data).toString("base64");
                        setPostImage(img);
                        setPostLikes(data.likes);
                        setNumberOfLikes(data.likes.length);
                        setNumberOfComments(data.comments.length);
                        setComments(data.comments);
                    }
                    )
                })
                .catch((err) => console.log(err))
        }
        fetchPost();
    }, [postId, updatePost])


    const addComment = () => {
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        const date = new Date().getHours() + ':' + (minutes >= 10 ? minutes : '0' + minutes) + ':' + (seconds >= 10 ? seconds : '0' + seconds)
        if (commentToAdd.trim() !== "") {
            setNumberOfComments(num => num + 1);
            axios.patch('/posts/' + postId, {
                change: 'comment',
                userId: userId.userId,
                username: userId.username,
                comment: commentToAdd,
                date: date
            })
                .then((res) => {
                    setCommentToAdd('');
                    setUpdatePost(false);
                    console.log("adding comment was successful", res.data)
                })
                .catch((err) => {
                    console.log('there was an erro while adding the comment', err)
                })
        }
    }

    const addRemoveLike = () => {
        const isAlreadyLiking = postLikes.filter((like) => like.userId === userId.userId);
        if (isAlreadyLiking.length > 0) {
            setNumberOfLikes(isAlreadyLiking.length - 1)
            setPostLikes(isAlreadyLiking);

        } else {
            setNumberOfLikes(isAlreadyLiking.length + 1)
            setPostLikes(p => p.push(userId));
        }
        axios.patch('/posts/' + postId, {
            change: 'like',
            userId: userId.userId,
            username: userId.username,
        })
            .then((res) => {
                setUpdatePost(!updatePost);
                console.log('it was successfully liked the post');
            })
            .catch((err) =>
                console.log('an error was occured in liking the post')
            )
    }


    const removePost = () => {
        axios.delete('/posts/' + postId)
            .then((res) => {
                setRemovedPost(postId);
                console.log('the post was successfully removed', res)
            })
            .catch((err) => {
                console.log('there was an error removing the post', err);
            })
    }



    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {(userId.userImage === '' && userId.userId === post.userId) ?
                            <img src={profileImg} width='100' alt="" className="postProfileImg" />
                            :
                            <img src={`data:image/png;base64,${userId.userImage}`} width='100' alt="" className="postProfileImg" />}
                        <span className="postUsername">{post.username}</span>
                        <span className="postDate">{post?.date}</span>
                    </div>
                    <div className="postTopRight">
                        {userId.userId === post.userId && <FaTrash onClick={removePost} className="trash" />}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={`data:image/png;base64,${postImage}`} width='100' className='postImg' alt="" />
                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp className='likeIcon' onClick={addRemoveLike} />
                        <Favorite className='heartIcon' />
                        <span className="postlikeCounter">{numberOfLikes} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText"
                            onClick={e => setShowComments(!showComments)}>{numberOfComments} comments</span>
                    </div>

                </div>
                {showComments && <Comments addComment={addComment}
                    setCommentToAdd={setCommentToAdd}
                    comments={comments}
                    commentToAdd={commentToAdd}
                />}
            </div>
        </div>
    )
}

export default Post;
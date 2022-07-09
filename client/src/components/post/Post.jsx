import React, { useState } from 'react';
import './post.css';
import profileImg from '../../imgs/bg.png';
import { MoreVert, Favorite, ThumbUp } from '@mui/icons-material';

const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={profileImg} width='100' alt="" className="postProfileImg" />
                        <span className="postUsername">{post.username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={profileImg} width='100' className='postImg' alt="" />
                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp className='likeIcon' onClick={likeHandler} />
                        <Favorite className='heartIcon' onClick={likeHandler} />
                        <span className="postlikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comments} comments</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Post;
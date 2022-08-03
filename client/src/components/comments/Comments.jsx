import React from 'react';
import './comments.css';

const Comments = ({ setCommentToAdd, addComment, comments, commentToAdd }) => {
    return (
        <div className="comment-container">
            {comments.length > 0 && <div className="just-comments">
                {comments?.map((comment, index) => <div key={index} className="singleCommentContainer">
                    <span className="s-username">{comment.username}:</span>
                    <span key={index} className="singleComment">{comment.comment}</span>
                    <span className="s-date">date: <b>{comment.date}</b></span>
                </div>)}
            </div>}
            <div className="addCommentsBox">
                <input type="text" name="comment"
                    onChange={e => setCommentToAdd(e.target.value)}
                    value={commentToAdd}
                    placeholder="write a comment" />
                <button className="btn-addComment" onClick={addComment} >Add Comment</button>
            </div>
        </div>
    )
}

export default Comments
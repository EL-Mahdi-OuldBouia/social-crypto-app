import './feed.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Share from '../share/Share';
import Post from '../post/Post';



const Feed = () => {
    const [posts, setPosts] = useState([]);
    const userId = useSelector(state => state.user.user);
    const [removedPost, setRemovedPost] = useState("");

    const updatePostState = useSelector(state => state.updatePosts.update)

    useEffect(() => {

        const fetchPosts = async () => {

            await fetch('/posts/timeline/' + userId.userId, {
                method: 'GET'
            })
                .then(data => {
                    data.json().then((data) => {
                        setPosts(data);
                    }
                    )
                    setRemovedPost("");
                })
                .catch((err) => console.log(err))
        }
        fetchPosts();
    }, [updatePostState, userId])

    return (
        <div className='feed'>
            <div className="feedWrapper">
                <Share />

                {posts.filter((post) => post._id !== removedPost).map((post) =>
                    <Post key={post._id} postId={post._id} setRemovedPost={setRemovedPost} />
                )}

            </div>

        </div>
    )
}

export default Feed;
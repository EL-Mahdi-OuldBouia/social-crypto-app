import './feed.css';
import { useState, useEffect } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';


const Feed = ({ currentUser }) => {
    const [posts, setPosts] = useState([]);
    console.log('currentUser from feed', currentUser._id)
    console.log('posts from Feed', posts);

    useEffect(() => {
        const fetchFunction = async () => {

            await axios.get('/posts/timeline/' + currentUser._id)
                .then((response) => {
                    console.log(response.data);
                    setPosts(response.data);
                })
                .catch((error) => {
                    console.log('An Error was occured in getting posts', error)
                })

        }
        fetchFunction();
    }, [currentUser._id])


    return (
        <div className='feed'>
            <div className="feedWrapper">
                <Share />

                {posts.map((post) => <Post key={post._id} post={post} />)}

            </div>

        </div>
    )
}

export default Feed;
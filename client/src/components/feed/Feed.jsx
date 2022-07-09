import './feed.css';
import { useState, useEffect } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';


const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchFunction = async () => {

            await axios.get('/posts/timeline/62c5cdc71390184b6a11bfa8')
                .then((response) => {
                    console.log(response.data);
                    setPosts(response.data);
                })
                .catch((error) => {
                    console.log('An Error was occured in getting posts', error)
                })

            // const user = {
            //     username: 'Stan',
            //     email: 'stan@gmail.com',
            //     password: '123456789',
            //     profilePicture: '',
            //     coverPicture: '',
            //     desc: 'What a good day to be Alive',
            //     city: 'Agadir',
            //     from: 'Morocco',
            // }

            // const post = {
            //     userId: 1,
            //     desc: 'My first post description',
            //     img: '',
            //     likes: [],
            //     comments: [{}],
            // }

            // await axios.post('/auth/register', user)
            //     .then((response) => {
            //         console.log(response);
            //     }, (error) => {
            //         console.log("An error was occured in creating user", error);
            //     });

            // await axios.post('/posts', post)
            //     .then((response) => {
            //         console.log(response)
            //     })
            //     .catch((error) => {
            //         console.log('An error was occured in creating post', error);
            //     })

        }
        fetchFunction();
    }, [])


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
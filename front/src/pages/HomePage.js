import React from 'react'
import { Route } from "react-router-dom";
import NewPost from './NewPostPage'
import PostDetails from './PostDetailsPage'
import PostList from '../components/PostList'

function Home() {
    return (
        <React.Fragment>
            <PostList />
            <Route path={'/new'} component={NewPost} />
            <Route path={`/edit`} component={PostDetails} />
        </React.Fragment>
    )
}

export default Home
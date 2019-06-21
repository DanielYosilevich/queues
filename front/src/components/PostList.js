import React from 'react'
import { withRouter } from "react-router-dom";
import { Query } from 'react-apollo'
import { POSTS_QUERY } from '../assets/apollo/queries'
import { mutationResetAll, mutationEmailAll } from '../assets/apollo/clientService'
import PostPreview from './PostPreview'
import Button, { ButtonGroup } from '@atlaskit/button'

function PostList(props) {

    const resetAll = () => {
        mutationResetAll()
            .then((data) => {
                console.log('Reset:', data.message)
            })
    }

    const emailAll = () => {
        mutationEmailAll()
            .then((data) => {
                console.log('Email All:', data.message)
            })
    }


    return (
        <React.Fragment>
            <div style={{ padding: "0 1rem 0 1rem" }}>
                <ButtonGroup>
                    <Button onClick={() => props.history.push('/new')}>Add New</Button>
                    <Button onClick={resetAll}>Reset All</Button>
                    <Button onClick={emailAll}>Email All</Button>
                </ButtonGroup>
                <hr />
                <Query query={POSTS_QUERY} pollInterval={2000}>
                    {({ loading, error, data }) => {
                        if (loading && !data.posts) return <div>Fetching</div>
                        if (error) return <div>Error</div>
                        const postsToRender = data.posts
                        return (
                            <div >
                                {postsToRender.map(post => <PostPreview key={post._id} post={post} />)}
                            </div>
                        )
                    }}
                </Query>
            </div>
        </React.Fragment>
    )
}

export default withRouter(PostList)
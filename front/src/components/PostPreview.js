import React from 'react'
import { withRouter } from "react-router-dom";
import { mutationRemovePost, mutationEmailOne} from '../assets/apollo/clientService'
import Moment from 'react-moment'
import Button, { ButtonGroup } from '@atlaskit/button'

function PostPreview(props) {

    const removePost = () => {
        let postId = props.post._id
        mutationRemovePost(postId)
            .then((data) => {
                console.log('removed', data)
            })
    }

    const emailOne = () => {
        let postId = props.post._id
        mutationEmailOne(postId)
            .then((data) => {
                console.log('mailed', data.emailOne._id)
            })
    }

    return (
        <div>
            <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
                <span style={{ marginRight: "1rem" }}> {props.post.title} (importance: {props.post.importance})</span>
                <ButtonGroup>
                    <Button onClick={removePost}>Remove</Button>
                    {!props.post.triesCount && <div>
                        <Button onClick={() => props.history.push({
                            pathname: '/edit',
                            post: props.post
                        })}
                        >
                            Edit
                        </Button>
                        <Button onClick={emailOne}>Email</Button>
                    </div>}
                    {props.post.triesCount && <div>
                        <Button> <span style={{ color: "green" }}> Task was sent!</span></Button>
                    </div>}
                </ButtonGroup>
            </div>
            <ul>
                <li>description: {props.post.description}</li>
                <li>created: <Moment fromNow>{props.post.createdAt}</Moment></li>
                <li>last tried: {props.post.lastTried}</li>
                <li>sent: {props.post.sentAt}</li>
                <li>tries count: {props.post.triesCount}</li>
            </ul>
        </div>
    )
}

export default withRouter(PostPreview)
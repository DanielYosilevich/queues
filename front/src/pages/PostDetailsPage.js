import React, { useState } from 'react'
import { withRouter } from "react-router-dom"
import '../assets/css/form-style.css'
import { mutationUpdatePost } from '../assets/apollo/clientService'
import TextField from '@atlaskit/textfield'
import TextArea from '@atlaskit/textarea'
import Select from '@atlaskit/select'
import Form, { Field, FormHeader, FormSection, FormFooter } from '@atlaskit/form'
import Button, { ButtonGroup } from '@atlaskit/button'
import { IMPORTANCE } from '../assets/common/data'

function PostDetails(props) {
    const [post, updatePost] = useState(props.location.post)
    const close = () => props.history.push('/')

    const stop = (e) => e.stopPropagation();

    const handleSubmit = (data) => {
        let postToUpdate = {
            _id: post._id,
            title: data.title,
            importance: data.importance.value,
            description: data.description
        }
        mutationUpdatePost(postToUpdate)
            .then((data) => {
                updatePost({
                    _id: post._id,
                    title: data.title,
                    importance: data.importance,
                    description: data.description
                })
                close();
            })
    }

    const cancel = (e) => {
        e.preventDefault();
        close();
    }

    const getImportance = (post) => {
        return IMPORTANCE.find((importance) => (importance.value === post.importance))
    }

    return (
        <React.Fragment>
            <div onClick={close} className="modal-mask">
                <div onClick={stop} className="modal-container">
                    <Form onSubmit={handleSubmit}>
                        {({ formProps }) => (
                            <form {...formProps} name="submit-form">
                                <FormHeader title="Edit Task" />
                                <FormSection>
                                    <Field
                                        name="title"
                                        defaultValue={post.title}
                                        label="Title"
                                        isRequired
                                    >
                                        {({ fieldProps }) => (
                                            <TextField {...fieldProps} />
                                        )}
                                    </Field>
                                    <Field
                                        name="description"
                                        defaultValue={post.description}
                                        label="Description"
                                        isRequired
                                    >
                                        {({ fieldProps }) => (
                                            <TextArea {...fieldProps} />
                                        )}
                                    </Field>
                                    <Field
                                        label="Importance"
                                        name="importance"
                                        defaultValue={getImportance(post)}
                                    >
                                        {({ fieldProps }) => (
                                            <Select
                                                {...fieldProps}
                                                options={IMPORTANCE}
                                            />
                                        )}
                                    </Field>
                                </FormSection>
                                <FormFooter>
                                    <ButtonGroup>
                                        <Button onClick={cancel}>Cancel</Button>
                                        <Button type="submit">Save</Button>
                                    </ButtonGroup>
                                </FormFooter>
                            </form>
                        )}
                    </Form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(PostDetails)
import React from 'react'
import { withRouter } from "react-router-dom"
import '../assets/css/form-style.css'
import { mutationAddPost } from '../assets/apollo/clientService'
import TextField from '@atlaskit/textfield'
import TextArea from '@atlaskit/textarea'
import Select from '@atlaskit/select'
import Form, { Field, FormHeader, FormSection, FormFooter } from '@atlaskit/form'
import Button, { ButtonGroup } from '@atlaskit/button'
import { IMPORTANCE } from '../assets/common/data'

function NewPost(props) {

  const close = () => props.history.push('/')

  const stop = (e) => e.stopPropagation();

  const cancel = (e) => {
    e.preventDefault();
    close();
  }

  const handleSubmit = (data) => {
    let post = {
      title: data.title,
      importance: data.importance.value,
      description: data.description
    }
    mutationAddPost(post)
      .then(() => {
        close();
      })
  }

  return (
    <React.Fragment>
      <div onClick={close} className="modal-mask">
        <div onClick={stop} className="modal-container">
          <Form onSubmit={handleSubmit}>
            {({ formProps }) => (
              <form {...formProps} name="submit-form">
                <FormHeader title="New Task" />
                <FormSection>
                  <Field
                    name="title"
                    defaultValue=""
                    label="Title"
                    isRequired
                  >
                    {({ fieldProps }) => (
                      <TextField {...fieldProps} />
                    )}
                  </Field>
                  <Field
                    name="description"
                    defaultValue=""
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
                    defaultValue={IMPORTANCE[0]}
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
                    <Button onClick={cancel} >Cancel</Button>
                    <Button type="submit"> Save </Button>
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

export default withRouter(NewPost)
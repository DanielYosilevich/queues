import { client } from './clients';
import * as m  from './mutations'


export const mutationAddPost = async (data) => {
    let result = await client
        .mutate({
            mutation: m.ADD_POST_MUTATION,
            variables: { post: data},
        })
    return result.data
}

export const mutationRemovePost = async (data) => {
    let result = await client
        .mutate({
            mutation: m.REMOVE_POST_MUTATION,
            variables: { _id: data },
        })
    return result.data
}

export const mutationUpdatePost = async (data) => {
    let result = await client
        .mutate({
            mutation: m.UPDATE_POST_MUTATION,
            variables: { post: data},
        })
    return result.data.updatePost
}

export const mutationEmailOne = async (data) => {
    let result = await client
        .mutate({
            mutation: m.EMAIL_ONE_MUTATION,
            variables: { _id: data },
        })
    return result.data
}

export const mutationEmailAll = async () => {
    let result = await client
        .mutate({
            mutation: m.EMAIL_ALL_MUTATION,
        })
    return result.data.emailAll
}

export const mutationResetAll = async () => {
    let result = await client
        .mutate({
            mutation: m.RESET_ALL_MUTATION,
        })
    return result.data.resetAll
}
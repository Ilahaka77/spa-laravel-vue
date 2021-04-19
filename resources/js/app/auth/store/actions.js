import { isEmpty } from 'lodash'
import { setHttpToken } from '../../../helpers'

export const register = ({dispatch}, {payload, context}) => {
    return axios
        .post('/api/auth/register', payload)
        .then((result) => {
            console.log(result.data)
        }).catch((err) => {
            context.errors = err.response.data.errors
            console.log(context.errors)
        })
}

export const login = ({dispatch}, {payload, context}) => {
    return axios
        .post('api/auth/login', payload)
        .then((result) => {
            dispatch('setToken', result.data.meta.token).then(() =>{
                dispatch('fetchUser', result.data)
            })
        }).catch((err) => {
            context.errors = err.response.data.errors
        })
}

export const setToken = ({commit, dispatch}, token) => {
    if(isEmpty(token)){
        return dispatch('checkTokenExist')
            .then((token) => {
                commit('setToken', token)
                setHttpToken(token)
            })
    }
    commit('setToken', token)
    setHttpToken(token)
}

export const removeToken = ({commit}) => {
    commit('setAuthenticated', false)
    commit('setUserData', null)
    commit('setToken', null)
    setHttpToken(null)
}

export const fetchUser = ({commit}, user) => {
    
    axios.get('/api/user')
        .then((result) => {
            commit('setAuthenticated', true)
            commit('setUserData', result.data)
        }).catch((err) => {
            console.log(err.response.data)
        })
}

export const checkTokenExist = () => {
    const token = localStorage.getItem('access_token')

    if(isEmpty(token)){
        return Promise.reject("NO_STORAGE_FOUND")
    }

    return Promise.resolve(token)
}
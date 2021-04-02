import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../actions/types'


export const userLoginReducer = (state = {}, action) => {

    const { payload, type } = action

    switch (type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }

}
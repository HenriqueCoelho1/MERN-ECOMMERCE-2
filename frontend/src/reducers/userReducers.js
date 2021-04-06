import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from '../actions/types'


export const userLoginReducer = (state = {}, action) => {

    const { payload, type } = action

    switch (type) {
        case USER_LOGIN_SUCCESS:
            return payload
        case USER_LOGOUT:
            return {}
        default:
            return state
    }

}
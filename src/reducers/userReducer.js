import { LOGGED_IN_USER, LOGOUT } from '../actions/types'

export function userReducer(state = null, action) {
    const { type, payload } = action

    switch (type) {
        case LOGGED_IN_USER:
            return payload

        case LOGOUT:
            return payload

        default:
            return state
    }
}
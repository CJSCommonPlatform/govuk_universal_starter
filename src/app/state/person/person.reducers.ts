import {ADD_PERSONAL_DETAILS, ADD_EMAIL} from './person.actions';

export interface PersonState {
    firstName: String,
    lastName: String,
    email?: String
}   

export const person = (state = {}, {type, payload}) => {
    switch(type) {
        case ADD_PERSONAL_DETAILS:
            return Object.assign({}, state, {
                firstName: payload.firstName,
                lastName: payload.lastName,
            })
        case ADD_EMAIL:
            return Object.assign({}, state, {
                email: payload.email
            })
        default:
            return state;
    }
}
import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_PARTIES
} from '../types/Types'

const initState = {
    loading: false,
    message: '',
    parties: [],

}

export const PartiesReducer = (state = initState, action) => {
    const { type, payload } = action;
    if (type === SET_LOADER) {
        return { ...state, loading: true }
    }
    else if (type === CLOSE_LOADER) {
        return { ...state, loading: false }
    }
    if (type === SET_PARTIES) {
        return {
            ...state,
            parties: payload.response
        }
    }

    else {
        return state;
    }
}


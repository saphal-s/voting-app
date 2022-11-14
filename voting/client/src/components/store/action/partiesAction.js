import axios from 'axios';
import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_PARTIES,
} from '../types/Types'

export const fetchParties = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        try {
            const { data: { response } } = await axios.get('/api/parties');
            // console.log(data)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_PARTIES, payload: { response } })
            // console.log(response)
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
        }
    }
}

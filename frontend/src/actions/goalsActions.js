import axios from 'axios'

export const getGoals = () => async (dispatch, getState) => {
    
    const { data } = await axios.get('api/goals/manage-goals/')
    dispatch({type:'GET_GOALS', payload:data})

}
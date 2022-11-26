const initialState={
    goals:[]
}

export const goalsReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_GOALS":
            return {...state,
                goals: action.payload }

        default:
            return state
    }
}
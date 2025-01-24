import { useState } from "react"

function useMyReducer(reducer, initialState) {

    const [state, setState] = useState(initialState);

    const dispatchFun = (action) => {
        const newState = reducer(state, action);
        setState(newState);
    }

    return [state, dispatchFun];
}

export default useMyReducer
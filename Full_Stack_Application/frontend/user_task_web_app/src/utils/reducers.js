
export const initialRegisterUserState = {
    name: "",
    email: "",
    password: ""
}

export const initialCreateTaskState = {
    name: "",
    description: ""
}

export const registerFormReducer = (state = initialRegisterUserState, { type, payload }) => {

    switch (type) {
        case 'name': {
            return {
                ...state,
                name: payload
            }
        }
        case 'email': {
            return {
                ...state,
                email: payload
            }
        }
        case 'password': {
            return {
                ...state,
                password: payload
            }
        }
        case 'clear': {
            return {
                ...initialRegisterUserState
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}


export const createTaskFormReducer = (state = initialCreateTaskState, { type, payload }) => {

    switch (type) {
        case 'name': {
            return {
                ...state,
                name: payload
            }
        }
        case 'description': {
            return {
                ...state,
                description: payload
            }
        }
        case 'clear': {
            return {
                ...initialCreateTaskState
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
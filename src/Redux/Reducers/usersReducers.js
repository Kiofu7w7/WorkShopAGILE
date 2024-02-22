import { typesUsers } from "../Types/types";

const initialState = {
    users: [],
};

const usersReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesUsers.list:
            return {
                users: [...action.payload],
            };

        case typesUsers.add:
            return {
                users: [...state.users, action.payload],
            };
        case typesUsers.delete:
            return {
                users: state.users.filter((p) => p.id !== action.payload),
            };

        case typesUsers.edit:
            const index = state.users.findIndex(
                (user) => user.id === action.payload.id
            );
            if (index !== -1) {
                const updatedUser = { ...state.users[index] };
                for (const property in action.payload) {
                    if (updatedUser.hasOwnProperty(property)) {
                        updatedUser[property] = action.payload[property];
                    }
                }
                return {
                    ...state,
                    users: [
                        ...state.users.slice(0, index),
                        updatedUser,
                        ...state.users.slice(index + 1),
                    ],
                };
            } else {
                console.warn(
                    `Product with ID ${action.payload.id} not found for editing.`
                );
                return state;
            }

        default:
            return state;
    }
};

export default usersReducers;
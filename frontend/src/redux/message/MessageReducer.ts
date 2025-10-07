import { MessageReducerState, MessageDTO } from "./MessageModel";
import { Action } from "../CommonModel";
import * as actionTypes from "./MessageActionType";

const initialState: MessageReducerState = {
    messages: [],
    newMessage: null,
};

const messageReducer = (state: MessageReducerState = initialState, action: Action): MessageReducerState => {
    switch (action.type) {
        case actionTypes.CREATE_NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload], // append immutably
                newMessage: action.payload,
            };

        case actionTypes.GET_ALL_MESSAGES:
            return {
                ...state,
                messages: [...action.payload], // replace current messages immutably
            };

        default:
            return state;
    }
};

export default messageReducer;

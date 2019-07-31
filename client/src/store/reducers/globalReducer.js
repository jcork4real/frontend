import { createContext } from 'react';

export const globalContext = createContext();

const initialState = {
  greeting: 'Stampd'
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        greeting: action.payload.email
      };
    default:
      return state;
  }
};

export default globalReducer;

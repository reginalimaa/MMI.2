import { combineReducers } from "redux";

const initialState = {
  data: [], 
  loading: true,
};

const maquinasReducer = (state = initialState, action) => {
  switch (action.type){
    case 'ADD_DATA':
      return {
        ...state,
        data: action.payload,
      };

      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        }
        default:
          return state;
  }
};

const rootReducer = combineReducers({
  maquina: maquinasReducer,
});

export default rootReducer;
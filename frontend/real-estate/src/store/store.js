import { createStore } from 'redux';

const initialState = {
  rightPane: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_RIGHT_PANE':
      return { ...state, rightPane: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

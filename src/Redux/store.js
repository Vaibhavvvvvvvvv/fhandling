import { createStore } from 'redux';

const initialState = {
  tableData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        tableData: [...state.tableData, action.payload],
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;

import { combineReducers } from 'redux';

const createFilterReducer = (type) => {
  const TYPE = type.toUpperCase();
  const filter = (state = {}, action) => {
    switch (action.type) {
      case `FILTER_${TYPE}`:
        console.log(`filter ${TYPE}`);
        return { ...state, ...action.chipFilter };
      default:
        return state;
    }
  };

  return filter;
};

const filterChipsReducer = combineReducers({
  trending: createFilterReducer('trending'),
  controversial: createFilterReducer('controversial'),
  deepdive: createFilterReducer('deepdive'),
});

export default filterChipsReducer;

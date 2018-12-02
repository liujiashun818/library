import {QUERY} from './actionTypes.js';
const reducer = (state = {'queryHome': ''}, action = {}) => {
  const myState = {...state};
  switch (action.type)  {
    case QUERY:
    myState.queryHome = action.info;
    return myState;
    default:
    return state;
  }
}
export default reducer;

import { createStore, applyMiddleware, compose } from 'redux';
// import logger from 'redux-logger';
import reducers from './reducers.js';
import thunk from 'redux-thunk';
// import staticReducer from './reducers';

console.log('reducers',reducers)
// console.log('reducers typeof',typeof reducers)
// const reducers = function(){
// }
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
import {combineReducers} from 'redux';
import homeReducers from '../features/home/reducer.js';
// const reducers = { a: 1 };
// export const reducers = [{a:1}];

console.log('homeReducers',homeReducers)
const apps = [
  ...homeReducers
]

const params = {};
fillParams(apps);

export const reducers = combineReducers(params);
export default reducers

function fillParams(apps){
  // debugger
  apps.forEach(item => {
    params[item.stateKey] = item.reducer;
  })
}
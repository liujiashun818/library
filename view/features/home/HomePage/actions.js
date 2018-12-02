import {QUERY} from './actionTypes.js';
export const queryResult = (value) =>{
  return {
    'type': QUERY,
    'info': value
  }
}
export default {queryResult};
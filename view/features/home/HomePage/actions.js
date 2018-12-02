import {QUERY} from './actionTypes.js';
export const query = (value) =>{
  return {
    'type': QUERY,
    'info': value
  }
}
export default {query};
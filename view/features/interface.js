

import switchDomain from './switchDoman.js';

const {
  baseOrigin,
} = switchDomain.getBackEndIp();

// export const queryUrl = "../dist/a.json";
// export const queryUrl = baseOrigin + 'api/query/';
export const queryUrl = 'http://127.0.0.1:7001' + '/api/articles';
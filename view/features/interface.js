

import switchDomain from './switchDoman.js';

const {
  baseOrigin,
} = switchDomain.getBackEndIp();

export const queryUrl = "../../dist/a.json";
// export const queryUrl = baseOrigin + 'api/query/';
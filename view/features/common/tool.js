

export const obj2Arr = (obj, isEncode =false) => {

  obj = obj || {};
  let keys = Object.keys(obj);
  keys = keys.filter(item =>{
    return ![null,undefined, ''].includes(obj[item]);
  })
  const result = keys.map(item =>{
    return item + '=' + obj[item];
  })

  return result
}


export const getEnvType = () => {
  const hostname = window.location.hostname + '';
  let envir;
  if(hostname === 'gaogenxue.com' || hostname === 'prod'){
    // if(hostname === 'gaogenxue.com' || window.gladder.env === 'prod'){
      envir = '正式';
  } else if(hostname === '10.101.111.127' || hostname === '127.0.0.1'){
      envir = '日常';
  }else{
    envir = '日常';
  }
  return envir;
}
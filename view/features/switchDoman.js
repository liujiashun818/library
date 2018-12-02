
import {domain, domainDaily} from './common/domain.js';
import {getEnvType} from './common/tool.js';

const obj = {

  getBackEndIp(){
    let baseOrigin = domain;
    if(getEnvType() == '日常'){
        baseOrigin = domainDaily;
    }
    return {baseOrigin};
  }

  
}

export default obj;
import { message, Modal, notification } from 'antd';
import _ from 'underscore';

// 保存正在进行中的ajax请求
let requestArr = [];

const popCompleteRequest = url => {
  requestArr = requestArr.filter(record => {
    return String(record) !== String(url);
  });
};

const errorTip = (requestName, errorContent = '请求错误') => {
  Modal.error({
    title: requestName + '服务反馈',
    content: errorContent
  });
};

export const dao = ({
  url,
  dispatch,
  action,
  route,
  callback,
  dataObj,
  requestTitle = '请求',
  data = {},
  requestType = 'get',
  tip = true
}) => {
  const copy_url = url;

  const params = {
    userId: '1234',
    // userId: window.gladder.userInfo.workid,
    // userName: window.gladder.userInfo.name,
    userName: 'ljs'
  };

  data = { ...data, ...params };

  if (requestType === 'post') {
    url = copy_url;
    data = {
      ...data,
      userId: window.gladder.userInfo.workid,
      userName: window.gladder.userInfo.name
    };
  }

  // 当请求已经在进行中时，不会在发请求
  if (requestArr.includes(url)) return false;

  let hide = null;

  if (tip) {
    hide = message.loading(requestTitle + '   加载中', 1000);
    window.messageLoading = window.messageLoading ? window.messageLoading : [];
    window.messageLoading.push(hide);
  }

  let promise = null;
  promise = $.ajax({
    url: url,
    type: requestType,
    dataType: 'json',
    traditional: true,
    data: data,
    timeout: 50000,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    complete: (XMLHttpRequest, status) => {
      popCompleteRequest(url);
      if (status === 'timeout') {
        promise.abort(); // 超时后中断请求
        errorTip(requestTitle, '请求超时');
        dispatch ? dispatch(action([])) : '';
        callback ? callback(dispatch, dataObj) : '';
      }
    }
  });
  requestArr.push(url);
  promise
    .done(response => {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
      if (String(response.errorCode) === '0') {
        if (route) {
          location.href = location.origin + route;
        }
        dispatch ? dispatch(action(response.data)) : '';

        if (tip) {
          notification.open({
            message: requestTitle,
            description: response.msg,
            duration: 1.5
          });
        }
      } else {
        errorTip(requestTitle, response.msg);
        dispatch ? dispatch(action([])) : '';
      }

      callback ? callback(dispatch, dataObj, response) : '';
    })
    .fail(response => {
      dispatch ? dispatch(action([])) : '';
      errorTip(requestTitle, response.msg);
    })
    .always(() => {
      if (tip) {
        hide();
        window.messageLoading = window.messageLoading.filter(record => record !== hide);
      }
      popCompleteRequest(url);
    });
};

const debounceFunc = _.debounce(dao, 500);

export const daoServer = (url, dispatch, action, route, callback, dataObj) => {
  debounceFunc({ url, dispatch, action, route, callback, dataObj });
};

/**
 * @desc 参数为对象的时候，使用的数据请求服务
 * @param url
 * @param dispatch
 * @param action
 * @param route
 * @param callback
 * @param dataObj
 * @param debounceFlag {boolean} 是否使用延时请求
 */
export const daoServerOfParamsObj = ({
  url,
  dispatch,
  action,
  route = '',
  callback = '',
  data = {},
  dataObj = '',
  debounceFlag = true,
  requestTitle,
  tip = true
}) => {
  if (debounceFlag) {
    debounceFunc({ url, dispatch, action, route, data, callback, dataObj, requestTitle, tip });
  } else {
    dao({ url, dispatch, action, route, callback, data, dataObj, requestTitle, tip });
  }
};

export const daoServerOfParamsObjOfPost = ({
  url,
  dispatch,
  action,
  data = {},
  route = '',
  callback = '',
  dataObj = '',
  debounceFlag = true,
  requestTitle
}) => {
  if (debounceFlag) {
    debounceFunc({
      url,
      dispatch,
      action,
      route,
      callback,
      dataObj,
      requestTitle,
      data,
      requestType: 'post'
    });
  } else {
    dao({
      url,
      dispatch,
      action,
      route,
      callback,
      dataObj,
      requestTitle,
      data,
      requestType: 'post'
    });
  }
};

export default daoServer;
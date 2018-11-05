import $ from 'jquery';

import React from 'react';
import imgSrc from './includes/default.jpeg';

export default class Root extends React.Component {
  componentDidMount() {
    $('#name').css('font-size', '40px');
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 id="name">孔云ddd丽</h1>
        <p id="imgStyle"><img src={imgSrc} alt="" /></p>
      </div>);
  }
}

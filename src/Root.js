import $ from 'jquery';

import React from 'react';
import RainyDay from './commonfun/rainyday';
import imgUrl from './includes/default.jpg';

export default class Root extends React.Component {
  componentDidMount() {
    function run() {
      const image = document.getElementById('background');
      image.onload = function () {
        const engine = new RainyDay({
          image: this,
        });
        engine.rain([[3, 2, 2]], 100);
      };
      image.crossOrigin = 'anonymous';
      image.src = imgUrl;
    }
    run();
  }
  render() {
    const width100 = {
      width: '100%',
      height: '100%'
    }
    return (
      <img id="background" alt="backgroundliujiashun" src="" style={width100} />
    );
  }
}

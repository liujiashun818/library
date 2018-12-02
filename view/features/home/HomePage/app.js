
import React from 'react';

export default class HomePage extends React.Component {
  
  componentDidMount(){
    let num = {
      num: 1
    }
    this.props.query(num);
  }
  render() {
    return (
        <div>
          HomePage 
        </div>
      
    );
  }
}
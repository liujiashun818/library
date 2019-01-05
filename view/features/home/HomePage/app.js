
import React from 'react';

export default class HomePage extends React.Component {
  
  componentDidMount(){
    let num = {
      username: "15801523928",	
      password:"1234",
      email:"12345@qq.com"
    }
    this.props.query(num);
  }
  render() {
    console.log('this.props',this.props);
    return (
        <div>
          HomePage 
        </div>
      
    );
  }
}
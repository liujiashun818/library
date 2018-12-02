import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import './App.less';
import { Link } from 'react-router-dom';
import { domaList } from '../../untils/domanList'; 
// import MenuItem from 'antd/lib/menu/MenuItem';

 export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menus: domaList,
        }
    }
    getMenuDom(){
      console.log('domaList',domaList)
      // debugger;
      if(this.state.menus.length>0){
         const menus = this.state.menus.map(m => {
           let aa = [];
           if (m.subMenus.length>0){
            m.subMenus.forEach(sb=>{   
              aa.push(
                <Menu.Item key={sb.key}>
                   <Link to={sb.url}>{sb.title}</Link>
                </Menu.Item>   
              )     
                          
             })
           };
           return (
             <SubMenu key={m.key} title={m.title}>
                 {aa}
             </SubMenu>
           )
         });
         console.log('menus', menus)
         return menus;
      } else{
        return <span/>
      }

    }
    render() {
      console.log('this.props.children',this.props);
        return(
            <Layout>
            <Header className="header">
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                 {this.getMenuDom()}
                 {/* <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
              
                </SubMenu> */}
                  {/* <SubMenu key={m.key} title={m.title}>
                    <MenuItem key={sb.key}>
                      <Link to='/'>{sb.title}</Link>
                    </MenuItem>  
                  </SubMenu> */}



                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )
    }
}

     
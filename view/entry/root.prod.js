import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

function getRouteConfig(Container, routes, contextPath) {
    console.log('routesConfig',routes)
    // Resolve route config object in React Router v3.
    const children = []; // children component list
    const renderRoute = (item, routeContextPath) => {
    
      let newContextPath;
      if (/^\//.test(item.path)) {
        newContextPath = item.path;
      } else {
        newContextPath = `${routeContextPath}/${item.path}`;
      }
      newContextPath = newContextPath.replace(/\/+/g, '/');
      if (item.component && item.childRoutes) {
        children.push(getRouteConfig(item.component, item.childRoutes, newContextPath));
      } else if (item.component) {
        children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />);
      } else if (item.childRoutes) {
        item.childRoutes.forEach(r => renderRoute(r, newContextPath));
      }
    };
  
    routes.forEach(item => renderRoute(item, contextPath));
    if (!Container) return <Switch>{children}</Switch>;
    return (   
        <Container key={contextPath}>
            <Switch>{children}</Switch>
        </Container>
    );
  }

export default class RootProd extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    
    //     }
    // }
    // static PropTypes = {
    //     store: PropTypes.object.isRequired,
    //     routeConfig: PropTypes.array.isRequired,
    // }
    render(){
        const children = getRouteConfig(null,this.props.routeConfig,'/')
        return (
          <Provider store={this.props.store}> 
                    <div>
                    <ConnectedRouter history={this.props.history}>
                              {children}
                    </ConnectedRouter>
                    </div>
          </Provider> 
        )
    }
}
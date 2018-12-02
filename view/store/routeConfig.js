
import App from '../containers/App/App';
import notFoundRoute from '../components/notFoundRoute';
import defaultPage from '../features/home/Default';
import HomePage from '../features/home/HomePage';
import homeRoute from '../features/home/route';

const childRoutes = [
  notFoundRoute,
  homeRoute,
]

const routes = [{
    path:'',
    component: App,
    childRoutes: [
        // ...childRoutes,
        { path: 'homePage',name: 'HomePage', component: HomePage},
        { path: 'defaultPage',name: 'default-page found', component: defaultPage},
        { path: 'not',name: 'page not found', component: notFoundRoute},
    ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}]

function handleIndexRoute (route) {
    // debugger;
    if(!route.childRoutes || !route.childRoutes.length){
        return;
    }
    const indexRoute = route.childRoutes.find(child => child.isIndex);
    if(indexRoute){
        const first = { ...indexRoute };
        first.path = route.path;
        first.extact = true;
        first.autoIndexRoute = true;
        route.childRoutes.unshift(first);
    }
    route.childRoutes.forEach(handleIndexRoute);
}
routes.forEach(handleIndexRoute)
export default routes;
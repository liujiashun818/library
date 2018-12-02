// import {
//     //  DefaultLPage,
//       HomePage 
//     } from './';
    import HomePage from './HomePage/index.js'
export default {
    path: '/',
    name: 'homePage',
    childRoutes: [
        {path: 'homePage', name: 'HomePage', components: HomePage, isIndex: true},
        // {path: 'defaultPage', name: 'Default', components: DefaultLPage, isIndex: true}
    ]
}
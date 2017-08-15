import {createStore,applyMiddleware,compose} from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers/index.js'


import {persistStore, autoRehydrate} from 'redux-persist'





//Step 1: Create store
const middleware=applyMiddleware(thunk,logger)
const store = createStore(reducers,undefined,compose(
	middleware,
	autoRehydrate()
	)
)



persistStore(store)


//REACT RENDER COMPONENTS
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import {Router,Route,IndexRoute,browserHistory,hashHistory} from 'react-router'

import Main from './main.js'
import GoogleApiWrapper from './components/pages/map.js'
import MasjidForm from './components/pages/masjidForm.js'
// import Menu from './components/pages/menu.js'
// import Footer from './components/pages/footer.js'
render(

	<Provider store={store}>
		<Router history = {browserHistory}>
			<Route path='/' > 
				<IndexRoute component = {Main} />
				<Route path='/new' component = {MasjidForm} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
	)
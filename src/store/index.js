import {applyMiddleware, createStore, compose} from 'redux' 
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../redux/reducers'
import rootSaga from '../redux/sagas'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware, logger, thunk]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = {...createStore(rootReducer, preloadedState, composedEnhancers), runSaga: sagaMiddleware.run}
  store.runSaga(rootSaga)

  return store
}


// import { applyMiddleware, compose, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import logger from 'redux-logger'

// import rootReducer from '../redux/reducers'

// export default function configureStore(preloadedState) {
//   const middlewares = [logger, thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)
//   const composedEnhancers = compose(middlewareEnhancer)

//   const store = createStore(rootReducer, preloadedState, composedEnhancers)

//   return store
// }

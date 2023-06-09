import {legacy_createStore,applyMiddleware} from 'redux'
import thunk from "redux-thunk"
import logger from 'redux-logger'
import reducer from './reducer/reducer'


const store = legacy_createStore(reducer,applyMiddleware(thunk))

export default store
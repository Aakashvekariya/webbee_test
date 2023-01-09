import { combineReducers } from 'redux'
import machineMgt from './machineMgt'
import activityIndicator from './activityIndicator'

const rootReducer = combineReducers({
  machineMgt,
  activityIndicator,
})

export default rootReducer

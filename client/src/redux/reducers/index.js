import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import status from './statusReducer'
import socket from './socketReducer'
import message from './messageReducer'
import online from './onlineReducer'
import peer from './peerReducer'


export default combineReducers({
    auth,
    alert,
    theme,
    status,
    socket,
    message,
    online,
    peer
})
import { useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'
import Login from './pages/login'
import Register from './pages/register'
import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'
import Peer from 'peerjs'

function App() {
  const { auth, status, modal } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })
    
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  },[dispatch])


  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {auth.token && <SocketClient />}
          
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
          
        </div>
      </div>
    </Router>
  );
}

export default App;

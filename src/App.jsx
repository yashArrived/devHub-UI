import { BrowserRouter, Routes,Route } from "react-router-dom"

import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Chat from "./components/Chat"


function App() {
 

  return (
    <>
     <Provider store={appStore}>
    <BrowserRouter basename="/">  
    {/* all routing with be relative to '/' */}
    <Routes>
      <Route path="/" element={<Body/>}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/connections" element={<Connections/>}/>
          <Route path="/requests" element={<Requests/>}/>
          <Route path="/chat/:targetUserId" element={<Chat/>}/>
      </Route>   
    </Routes>
    

    </BrowserRouter>
    </Provider>


      
    </>
  )
}

export default App

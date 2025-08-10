import { useState } from 'react'
// import NavBar from './NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'

function App() {
  

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<Body/>}>   {/*creating various routes inside this route*/}
              <Route path="/" element={<Feed />} />         {/* children routes */}
              <Route path="/login" element={<Login />} />         {/* children routes */}
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App

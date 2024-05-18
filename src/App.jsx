import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import StudentList from './Components/StudentList/StudentList'
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  return (
<Router>
  <Routes>
    <Route>
      <Route path='/' element={<StudentList/>}/>
    </Route>
  </Routes>
</Router>
      

  )
}

export default App
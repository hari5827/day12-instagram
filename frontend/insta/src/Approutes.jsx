import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/register'
import Feed from './features/posts/pages/post'


function AppRoutes(){
   return(
      <BrowserRouter>
      <Routes>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/' element={<Feed/>}/>
      </Routes>
      </BrowserRouter>
   )
}
export default AppRoutes
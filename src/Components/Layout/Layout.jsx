import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';



function Layout() {
  return (
   <>
   <Navbar/>
   <div className='mx-auto w-3/4  p-5 my-5'>
   <Outlet/>
   </div>
   </>
  )
}

export default Layout

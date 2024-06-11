import React from 'react'
import { ListStudents } from './components/ListStudent';
import Top from './components/Top';
function Layout() {
  return (
  <div 
  className='  flex bg-gray-300 h-screen w-screen flex-col  items-center'
  >
    <Top/>
      <ListStudents/> 
</div>
    );


}

export default Layout;

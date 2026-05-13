'use client'

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer';


function About(){

    return (<>
      {/* <div className=' w-full bg-black  h-auto flex items-center justify-between mb-2' > */}
     { <Navbar /> }
     <div className='mt-20 h-80 w-full bg-white '>
  <h1>Java</h1>

     </div>
      
     
    
     <Footer /> 
     {/* </div> */}
     
     
    </>)
}

export default About;
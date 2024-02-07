import React from 'react'
import { Navigate } from 'react-router-dom';
function ProtectedRoute({children}) {
return (
<div className='layout p-1 '>
<div className='header bg-primary flex justify-between p-2'>
<div>
<h1 className="text-2xl text-white">
Movie Reservation System
</h1>
<i className="ri-movie-2-line "></i>
</div>
</div>
<div className="content mt-1 p-1">
<h1 className='text-sm underline'
onClick={()=>{
Navigate("/movies")
}
}
>{children}</h1>
</div>
</div>
);
}
export default ProtectedRoute
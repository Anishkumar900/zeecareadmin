import React, { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { TbArrowsCross } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './Mobilebar.css';

export default function Mobilebar() {
  const navigate = useNavigate();
  const [baropen, setBaropen] = useState(false);

  const logout = () => {
    localStorage.removeItem('zeecareadmin');
    navigate('/adminlogin');
  };

  
  return (
    <div className='fixed top-0 right-0 w-full bg-blue-800 lg:hidden px-6 py-3 z-10'>
      {
        baropen ? (
          <TbArrowsCross
            size={28}
            color='white'
            onClick={() => setBaropen(false)}
            aria-label="Close menu"
          />
        ) : (
          <FaBarsStaggered
            size={28}
            color='white'
            onClick={() => setBaropen(true)}
            aria-label="Open menu"
          />
        )
      }

      <div className={`mt-2 mobile-menu ${baropen ? 'open' : ''}`}>
        <ul>
          <li className='mb-2 mt-2 font-bold text-xl  '>
            <Link to='/' className='text-white mx-auto'>Home</Link>
          </li>
          <li className='mb-2 font-bold text-xl'>
            <Link to='/doctor' className='text-white'>Doctor Details</Link>
          </li>
          <li className='mb-2 font-bold text-xl'>
            <Link to='/user' className='text-white'>User Details</Link>
          </li>
          <li className='mb-2 font-bold text-xl'>
            <Link to='/doctoradd' className='text-white'>Add Doctor</Link>
          </li>
          <li className='mb-2 font-bold text-xl'>
            <Link to='/message' className='text-white'>Message</Link>
          </li>
          <li className='mb-2 font-bold text-xl'>
            <Link to='adminlogin' onClick={logout} className='text-white'>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}











































// import React, { useState } from 'react';
// import { FaBarsStaggered } from "react-icons/fa6";
// import { TbArrowsCross } from "react-icons/tb";
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import './Mobilebar.css';

// export default function Mobilebar() {
//   const navigate = useNavigate();
//   const [baropen, setBaropen] = useState(false);

//   const logout = () => {
//     localStorage.removeItem('zeecareadmin');
//     navigate('/adminlogin');
//   };

//   return (
//     <>
//       <div className='fixed top-0 right-0 w-full bg-blue-800 lg:hidden px-6 py-2 z-10'>
//         {
//           baropen ? (<TbArrowsCross
//             size={28}
//             color='white'
//             onClick={() => setBaropen(false)}
//             aria-label="Close menu"
//           />) :
//             (
//               <FaBarsStaggered
//                 size={28}
//                 color='white'
//                 onClick={() => setBaropen(true)}
//                 aria-label="Open menu"
//               />
//             )
//         }

//         {
//           baropen &&
//           <div className={`mt-3 mobile-menu ${baropen ? 'open' : ''}`}>
//             <ul>
//               <li className='mb-2'>
//                 <Link to='/' className='text-white mx-auto'>Home</Link>
//               </li>
//               <li className='mb-2'>
//                 <Link to='/doctor' className='text-white'>Doctor Details</Link>
//               </li>
//               <li className='mb-2'>
//                 <Link to='/user' className='text-white'>User Details</Link>
//               </li>
//               <li className='mb-2'>
//                 <Link to='/doctoradd' className='text-white'>Add Doctor</Link>
//               </li>
//               <li className='mb-2'>
//                 <Link to='/message' className='text-white'>Message</Link>
//               </li>
//               <li className='mb-2'>
//                 <Link to='adminlogin' onClick={logout} className='text-white'>Logout</Link>
//               </li>
//             </ul>
//           </div>
//         }



//       </div>

//     </>
//   );
// }




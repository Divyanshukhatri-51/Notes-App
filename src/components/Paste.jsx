import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId))
  }

  return (
    <div className='sm:m-0'>
      <input 
      className='p-2 rounded-2xl md:min-w-[600px] w-[300px] mt-5 dark:bg-black bg-white border-1 border-black dark:border-white'
      type="search"
      placeholder='Search here'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5, md:w-[600px] w-[360px]'>
        {
          filteredData.length > 0 ? filteredData.map((paste) => {
            return (
            <div className='border-1 border-black dark:bg-black dark:border-white bg-white mt-3 rounded-2xl'>
              <div>
                <h1 className='text-xl font-bold'>{paste.title}</h1>
              </div>
              <div>
                {paste.content.length > 150 ? paste.content.slice(1,120) + "..." :paste.content}
              </div>
              <div className='flex flex-row gap-4 place-content-evenly p-3'>
                <button>
                  <NavLink to={`/?pasteId=${paste?._id}`}>
                    Edit
                  </NavLink>
                </button>
                <button>
                  <NavLink to={`/pastes/:${paste?._id}`}>
                    View
                  </NavLink>
                </button>
                <button onClick={() => handleDelete(paste?._id)}>
                  Delete
                  <Toaster />
                </button>
                <button onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success('Copied to clipboard',
                  {position: "top-left"})
                }}>copy
                <Toaster />
                </button>
              </div>
            </div>
            ) 
          })
          : <div className="flex mt-3">
            <h2 className="text-3xl mr-3">Go to Home</h2>
            <button style={{background:"gray",color:"black"}}><NavLink to='/'>Create Note</NavLink></button>
          </div>
        }
      </div>
    </div>
  )
}

export default Paste

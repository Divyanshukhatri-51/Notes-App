import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

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
      className='p-2 rounded-2xl md:min-w-[600px] sm:w-[300px] bg-black mt-5'
      type="search"
      placeholder='Search here'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5, md:w-[600px] sm:w-[300px]'>
        {
          filteredData.length > 0 && filteredData.map((paste) => {
            return (
            <div className='border-2 bg-black mt-3 rounded-2xl'>
              <div>
                {paste.title}
              </div>
              <div>
                {paste.content}
              </div>
              <div className='flex flex-row gap-4 place-content-evenly p-3'>
                <button>
                  <a href={`/?pasteId=${paste?._id}`}>
                    Edit
                  </a>
                </button>
                <button>
                  <a href={`pastes/:${paste?._id}`}>
                  View
                  </a>
                </button>
                <button onClick={() => handleDelete(paste?._id)}>
                  Delete
                </button>
                <button onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success('Copied to clipboard')
                }}>copy
                </button>
              </div>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Paste

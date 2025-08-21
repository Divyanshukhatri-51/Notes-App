import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ViewPaste = () => {
  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes)

  const paste = allPastes.find((p) => ":"+p._id === id);
  // console.log(pastes.title)
  
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input 
        className='p-2 rounded-2xl mt-2, lg:w-[700px] sm:w-[500px] dark:bg-black bg-white border-2 dark:border-white'
        type="text" 
        placeholder="Enter title here"
        disabled
        value={paste.title || ""}
        />
      </div>
      <div className="mt-5">
        <textarea className='rounded-2xl mt-4 lg:w-[700px] md:w-[500px] sm:w-[350px] p-4 dark:bg-black bg-white border-2 dark:border-white'
        value={paste.content || ""}
        placeholder='Enter content here'
        disabled
        rows={10}
        ></textarea>
      </div>
    </div>
  )
}

export default ViewPaste

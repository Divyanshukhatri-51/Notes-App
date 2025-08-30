import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { addToPaste, updateToPaste } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [title,setTitle] = useState('');
  const [value,setValue] = useState('');
  const [searchParams,setSearchParams] = useSearchParams()
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
      if(pasteId) {
        const paste = allPastes.find((p) => p._id === pasteId)
        setTitle(paste.title)
        setValue(paste.content);
      }
    },[pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createAt:new Date().toISOString(),
    }


    if(pasteId) {
      //update
      dispatch(updateToPaste(paste));
    }
    else {
      //create
      if(paste.content == "" || paste.title == ""){
        toast.error("Title OR Content is missing", {position: 'bottom-center'})
      }
      else {
        dispatch(addToPaste(paste));
      }
    }

    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});

  }

  return (
  <div className='dark:text-white text-black'>
      <div className='flex flex-row xl:gap-7 place-content-between'>
      <input 
        className='p-2 rounded-2xl mt-2 w-[70%] md:w-[76%] dark:bg-black bg-white border-1 dark:border-white'
        type="text"
        placeholder='Enter title here'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
       />

       <button onClick={createPaste} className='dark:bg-zinc-900 bg-gray-200 p-1 rounded-2xl mt-2 ml-2 sm:mx-[12px] sm:text-12'>
        {
          pasteId ? "update Paste" : "Create Paste"
        }
        <Toaster />
       </button>
    </div>
    <div className='mt-5'>
      <textarea 
        className='rounded-2xl mt-4 w-[320px] lg:w-[800px] sm:w-[500px] p-4 dark:bg-black bg-white border-1 dark:border-white'
        value={value}
        placeholder='Enter content here'
        onChange={(e) => setValue(e.target.value)}
        rows={15}
      />
    </div>
  </div>
  )
}

export default Home

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ViewPaste from './components/ViewPaste'
import Paste from './components/Paste'
import { useState, useEffect } from 'react'
import { BsMoonStarsFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar />
        <Paste />
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    },
  ]
);


function App() {
  const [theme,setTheme] = useState("dark");
  const manageTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark")
  }

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className='static'>
      <div className='flex w-10 mb-2 absolute right-4 p-3 rounded-full justify-between dark:bg-zinc-700 bg-gray-200'>  
        {
          theme == "dark" ?
          <MdWbSunny onClick={manageTheme}/>
          :<BsMoonStarsFill onClick={manageTheme}/>
        }
      </div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageSlider from './components/ImageSlider'
import PriceSelector from './components/PriceSelector'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start font-mono">

        <ImageSlider />
        <div className="w-full lg:w-1/2">
          <div className="container flex flex-col items-center gap-4 text-[#3c422e] mt-8">
            <div className="mb-2">
              <h1 className='mx-auto main-heading'>"The Duo"</h1>
              <h2 className='mx-auto main-heading'><u>Drizzle and Sizzle set</u></h2>
            </div>
            <div className="flex text-lg ">
              <div className="">
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>

              </div>
              <div className="ml-2 font-semibold">2361 Reviews</div>
            </div>
          </div>
          <div className="flex flex-col items-center md:w-2/3 lg:w-full xl:w-3/4 mx-auto">
            <PriceSelector />
          </div>
        </div>
      </div>
    </>
  )
}

export default App

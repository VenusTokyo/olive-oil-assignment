import React,{useState,useEffect} from 'react'
import image1 from '../assets/image1.webp'
import image2 from '../assets/image 2.webp'
import image3 from '../assets/image 3.webp'
import image4 from '../assets/image 4.webp'
import image5 from '../assets/image 5.webp'
import image6 from '../assets/image 6.webp'
const images=[
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
]
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      handleNext(); // Swipe Left
    }
    if (touchEnd - touchStart > 50) {
      handlePrev(); // Swipe Right
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    handleSwipe();
  }, [touchEnd]);
  return (
    <div className="w-full lg:w-1/2 lg:sticky lg:top-0 ">
      <div
        className="overflow-hidden aspect-4-5 lg:aspect-auto lg:h-full lg:object-cover"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setTouchEnd(touchEnd)}
      >
        <div
          className="whitespace-nowrap transition-transform h-full duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            // <div className='h-screen w-full m-0 p-0'>
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              draggable='false'
              className="inline-block object-cover h-full"
            />
            // </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="lg:absolute lg:bottom-16 lg:left-8 flex lg:flex-col justify-center">
        {images.map((image, index) => (
          <>
          <div
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`hidden lg:block w-[60px] h-[60px] rounded-full border-2 my-[5px] ${
              currentIndex === index ? ' border-white' : 'border-black'
            }`}
          >
            <img src={image} className='w-full h-full object-cover overflow-hidden rounded-full'></img>
          </div>
          <div 
          key={index}
          onClick={() => handleIndicatorClick(index)}
          className={`lg:hidden w-2 h-2 border rounded-full mt-3 border-black mx-1
            ${
              currentIndex === index ? ' bg-[#9eef80]' : 'bg-transparent'
            }`}>
            
          </div>
          </>


        ))}
      </div>
    </div>
  )
}

export default ImageSlider

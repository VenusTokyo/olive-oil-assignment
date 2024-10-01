import React,{useState, useCallback, useEffect} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
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

const NewSlider = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({loop:true})
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })
  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };
  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setCurrentIndex(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    emblaMainApi.on('select', onSelect);
    // Clean up the event listener when the component unmounts
    return () => {
      emblaMainApi.off('select', onSelect);
    };
  }, [emblaMainApi, onSelect]);

    const onThumbClick = useCallback(
      (index) => {
        if (!emblaMainApi || !emblaThumbsApi) return
        emblaMainApi.scrollTo(index)
      setCurrentIndex(index);

      },
      [emblaMainApi, emblaThumbsApi]
    )
  return (
    <>
    <div className="w-full lg:w-1/2 lg:sticky lg:top-0 ">

    <div className="embla" ref={emblaMainRef}>
      <div className="embla__container"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image,index)=>(
        <div className="embla__slide">
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className='object-cover h-full'
            //   className="inline-block object-cover h-full"
            />
        </div>
        ))}
        
      </div>
    </div>
    <div className="lg:absolute lg:bottom-16 lg:left-8 flex lg:flex-col justify-center" ref={emblaThumbsRef}>
        {images.map((image, index) => (
          <>
          <div
            key={index+'a'}
            // onClick={() => handleIndicatorClick(index)}
            onClick={() => onThumbClick(index)}
            className={`hidden lg:block w-[60px] h-[60px] rounded-full border-2 my-[5px] ${
              currentIndex === index ? ' border-white' : 'border-black'
            }`}
          >
            <img src={image} className='w-full h-full object-cover overflow-hidden rounded-full'></img>
          </div>
          <div 
          key={index}
          onClick={() => onThumbClick(index)}
          // onClick={() => handleIndicatorClick(index)}
          className={`lg:hidden w-2 h-2 border rounded-full mt-3 border-black mx-1
            ${
              currentIndex === index ? ' bg-[#9eef80]' : 'bg-transparent'
            }`}>
            
          </div>
          </>


        ))}
      </div>
    </div>

    </>

  )
}

export default NewSlider

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ActorCard from './ActorCard';
import { Actor } from '../types';

interface ActorSliderProps {
  actors: Actor[];
  title: string;
}

const ActorSlider: React.FC<ActorSliderProps> = ({ actors, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1536) {
        setItemsPerPage(7);
      } else if (window.innerWidth >= 1280) {
        setItemsPerPage(6);
      } else if (window.innerWidth >= 1024) {
        setItemsPerPage(5);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(2);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(actors.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < totalPages - 1 ? prevIndex + 1 : 0));
  };

  const getVisibleActors = () => {
    const startIndex = currentIndex * itemsPerPage;
    return actors.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
      <div className="relative px-4 py-8 md:px-8 lg:px-12">
        <h2 className="text-white text-3xl font-bold mb-8">{title}</h2>

        <div className="relative w-full overflow-hidden">
          <div
              ref={sliderRef}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-5 transition-all duration-500 ease-in-out min-h-[360px]"
          >

            {getVisibleActors().map((actor) => (
                <ActorCard key={actor.id} actor={actor}/>
            ))}
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <button
                onClick={handlePrev}
                className="bg-gray-800/80 hover:bg-gray-700 text-white rounded-full p-2 transition-all duration-300 focus:outline-none"
                aria-label="Previous actors"
            >
              <ChevronLeft size={24}/>
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <button
                onClick={handleNext}
                className="bg-gray-800/80 hover:bg-gray-700 text-white rounded-full p-2 transition-all duration-300 focus:outline-none"
                aria-label="Next actors"
            >
              <ChevronRight size={24}/>
            </button>
          </div>

        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({length: totalPages}).map((_, index) => (
              <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-white w-6' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
              />
          ))}
        </div>
      </div>
  );
};

export default ActorSlider;
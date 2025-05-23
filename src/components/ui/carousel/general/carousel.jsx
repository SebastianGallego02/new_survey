import React, { useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAutoplay } from '../carouselAutoPlay';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from '../carouseArrowButtons';
import { DotButton, useDotButton } from '../carouselDotButtons';

const Carousel = ({ slides, options }) => {
  const progressNode = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 })
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={
                'embla__dot' +
                (index === selectedIndex ? ' embla__dot--selected' : '')
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

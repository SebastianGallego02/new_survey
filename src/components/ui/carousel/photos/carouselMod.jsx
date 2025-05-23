import React, { useRef, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAutoplay } from '../carouselAutoPlay';
import { DotButton, useDotButton } from '../carouselDotButtons';




const Carousel = ({ slides, options }) => {
  // Initialize autoplay plugins with proper configuration
  const autoplayOptions = { delay: 3000, stopOnInteraction: false };
  const autoplayPlugin1 = useRef(Autoplay(autoplayOptions));
  const autoplayPlugin2 = useRef(Autoplay(autoplayOptions));

  // Initialize carousels with plugins
  const [emblaRef1, emblaApi1] = useEmblaCarousel(options, [
    autoplayPlugin1.current
  ]);
  const [emblaRef2, emblaApi2] = useEmblaCarousel(options, [
    autoplayPlugin2.current
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi1);
  const { autoplayIsPlaying, toggleAutoplay } = useAutoplay(emblaApi1);

  // Sync carousels
  useEffect(() => {
    if (!emblaApi1 || !emblaApi2) return;

    const sync1to2 = () => {
      if (emblaApi2) {
        emblaApi2.scrollTo(emblaApi1.selectedScrollSnap());
      }
    };
    
    const sync2to1 = () => {
      if (emblaApi1) {
        emblaApi1.scrollTo(emblaApi2.selectedScrollSnap());
      }
    };

    emblaApi1.on('select', sync1to2);
    emblaApi2.on('select', sync2to1);

    return () => {
      emblaApi1.off('select', sync1to2);
      emblaApi2.off('select', sync2to1);
    };
  }, [emblaApi1, emblaApi2]);

  // Initialize carousels
  useEffect(() => {
    if (!emblaApi1 || !emblaApi2) return;

    // Reset to first slide
    emblaApi1.scrollTo(0);
    emblaApi2.scrollTo(0);

    // Start autoplay safely
    try {
      const auto1 = emblaApi1.plugins()?.autoplay;
      const auto2 = emblaApi2.plugins()?.autoplay;
      
      if (auto1 && typeof auto1.play === 'function') auto1.play();
      if (auto2 && typeof auto2.play === 'function') auto2.play();
    } catch (error) {
      console.error('Autoplay initialization error:', error);
    }

    return () => {
      // Cleanup autoplay
      emblaApi1.plugins()?.autoplay?.stop();
      emblaApi2.plugins()?.autoplay?.stop();
    };
  }, [emblaApi1, emblaApi2]);

  // Ensure slides is an array
  const safeSlides = Array.isArray(slides) ? slides : [];

  return (
    <div className="dual-carousel-container">
      {[emblaRef1, emblaRef2].map((ref, i) => (
        <div className="embla" key={i}>
          <div className="embla__viewport" ref={ref}>
            <div className="embla__container">
              {safeSlides.map((slide, index) => (
                <div className="embla__slide_photo" key={index}>
                  <div className="embla__slide__number_photo">
                    <span>{index + 1}</span>
                    {/* Add your slide content here */}
                    {typeof slide === 'object' ? slide.content : slide}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="embla__controls_photo">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => {
                onDotButtonClick(index);
                emblaApi1?.scrollTo(index);
                emblaApi2?.scrollTo(index);
              }}
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
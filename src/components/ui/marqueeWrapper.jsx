import React from 'react';

export const MarqueeWrapper = ({
  children,
  speed = 'normal',
  direction = 'left'
}) => {
  const speedClasses = {
    slow: 'animate-[marquee_40s_linear_infinite]',
    normal: 'animate-[marquee_25s_linear_infinite]',
    fast: 'animate-[marquee_15s_linear_infinite]'
  };

  const directionStyles = {
    left: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
    right: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0%)' } }
  };

  return (
    <div className="relative w-full overflow-hidden py-4 group">
      <div 
        className={`whitespace-nowrap will-change-transform ${speedClasses[speed]}`}
        style={{ 
            '--marquee-animation': directionStyles[direction]
        }}
      >
        {children}
        <div className="inline-block" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
import { useState, useRef } from 'react';

/* -- useDelayedHoverEffect hook --

  used for a delayed firing of the useState hook to 
  trigger a boolean change. 
  
  Ex. Useful for a small delay in the display of a tooltip
  when hovering over some text.

*/
const useDelayedHoverEffect = () => {
  const [active, setActive] = useState(false);
  const timeoutId = useRef(null);

  const handleMouseEnter = () => {
    timeoutId.current = setTimeout(() => {
      setActive(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId.current);
    setActive(false);
  };

  return { active, handleMouseEnter, handleMouseLeave };
};

export default useDelayedHoverEffect;

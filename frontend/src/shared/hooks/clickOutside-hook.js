import { useRef, useCallback, useState, useEffect } from 'react';

/* 
hook to handle click outside event for containers

returns - ref, handleClickInside function, clickOutside boolean
          toggleClickInside function
*/

const useClickOutside = () => {
  const containerRef = useRef();
  const [clickOutside, setClickOutside] = useState(true);

  const handleClickInside = () => {
    setClickOutside(false);
  };

  const toggleClickInside = () => {
    setClickOutside(prev => !prev);
  };

  const handleClickOutside = useCallback(
    event => {
      const target = event.target;
      if (containerRef.current && containerRef.current.contains(target)) {
        return;
      }
      setClickOutside(true);
    },
    [setClickOutside]
  );

  useEffect(() => {
    if (!clickOutside) {
      document.addEventListener('click', handleClickOutside, false);
    } else {
      document.removeEventListener('click', handleClickOutside, false);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [clickOutside, handleClickOutside]);

  return { containerRef, handleClickInside, clickOutside, toggleClickInside };
};

export default useClickOutside;

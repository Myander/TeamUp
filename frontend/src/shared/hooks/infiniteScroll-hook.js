import { useEffect, useRef, useCallback } from 'react';

/* Hook to handle infinite scrolling
    Returns a ref to be placed in the target element.
    Calls the provided callback when the target element is intersecting the bottom of the screen.
*/
const useInfiniteScroll = cb => {
  const targetRef = useRef(null);

  const handleIntersect = useCallback(
    entries => {
      const target = entries[0];

      if (target.isIntersecting) {
        cb();
      }
    },
    [cb]
  );

  useEffect(() => {
    console.log('useEffect fired!');
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    let observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(targetRef.current);
    const tRef = targetRef.current;

    return () => observer.unobserve(tRef);
  }, [targetRef, handleIntersect]);

  return { targetRef };
};

export default useInfiniteScroll;

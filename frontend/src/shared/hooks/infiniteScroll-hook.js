import { useEffect, useRef, useCallback } from 'react';

/* Hook to handle infinite scrolling
    returns a ref to be placed in target element
    calls the provided callback when the target element is intersecting the bottom of the screen.
*/
const useInfiniteScroll = cb => {
  const targetRef = useRef();

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
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    let observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(targetRef.current);
    const tRef = targetRef.current;
    return () => observer.unobserve(tRef);
  }, [targetRef, cb, handleIntersect]);

  return { targetRef };
};

export default useInfiniteScroll;

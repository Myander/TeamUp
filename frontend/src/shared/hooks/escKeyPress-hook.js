import { useCallback, useEffect } from 'react';

/* 
 hook to handle esc key press

 parameters: cb - callback function to call on esc key press
             open - boolean used to add or remove event listener
*/

const useEscKeyPress = (cb, open) => {
  const escFunction = useCallback(
    event => {
      if (event.keyCode === 27) {
        // callback to execute when key pressed
        if (cb) {
          cb();
        }
      }
    },
    [cb]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', escFunction);
    } else {
      document.removeEventListener('keydown', escFunction);
    }

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction, open]);
};

export default useEscKeyPress;

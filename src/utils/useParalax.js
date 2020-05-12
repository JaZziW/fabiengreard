import { useState, useCallback, useLayoutEffect } from 'react';

const useParalax = () => {
  const [scrollPos, setScrollPos] = useState([0, 0]);

  const onScroll = useCallback(
    e =>
      setScrollPos([e.currentTarget.pageXOffset, e.currentTarget.pageYOffset]),
    [setScrollPos],
  );

  useLayoutEffect(() => {
    if (window && window.document) {
      window.addEventListener('scroll', onScroll);
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return scrollPos;
};

export default useParalax;
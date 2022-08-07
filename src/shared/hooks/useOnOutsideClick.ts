import { RefObject, useEffect } from 'react';

export const useOnOutsideClick = (
  ref: RefObject<HTMLElement>,
  onClick: (event: MouseEvent) => void,
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        !(e.target instanceof Element) ||
        (e.target instanceof Element &&
          (!ref.current || ref.current.contains(e.target)))
      ) {
        return;
      }

      onClick(e);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref.current, onClick]);
};

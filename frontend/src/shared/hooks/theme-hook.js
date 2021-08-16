import { useEffect, useState } from 'react';

const useThemeChanger = () => {
  const [dark, setDark] = useState(null);

  const toggleTheme = () => {
    setDark(prev => {
      localStorage.setItem('theme', !prev === true ? 'dark' : 'light');
      return !prev;
    });
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return { toggleTheme };
};

export default useThemeChanger;

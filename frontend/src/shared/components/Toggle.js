import React from 'react';
import useThemeChanger from 'shared/hooks/theme-hook';

export const Toggle = () => {
  const { toggleTheme, dark } = useThemeChanger();

  return (
    <div className="ml-1">
      {/* <h2 className="dark:text-gray-50">light/dark</h2> */}
      <div
        className="appearance-none w-12 ml-2 h-7 bg-gray-400 dark:bg-gray-400 rounded-full flex-shrink-0 p-1"
        onClick={toggleTheme}
      >
        <input
          type="checkbox"
          className={`appearance-none cursor-pointer bg-white dark:bg-gray-600 w-5 h-5 rounded-full shadow-md transform ${
            dark ? 'translate-x-5' : ''
          } duration-300 ease-in-out`}
        />
      </div>
    </div>
  );
};

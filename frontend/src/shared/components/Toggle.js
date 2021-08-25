import React from 'react';
import useThemeChanger from 'shared/hooks/theme-hook';
// import './style.css';

// export const Toggle = () => {
//   const { toggleTheme } = useThemeChanger();

//   return (
//     <label className="switch">
//       <input type="checkbox" onChange={toggleTheme} />
//       <span className="slider round"></span>
//     </label>
//   );
// };

export const Toggle = () => {
  const { toggleTheme, dark } = useThemeChanger();

  return (
    <div className="flex justify-between items-center py-6">
      <h2 className="dark:text-gray-50">light/dark</h2>
      <div
        className="appearance-none w-16 ml-2 h-10 bg-gray-300 dark:bg-gray-400 rounded-full flex-shrink-0 p-1"
        onClick={toggleTheme}
      >
        <input
          type="checkbox"
          className={`appearance-none cursor-pointer bg-white dark:bg-gray-500 w-8 h-8 rounded-full shadow-md transform ${
            dark ? 'translate-x-6' : ''
          } duration-300 ease-in-out`}
        />
      </div>
    </div>
  );
};

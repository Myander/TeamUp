import React from 'react';

const PageContainer = props => {
  return (
    <div className="dark:bg-gray-900 min-h-screen pt-14">{props.children}</div>
  );
};

export default PageContainer;

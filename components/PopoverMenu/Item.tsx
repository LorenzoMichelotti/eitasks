import React, { Children, cloneElement, ReactNode } from "react";

export default function PopoverMenuItem({
  setIsOpen,
  children,
  callback,
}: {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  callback?: () => void;
}) {
  function handleClick() {
    if (setIsOpen) setIsOpen(false);
    if (callback) callback();
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 flex space-x-2 items-center text-left hover:bg-gray-200 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-800 focus:ring-2 outline-none ring-indigo-500 first:rounded-t-lg border-gray-700 border-b-[1px] last:border-b-0 last:rounded-b-lg"
    >
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            setIsOpen,
          });
        }
        return child;
      })}
    </button>
  );
}

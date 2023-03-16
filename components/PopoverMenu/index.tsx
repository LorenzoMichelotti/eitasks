import React from "react";
import { Children, ReactNode, useRef, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import useOutsideAlerter from "../../lib/useOutsideAlerter";

export default function PopoverMenu({ children }: { children?: ReactNode }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(menuRef, () => setIsOpen(false));

  return (
    <div ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
      >
        <TiThMenu></TiThMenu>
      </button>
      {isOpen && (
        <div className="animate-scale-in-tr overflow-clip absolute shadow-lg focus-within:ring-2 dark:ring-gray-700 top-10 right-0 flex flex-col w-32 dark:bg-gray-800 rounded-lg">
          {Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                setIsOpen,
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}

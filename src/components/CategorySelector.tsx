import React, { useState } from "react";

enum Type {
  Category,
  Accompaniments,
  Dietary,
}

interface TProps {
  headers: any[];
}

const CategorySelector = ({ headers }: TProps) => {
  const [selectedType, setSelectedType] = useState<Type>();

  return (
    <div className="mx-auto w-fit">
      <div className="btn-group-vertical mx-auto my-2 w-fit">
        <div className="btn-sm btn bg-primary normal-case text-primary-content">
          Category
        </div>
        <div className=" btn-sm btn bg-secondary normal-case text-primary-content">
          Accompaniments
        </div>
        <div className="btn-sm btn bg-info normal-case text-primary-content">
          Dietary
        </div>
      </div>
      <div className="mx-auto flex w-96 flex-wrap justify-center">
        {headers.map((header) => {
          return (
            <div
              key={header}
              className="btn-outline btn-sm btn mx-1 my-1 overflow-auto px-1 normal-case"
            >
              <div className="px-4">{header}</div>
              <div className="btn-error btn-square btn-xs btn mx-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;

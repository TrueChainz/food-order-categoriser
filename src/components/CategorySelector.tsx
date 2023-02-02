import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
enum Type {
  Category,
  Accompaniments,
  Dietary,
}

interface TProps {
  headers: any[];
  categories: any[];
  accompanimentHeader: any;
  dietaryHeader: any;
  setHeaders: any;
  setCategories: any;
  setAccompanimentHeader: any;
  setDietaryHeader: any;
}
const CategorySelector = ({
  headers,
  categories,
  accompanimentHeader,
  dietaryHeader,
  setHeaders,
  setCategories,
  setAccompanimentHeader,
  setDietaryHeader,
}: TProps) => {
  const [selectedType, setSelectedType] = useState<Type>();
  const [parent] = useAutoAnimate(/* optional config */);

  const handleSelect = (header: any) => {
    if (
      categories.includes(header) ||
      accompanimentHeader == header ||
      dietaryHeader == header
    ) {
      console.log("header already selected: ", header);
      return;
    }

    if (selectedType == Type.Category) {
      setCategories([...categories, header]);
    }
    if (selectedType == Type.Accompaniments) {
      setAccompanimentHeader(header);
    }
    if (selectedType == Type.Dietary) {
      setDietaryHeader(header);
    }
    console.log(header);
  };

  const handleDelete = (header: any) => {
    setHeaders((oldHeaders: any) => {
      console.log(oldHeaders);
      const newHeaders = oldHeaders.filter(
        (currHeader: any) => currHeader !== header
      );
      return newHeaders;
    });
  };
  const resetSelected = () => {
    setCategories([]);
    setAccompanimentHeader("");
    setDietaryHeader("");
  };
  return (
    <div className="mx-auto w-fit ">
      <div className="mx-auto my-2 flex ">
        <button
          className={`btn-sm btn bg-primary normal-case text-primary-content ${
            selectedType === Type.Category ? "btn-outline" : ""
          }`}
          onClick={() => setSelectedType(Type.Category)}
        >
          Category
        </button>
        <button
          className={`btn-sm btn mx-4  bg-secondary normal-case text-primary-content ${
            selectedType === Type.Accompaniments ? "btn-outline " : ""
          }`}
          onClick={() => setSelectedType(Type.Accompaniments)}
        >
          Accompaniments
        </button>
        <button
          className={`btn-sm btn bg-info normal-case text-primary-content ${
            selectedType === Type.Dietary ? "btn-outline" : ""
          }`}
          onClick={() => setSelectedType(Type.Dietary)}
        >
          Dietary
        </button>
      </div>
      <button
        className="btn-error btn-sm btn  w-full normal-case"
        onClick={resetSelected}
      >
        Reset
      </button>
      <div
        className="absolute bottom-1/3 left-0 mx-auto flex flex-wrap justify-center px-96"
        ref={parent}
      >
        {headers.map((header) => {
          let btnColor = "";
          if (categories.includes(header)) {
            btnColor = "bg-primary";
          }
          if (accompanimentHeader == header) {
            btnColor = "bg-secondary";
          }
          if (dietaryHeader == header) {
            btnColor = "bg-info";
          }
          return (
            <div
              key={header}
              className={`btn-outline btn-sm btn relative mx-1 my-1 overflow-hidden px-1 normal-case ${btnColor}`}
              onClick={() => handleSelect(header)}
            >
              <div className="pr-8">{header}</div>
              <div
                className="btn-error btn-square btn-xs btn absolute right-2 mx-0 hover:scale-125"
                onClick={() => handleDelete(header)}
              >
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

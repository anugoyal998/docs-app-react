import {Link} from "react-router-dom";
import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { uid } from "../../helper/uid";

const Content = () => {
  return (
    <>
      <div
        className="bg-gray-100 flex justify-center items-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="flex flex-col items-center">
          <p className="font-semibold text-xl">No Docs Found</p>
          <p className="flex items-center space-x-2 font-semibold">
            <span>Click on</span> <Btn text="text-2xl" />{" "}
            <span>to get started</span>
          </p>
        </div>
        <div className="absolute bottom-3 right-3">
          <Btn text="text-5xl" />
        </div>
      </div>
    </>
  );
};

export const Btn = ({ text }) => {
  return (
    <Link to={`/docs/${uid()}`}>
        <button>
          <BsPlusCircleFill className={`${text} animation hover:scale-110`} />
        </button>
    </Link>
  );
};

export default Content;

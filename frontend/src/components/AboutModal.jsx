import React, { useRef } from "react";


const AboutModal = ({ closeAbout }) => {

  return (
    <div
      onClick={closeAbout}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    >
      <div className="w-screen h-screen flex justify-center items-center align-center">
        <div
          className="border-2 bg-white flex flex-col text-center p-4 rounded-lg max-w-[80vw]"
        >
          <h2>About KiwiMart</h2>
          <br />
          <p>Kiwi Tech is a project built by a team of 3.</p>
          <p>
            The project is built on React for Frontend, Firebase for Backend,
            and TailwindCSS for styling.
          </p>
          <br />
          <a
            href="https://github.com/xche529/tech_store"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Repository Link
          </a>
          <hr />
          <h2>Contributors</h2>
          <div className="flex align-center justify-center items-center gap-1">
          <a
              href="https://github.com/xche529"
              target="_blank"
              rel="noreferrer" className="text-blue-500"
            >
              Tommy
            </a>{" "}
            <a
              href="https://github.com/y-sun311"
              target="_blank"
              rel="noreferrer" className="text-blue-500"
            >
              James
            </a>{" "}
            <a
              href="https://github.com/Ruotong-Betty-Zhang"
              target="_blank"
              rel="noreferrer" className="text-blue-500"
            >
             Betty
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
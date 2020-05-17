import React from "react";

function Nav() {
  return (
    <nav className="text-gray-600 flex w-full items-center">
      <div className="mr-8">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="114"
            height="23"
            viewBox="0 0 114 23"
          >
            <text
              id="true_positive"
              data-name="true positive"
              transform="translate(0 18)"
              fill="#2b6cb0"
              fontSize="20"
              fontFamily="ShareTechMono-Regular, Share Tech Mono"
              letterSpacing="-0.11em"
            >
              <tspan x="0" y="0">
                true positive
              </tspan>
            </text>
          </svg>
        </a>
      </div>
      <div className="flex justify-between w-full">
        <ul className="list-none flex">
          <li className="hover:text-gray-900 cursor-pointer mr-8">
            <a href="https://docs.truepositive.app">Docs</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

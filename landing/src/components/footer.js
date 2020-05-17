import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row pt-8 text-xs">
      <ul className="w-full mb-8 md:w-1/3 mr-20">
        <li className="text-gray-600">
          <a href="mailto:hi@truepositive.app">hi@truepositive.app</a>
        </li>
        <br />
        <li className="text-gray-600">
          If you have any questions or comments whatsoever, email us. We respond
          to every single email within 24 hours.
        </li>
      </ul>
      <ul className="w-1/2 md:w-1/3 lg:w-1/4 leading-loose flex justify-between">
        <li className="text-gray-600">
          <a href="https://docs.truepositive.app">Docs</a>
        </li>
        <li className="text-gray-600">
          <a href="https://docs.truepositive.app/blog/">Blog</a>
        </li>
        <li className="text-gray-600">
          <a href="https://twitter.com/TruePositiveApp">Twitter</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;

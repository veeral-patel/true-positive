import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/footer";
import Nav from "../components/nav";

function Page404() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | True Positive</title>
      </Helmet>
      <div className="antialiased px-16 py-8 bg-gray-200 w-screen h-screen">
        <Nav />
        <div className="my-16">
          <h1 className="uppercase text-gray-700 tracking-wider">
            Page not found
          </h1>
          <p className="mt-4">
            <a className="text-blue-700" href="/">
              Return to the home page.
            </a>
          </p>
        </div>
        <hr />
        <Footer />
      </div>
    </>
  );
}

export default Page404;

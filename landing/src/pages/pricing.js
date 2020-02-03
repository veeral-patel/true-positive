import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/footer";
import Nav from "../components/nav";

function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing | True Positive</title>
      </Helmet>
      <div className="antialiased px-16 pt-8 pb-24 bg-gray-200 w-full h-full">
        <Nav />
        <div class="mt-16 px-8">
          <p class="tracking-wider text-center text-2xl font-medium">Pricing</p>
          <div class="flex flex-col lg:flex-row mt-12 mb-10">
            <div class="border border-gray-400 px-6 py-6 w-full lg:w-1/2 lg:mr-12 rounded-lg mb-8">
              <p class="text-center">Starter</p>
              <p class="text-center mt-4 text-xl">Free</p>
              <p class="text-center text-gray-600 mt-2">
                For individuals, homelab users
              </p>
              <div class="mt-8">
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                  <span class="ml-3">Up to 5 users</span>
                </div>
                <div class="mt-4">
                  <FontAwesomeIcon icon={faCheck} />
                  <span class="ml-3">No credit card required</span>
                </div>
              </div>
            </div>
            <div class="border border-gray-400 border-t-8 px-6 py-6 w-full lg:w-1/2 rounded-lg mb-8">
              <p class="text-center">Team</p>
              <p class="text-center mt-4 text-xl">$15 per user/month</p>
              <p class="text-center text-gray-600 mt-2">
                For SOCs, consultancies, service providers, other teams
              </p>
              <div class="mt-8">
                <div>
                  <FontAwesomeIcon icon={faCheck} />
                  <span class="ml-3">Unlimited users</span>
                </div>
                <div class="mt-4">
                  <FontAwesomeIcon icon={faCheck} />
                  <span class="ml-3">Priority support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="my-16 px-32">
          <p class="tracking-wider text-center text-xl font-medium">FAQs</p>
          <div class="mt-8">
            <div>
              <p class="text-lg tracking-wide font-medium">
                How is True Positive delivered?
              </p>
              <p class="mt-4 text-gray-700">
                True Positive is closed source, web based, and delivered as a
                SaaS.
              </p>
              <p class="mt-4 text-gray-700">
                We don't have a self-hosted version at the moment. Please email
                us at{" "}
                <a class="text-blue-700" href="mailto:hi@truepositive.app">
                  hi@truepositive.app
                </a>{" "}
                if this is something you would like.
              </p>
            </div>
          </div>
          <div class="mt-16">
            <div>
              <p class="text-lg tracking-wide font-medium">
                As a student, can I get free access to the Team plan?
              </p>
              <p class="mt-4 text-gray-700">
                Yes! Email us at{" "}
                <a class="text-blue-700" href="mailto:hi@truepositive.app">
                  hi@truepositive.app
                </a>
                .
              </p>
            </div>
          </div>
        </div>
        <hr />
        <Footer />
      </div>
    </>
  );
}

export default Pricing;

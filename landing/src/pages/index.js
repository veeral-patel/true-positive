import classNames from "classnames";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Footer from "../components/footer";
import Nav from "../components/nav";

function IndexPage() {
  const [howItWorksVideo, setHowItWorksVideo] = useState("CREATE_A_CASE");
  const [caseTemplatesVideo, setCaseTemplatesVideo] = useState(
    "CREATE_TASK_TEMPLATES"
  );

  return (
    <>
      <Helmet>
        <title>
          True Positive | Case management for security investigations
        </title>
      </Helmet>
      <div className="antialiased px-16 py-8 bg-gray-200">
        <Nav />
        <div className="block lg:flex w-full mt-24 mb-32">
          <div className="w-full lg:w-2/5 md:mr-16 mb-8">
            <h1 className="text-3xl font-semibold text-blue-700">
              Modern case management for security investigations
            </h1>
            <p className="text-gray-600 mt-4 text-lg">
              Collaborate on malware infections, phishing emails, IDS alerts,
              insider abuse, and everything else.
            </p>
            <div className="flex">
              <a
                className="bg-blue-700 text-white px-3 py-2 cursor-pointer flex
                items-center mt-6 mr-4"
                href="https://forms.gle/59ahJWfGzNu4rT7v6"
              >
                Sign up
              </a>
              <a
                className="text-blue-700 border border-blue-700 px-3 py-2 cursor-pointer flex
              items-center mt-6 mr-4"
                href="https://docs.truepositive.app"
              >
                View docs
              </a>
            </div>
          </div>
          <div className="w-full lg:w-3/5">
            <img
              src="https://storage.googleapis.com/tp_landing_page_videos/one_case.png"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
        <hr />
        <div>
          <p className="uppercase font-extrabold text-blue-700 text-sm mt-8 tracking-widest text-center">
            How it works
          </p>
          <div className="flex flex-col-reverse lg:flex-row mt-12 mb-12">
            <div className="flex flex-col w-full lg:w-1/2">
              <div
                className={classNames({
                  "lg:mr-12": true,
                  "mb-8": true,
                  "hover:bg-gray-300": true,
                  "cursor-pointer": true,
                  "px-4": true,
                  "py-6": true,
                  "rounded-lg": true,
                  "bg-gray-300": howItWorksVideo === "CREATE_A_CASE"
                })}
                onClick={() => setHowItWorksVideo("CREATE_A_CASE")}
              >
                <p className="text-gray-800">1. Create a case</p>
                <p className="text-gray-600 text-sm mt-2">
                  A case collects all the information about an investigation.
                </p>
              </div>
              <div
                className={classNames({
                  "lg:mr-12": true,
                  "mb-8": true,
                  "hover:bg-gray-300": true,
                  "cursor-pointer": true,
                  "px-4": true,
                  "py-6": true,
                  "rounded-lg": true,
                  "bg-gray-300": howItWorksVideo === "ADD_TASKS"
                })}
                onClick={() => setHowItWorksVideo("ADD_TASKS")}
              >
                <p className="text-gray-800">2. Add tasks</p>
                <p className="text-gray-600 text-sm mt-2">
                  Divide work to complete into tasks, which you can assign and
                  comment on.
                </p>
              </div>
              <div
                className={classNames({
                  "lg:mr-12": true,
                  "mb-8": true,
                  "hover:bg-gray-300": true,
                  "cursor-pointer": true,
                  "px-4": true,
                  "py-6": true,
                  "rounded-lg": true,
                  "bg-gray-300": howItWorksVideo === "ADD_INDICATORS"
                })}
                onClick={() => setHowItWorksVideo("ADD_INDICATORS")}
              >
                <p className="text-gray-800">3. Add indicators</p>
                <p className="text-gray-600 text-sm mt-2">
                  Add indicators of compromise like IP addresses, domains, URLs,
                  and file hashes to your case.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mb-8">
              <video
                autoPlay
                loop
                playsinline
                muted
                className={classNames({
                  hidden: howItWorksVideo !== "CREATE_A_CASE",
                  "rounded-lg": true
                })}
              >
                <source src="https://storage.googleapis.com/tp_landing_page_videos/create_a_case.mp4" />
              </video>
              <video
                autoPlay
                loop
                playsinline
                muted
                className={classNames({
                  hidden: howItWorksVideo !== "ADD_TASKS",
                  "rounded-lg": true
                })}
              >
                <source src="https://storage.googleapis.com/tp_landing_page_videos/add_tasks.mp4" />
              </video>
              <video
                autoPlay
                loop
                playsinline
                muted
                className={classNames({
                  hidden: howItWorksVideo !== "ADD_INDICATORS",
                  "rounded-lg": true
                })}
              >
                <source src="https://storage.googleapis.com/tp_landing_page_videos/add_indicators.mp4" />
              </video>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <p className="uppercase font-extrabold text-blue-700 text-sm mt-8 tracking-widest text-center">
            <a href="https://docs.truepositive.app/docs/administer/case_templates">
              Case Templates
            </a>
          </p>
          <p className="text-center text-gray-600 mt-3">
            Standardize your organization's incident handling
          </p>
          <div className="flex flex-col lg:flex-row mt-12 mb-12">
            <div className="w-full lg:w-1/2">
              <video
                autoPlay
                loop
                playsinline
                muted
                className={classNames({
                  hidden: caseTemplatesVideo !== "CREATE_TASK_TEMPLATES",
                  "rounded-lg": true
                })}
              >
                <source src="https://storage.googleapis.com/tp_landing_page_videos/create_a_tt_video_ULE.mp4" />
              </video>
              <video
                autoPlay
                loop
                playsinline
                muted
                className={classNames({
                  hidden: caseTemplatesVideo !== "CREATE_A_CASE_TEMPLATE",
                  "rounded-lg": true
                })}
              >
                <source src="https://storage.googleapis.com/tp_landing_page_videos/creating_a_ct.mp4" />
              </video>
              <video
                autoPlay
                loop
                playsinline
                muted
                className={classNames({
                  hidden: caseTemplatesVideo !== "CREATE_A_CASE",
                  "rounded-lg": true
                })}
              >
                <source src="https://storage.googleapis.com/tp_landing_page_videos/create_a_case_from_a_ct_video_ULE.mp4" />
              </video>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 lg:ml-12 mt-12 lg:mt-0">
              <div
                className={classNames({
                  "mb-4": true,
                  "bg-gray-300": true,
                  "hover:bg-gray-300": true,
                  "cursor-pointer": true,
                  "px-4": true,
                  "py-6": true,
                  "rounded-lg": true,
                  "bg-gray-300": caseTemplatesVideo === "CREATE_TASK_TEMPLATES"
                })}
                onClick={() => setCaseTemplatesVideo("CREATE_TASK_TEMPLATES")}
              >
                <p className="text-gray-800">1. Create task templates</p>
                <p className="text-gray-600 text-sm mt-2">
                  Define a task template for each task to add to your case
                  template.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  This way, you can add the same task to multiple case
                  templates.
                </p>
              </div>
              <div
                className={classNames({
                  "mb-4": true,
                  "bg-gray-300": true,
                  "hover:bg-gray-300": true,
                  "cursor-pointer": true,
                  "px-4": true,
                  "py-6": true,
                  "rounded-lg": true,
                  "bg-gray-300": caseTemplatesVideo === "CREATE_A_CASE_TEMPLATE"
                })}
                onClick={() => setCaseTemplatesVideo("CREATE_A_CASE_TEMPLATE")}
              >
                <p className=" text-gray-800">2. Create a case template</p>
                <p className="text-gray-600 text-sm mt-2">
                  You can add, group, and reorder task templates in your case
                  template.
                </p>
              </div>
              <div
                className={classNames({
                  "mb-4": true,
                  "bg-gray-300": true,
                  "hover:bg-gray-300": true,
                  "cursor-pointer": true,
                  "px-4": true,
                  "py-6": true,
                  "rounded-lg": true,
                  "bg-gray-300": caseTemplatesVideo === "CREATE_A_CASE"
                })}
                onClick={() => setCaseTemplatesVideo("CREATE_A_CASE")}
              >
                <p className="text-gray-800">
                  3. Create a case from your template
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  It only takes one click.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <p className="uppercase font-extrabold text-blue-700 text-sm mt-8 tracking-widest text-center">
            Features
          </p>
          <div className="mt-12 flex flex-wrap justify-between">
            <div className="w-full lg:w-1/2 mb-8 px-6 pb-8">
              <video autoPlay loop playsinline muted className="rounded-lg">
                <source src="https://storage.googleapis.com/tp_landing_page_videos/customize_statuses_and_priorities.mp4" />
              </video>
              <p className="text-gray-800 mt-6">
                Customize statuses and priorities
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Edit the default set of case statuses and priorities to fit your
                org's workflow.
              </p>
              <p className="text-blue-700 text-sm mt-4 uppercase">
                <a href="https://docs.truepositive.app/docs/administer/customize_statuses_and_priorities">
                  Read more
                </a>
              </p>
            </div>
            <div className="w-full lg:w-1/2 mb-8 px-6 pb-8">
              <video autoPlay loop playsinline muted className="rounded-lg">
                <source src="https://storage.googleapis.com/tp_landing_page_videos/create_case_from_email_ULE_edited.mp4" />
              </video>
              <p className="text-gray-800 mt-6">Create cases from email</p>
              <p className="text-gray-600 text-sm mt-2">
                Easily create cases from emails sent to a corporate mailbox,
                like phishing@company.com.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Just generate a inbound address in the UI and forward emails
                from your mailbox to the inbound address.
              </p>
              <p className="text-blue-700 text-sm mt-4 uppercase">
                <a href="https://docs.truepositive.app/docs/integrations/create_cases_from_email">
                  Read more
                </a>
              </p>
            </div>
            <div className="w-full lg:w-1/2 mb-8 px-6 pb-8">
              <video autoPlay loop playsinline muted className="rounded-lg">
                <source src="https://storage.googleapis.com/tp_landing_page_videos/restrict_access_ULE.mp4" />
              </video>
              <p className="text-gray-800 mt-6">Restrict access to cases</p>
              <p className="text-gray-600 text-sm mt-2">
                Only users and groups who are members of a group can access it.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                You can grant either edit or view access to a case.
              </p>
              <p className="text-blue-700 text-sm mt-4 uppercase">
                <a href="https://docs.truepositive.app/docs/work_with_cases/restrict_access">
                  Read more
                </a>
              </p>
            </div>
            <div className="w-full lg:w-1/2 mb-8 px-6 pb-8">
              <video autoPlay loop playsinline muted className="rounded-lg">
                <source src="https://storage.googleapis.com/tp_landing_page_videos/using_the_api_ULE.mp4" />
              </video>
              <p className="text-gray-800 mt-6">GraphQL API</p>
              <p className="text-gray-600 text-sm mt-2">
                Everything you can do in the web console, you can do in our API.
                The console uses the same API that we expose to customers.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                We also have an{" "}
                <a
                  className="text-blue-700"
                  href="https://api.truepositive.app"
                >
                  interactive API playground
                </a>
                .
              </p>
              <p className="text-blue-700 text-sm mt-4 uppercase">
                <a href="https://docs.truepositive.app/docs/api/get_started">
                  Read more
                </a>
              </p>
            </div>
            <div className="w-full lg:w-1/2 mb-8 px-6 pb-8">
              <video autoPlay loop playsinline muted className="rounded-lg">
                <source src="https://storage.googleapis.com/tp_landing_page_videos/merging_cases_video.mp4" />
              </video>
              <p className="text-gray-800 mt-6">Merge Cases</p>
              <p className="text-gray-600 text-sm mt-2">
                Merge a case into another if you realize it's a duplicate.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                You can merge as many cases as you'd like into a case, and
                merging a case doesn't modify it at all.
              </p>
              <p className="text-blue-700 text-sm mt-4 uppercase">
                <a href="https://docs.truepositive.app/docs/work_with_cases/merge_cases">
                  Read more
                </a>
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

export default IndexPage;

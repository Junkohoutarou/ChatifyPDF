import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

export default function Signup() {
  return (
    <>
      <section className="position-relative bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[#F2F2F2]"></div>
        <div className="container-fluid relative">
          <div className="grid grid-cols-1">
            <div className="lg:col-span-4">
              <div className="flex flex-col min-h-screen md:px-12 py-12 px-3">
                <div className="text-center mx-auto">
                  <Link to="/index">
                    {/* <img src={logo_light} alt="" /> */}
                  </Link>
                </div>

                <div className="text-center my-auto">
                  <div className="w-full max-w-sm m-auto px-6 py-8 bg-white dark:bg-slate-900 rounded-md shadow-lg shadow-slate-500 dark:shadow-gray-800">
                    <div className="grid grid-cols-1">
                      <h5 className="mb-8 text-xl dark:text-white font-medium">
                        Signup
                      </h5>
                      <form className="text-start">
                        <div className="grid grid-cols-1">
                          <div className="mb-4">
                            <label
                              className="form-label font-medium"
                              htmlFor="RegisterName"
                            >
                              Your Name:
                            </label>
                            <input
                              id="RegisterName"
                              type="text"
                              className="form-input w-full py-2 px-3 h-10 bg-transparent border border-inherit dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded outline-none focus:border-violet-600/50 dark:focus:border-violet-600/50 focus:ring-0 mt-2"
                              placeholder="Harry"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              className="form-label font-medium"
                              htmlFor="LoginEmail"
                            >
                              Email Address:
                            </label>
                            <input
                              id="LoginEmail"
                              type="email"
                              className="form-input w-full py-2 px-3 h-10 bg-transparent border border-inherit dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded outline-none focus:border-violet-600/50 dark:focus:border-violet-600/50 focus:ring-0 mt-2"
                              placeholder="name@example.com"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              className="form-label font-medium"
                              htmlFor="LoginPassword"
                            >
                              Password:
                            </label>
                            <input
                              id="LoginPassword"
                              type="password"
                              className="form-input w-full py-2 px-3 h-10 bg-transparent border border-inherit dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded outline-none focus:border-violet-600/50 dark:focus:border-violet-600/50 focus:ring-0 mt-2"
                              placeholder="Password:"
                            />
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center w-full mb-0">
                              <input
                                className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-violet-600 focus:border-violet-300 focus:ring focus:ring-offset-0 focus:ring-violet-200 focus:ring-opacity-50 me-2"
                                type="checkbox"
                                value=""
                                id="AcceptT&C"
                              />
                              <label
                                className="form-check-label text-slate-400"
                                htmlFor="AcceptT&C"
                              >
                                I Accept{" "}
                                <Link to="" className="text-violet-600">
                                  Terms And Condition
                                </Link>
                              </label>
                            </div>
                          </div>

                          <div className="mb-4">
                            <Link
                              to=""
                              className="py-2 px-5 inline-block font-normal tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-md w-full"
                            >
                              Register
                            </Link>
                          </div>

                          <div className="text-center">
                            <span className="text-slate-400 me-2">
                              Already have an account ?{" "}
                            </span>{" "}
                            <Link
                              to="/login"
                              className="text-slate-950 dark:text-white font-bold"
                            >
                              {" "}
                              Sign in
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-white/80">
                    © {new Date().getFullYear()} Sun*_Hackathon for Students 2023{" "}
                    <i className="mdi mdi-heart text-red-700"></i> by{" "}
                    <Link
                      to=""
                      target="_blank"
                      className="text-reset"
                    >
                      Sun-asterisk
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-3 end-3">
        <Link
          to=""
          className="back-button h-9 w-9 inline-flex items-center text-center justify-center text-base font-normal tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"
        >
          <ArrowLeft className="h-4 w-4"></ArrowLeft>
        </Link>
      </div>
    </>
  );
}

import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase/firebase.config.jsx";
import SignOut from "./signOutGG.jsx";
function SignInGG() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((result) => {
      const { user } = result;
      setUser(user);
      localStorage.setItem("email", user.email);
      localStorage.setItem("displayName", user.displayName);
      localStorage.setItem("photoURL", user.photoURL); // Lưu photoURL vào localStorage
      navigate("/home");
    });
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail && user) {
      setUser({ ...user, email: userEmail });
    }
  }, [user]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Flowbite
          </a> */}
          <div className="w-[512px] bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome back
              </h1>

              <div className="signInButton flex justify-between">
                {user ? (
                  <>
                    <p>Email: {user.email}</p>
                    {user.displayName && <p>Name: {user.displayName}</p>}
                    <SignOut setUser={setUser} />
                  </>
                ) : (
                  <button
                    type="submit"
                    className="w-fit outline outline-[#9ca3af38] text-black bg-transparent hover:bg-[#4285F4] hover:text-white outline-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-500"
                    onClick={handleClick}
                  >
                    <span className="flex items-center px-2">
                      <div className="bg-white rounded-full mr-1 p-1">
                        {/* <img
                          className=""
                          width={"20px"}
                          src="../../../src/assets/ggicon.svg"
                          alt=""
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 48 48"
                        >
                          <defs>
                            <path
                              id="a"
                              d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                            />
                          </defs>
                          <clipPath id="b">
                            <use xlinkHref="#a" overflow="visible" />
                          </clipPath>
                          <path
                            clip-path="url(#b)"
                            fill="#FBBC05"
                            d="M0 37V11l17 13z"
                          />
                          <path
                            clip-path="url(#b)"
                            fill="#EA4335"
                            d="M0 11l17 13 7-6.1L48 14V0H0z"
                          />
                          <path
                            clip-path="url(#b)"
                            fill="#34A853"
                            d="M0 37l30-23 7.9 1L48 0v48H0z"
                          />
                          <path
                            clip-path="url(#b)"
                            fill="#4285F4"
                            d="M48 48L17 24l-4-3 35-10z"
                          />
                        </svg>
                      </div>
                      <p className=" ">Login in with Google</p>
                    </span>
                  </button>
                )}

                <button className="appleSign w-fit outline outline-[#9ca3af38] text-black bg-transparent   outline-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-500 hover:bg-black hover:text-white">
                  <span className="flex items-center px-2">
                    {/* <img
                      className="mr-2"
                      width={"20px"}
                      src="../../../src/assets/appleicon.svg"
                      alt=""
                    /> */}
                    <svg
                      width="20"
                      height="20px"
                      viewBox="0 0 256 315"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      preserveAspectRatio="xMidYMid"
                      className="mr-2"
                    >
                      <g>
                        <path
                          className="duration-500"
                          d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"
                          fill="#000000"
                        ></path>
                      </g>
                    </svg>
                    <p className="">Login in with Apple</p>
                  </span>
                </button>
              </div>

              <div className="flex mt-4 items-center text-[#6b7280]">
                <div className="w-[100%] bg-[#e5e7eb] h-[2px]"></div>
                <div className="px-5">or</div>
                <div className="w-[100%] bg-[#e5e7eb] h-[2px]"></div>
              </div>

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignInGG;

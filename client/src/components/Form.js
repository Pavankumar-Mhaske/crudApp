import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { successIcon } from "./icons";
import "./toast.css";
import "./Form.css";

export const Form = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const submitData = async () => {
    if (!userName || !userEmail) {
      toast.dismiss(); // Dismiss any currently displayed toast
      toast.error("Both name and email required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "flip",
        bodyClassName: "flip",
        transition: Flip,
        // icon: <img src={deleteIcon} alt="Delete Icon" />,
      });
    } else {
      const users = await axios.get("/getUsers");
      console.log(users);
      const array = users.data.users;
      console.log(array);
      const userExist = array.find((user) => user.email === userEmail);

      if (userExist) {
        toast.error("User with this email already Exists!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          className: "flip",
          bodyClassName: "flip",
          transition: Flip,
          // icon: <img src={successIcon} alt="Delete Icon" />,
        });
      } else {
        const data = {
          name: userName,
          email: userEmail,
        };

        const res = await axios.post("/createUser", data);

        toast.dismiss(); // Dismiss any currently displayed toast
        toast.success("User updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          className: "flip",
          bodyClassName: "flip",
          transition: Flip,
          icon: <img src={successIcon} alt="Delete Icon" />,
        });

        console.log(res);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitData();
    setUserName("");
    setUserEmail("");
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="form-container">
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-8 mx-auto">
            <div className="header flex flex-col text-center w-full mb-6">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Create User
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="ram gopal"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="abc@gmail.com"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={userEmail}
                      onChange={(event) => setUserEmail(event.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className=" btn lco flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

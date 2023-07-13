import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteIcon, updateIcon, editIcon } from "./icons";
import "./toast.css";
import "./UserList.css";
import Modal from "./Modal";

export const UserList = ({ BASE_URL }) => {
  const [userData, setUserData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchUserData = async () => {
    const resp = await axios.get(`${BASE_URL}/getUsers`);
    console.log("response is here ....", resp);

    if (resp.data.users.length > 0) {
      setUserData(resp.data.users);
    }
  };

  const handleModal = (id) => {
    setCurrentUserId(id);
    setIsOpen(true);
    // handleEdit(id);
  };

  const handleSubmit = (event) => {
    setIsOpen(false);
    event.preventDefault();
    handleEdit(currentUserId);
    setUserName("");
    setUserEmail("");
  };

  const handleEdit = async (id) => {
    // setIsOpen(true);
    // const userName = prompt("Enter new name");
    // if (!userName) {
    //   window.alert("name required!");
    // }
    // const userEmail = prompt("Enter new email");

    console.log(
      `at the time of the editing this is the
              userId returned by edit button: `,
      id,
      userName,
      userEmail
    );
    if (!userName || !userEmail) {
      window.alert("name and email both are required!");
    } else {
      const resp = await axios.put(`${BASE_URL}/editUser/${id}`, {
        name: userName,
        email: userEmail,
      });

      console.log(
        `new edited object
    is here...`,
        resp
      );
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
        icon: <img src={updateIcon} alt="Delete Icon" />,
      });
      fetchUserData();
    }
  };

  const handleDelete = async (id) => {
    const deletedUser = await axios.delete(`${BASE_URL}/deleteUser/${id}`);
    toast.dismiss(); // Dismiss any currently displayed toast
    toast.success("User deleted successfully!", {
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
      icon: <img src={deleteIcon} alt="Delete Icon" />,
    });
    if (userData.length === 1) {
      setUserData([]); // If the last user is deleted, set userData to an empty array
    }
    fetchUserData();
    console.log(`deleted user is here ...`, deletedUser);
  };

  // if (userData.length >= 1) {
  //   fetchUserData(); // If the last user is deleted, set userData to an empty array
  // }
  useEffect(() => {
    fetchUserData();
  }, [userData]);

  return (
    <section className=" text-gray-600 body-font">
      <ToastContainer />
      <Modal open={isOpen}>
        <div className="modal-container flex items-center justify-center min-h-screen">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action=""
              // method="POST"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="ram gopal"
                    className=" input-fields block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="abc@gmail.com"
                    className=" input-fields block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={userEmail}
                    onChange={(event) => setUserEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="modal-buttons flex space-x-4">
                <div className=" submit-button flex-1">
                  <button
                    // onClick={() => setIsOpen(false)}
                    type="submit"
                    className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
                <div className=" cancle-button flex-1">
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="w-full justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="container px-5 py-24 mx-auto">
        <div className="header-userlist-1 flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>

        <div className="header-userlist-2 lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="userlist-table table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-3">{user.name} </td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <button
                        className="my-custom-button"
                        onClick={() => handleModal(user._id)}
                        // onClick={() => handleEdit(user._id)}
                      >
                        <img
                          // onClick={() => setIsOpen(true)}
                          src={editIcon}
                          alt="Edit Icon"
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button
                        className=" my-custom-button"
                        onClick={() => handleDelete(user._id)}
                      >
                        <img src={deleteIcon} alt="delete Icon" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

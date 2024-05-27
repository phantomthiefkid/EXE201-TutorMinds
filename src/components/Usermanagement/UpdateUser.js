import { useState } from "react";
import { Link } from "react-router-dom";



const UpdateUser = ({ visible, onClose, user }) => {
  const [userUpdate, setUserUpdate] = useState(user);
  console.log("hehe: ", userUpdate)
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-2xl rounded-md mb-6">
        <div class="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
          <h2 className="text-2xl mb-4 font-semibold text-center">Cập nhập người dùng</h2>
          <form method="POST" action="#">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5  text-gray-700"
              >
                Họ và tên
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  name="fullName"
                  type="text"
                  required=""
                  value="Join Su"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label
                for="username"
                class="block text-sm font-medium leading-5  text-gray-700"
              >
                Tên đăng nhập
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required=""
                  value="Join Su"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <div className="text-red-500 mb-3"></div>
              <label
                for="base-input"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Role:
              </label>
              <select
                id="role"
                name="roleId"
                defaultValue="1"
                className={`block w-full mt-1 border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50`}
              >
                <option>Select one</option>
                <option value="1">Admin</option>
                <option value="2">Giáo viên</option>
                <option value="3">Học viên</option>
              </select>
            </div>

            <div class="mt-6">
              <label
                for="email"
                class="block text-sm font-medium leading-5  text-gray-700"
              >
                Email address
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required=""
                  value="exam@gmail.com"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5
                    "
                />
                <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <ul className="flex justify-center mt-5 mb-7">
              <li>
                <span className="mr-20 block text-sm font-medium leading-5  text-gray-700">
                  Giới tính
                </span>
              </li>
              <li class="gender-radio">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="1"
                  checked
                  className="drop-shadow-md mr-1 form-check-input custom-radio"
                />
                <label for="nam" className="mr-10">
                  Nam
                </label>

                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="2"
                  checked=""
                  className="drop-shadow-md mr-1 form-check-input custom-radio"
                />
                <label for="nu">Nữ</label>
              </li>
            </ul>

            <div className="flex justify-center gap-14 row mt-3 mb-3">
              <button
                className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white hover:border-red-600"
                onClick={onClose}
                style={{ width: '120px' }} // Adjust the width here
              >
                Close
              </button>

              <Link to="">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  style={{ width: '120px' }} // Adjust the width here to match
                >
                  Cập nhập
                </button>
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
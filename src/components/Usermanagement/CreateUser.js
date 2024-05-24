import React from "react";
import { Link } from "react-router-dom";

const CreateUser = () => {
  return (
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8 ">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-12 w-auto"
          src="https://cdn-icons-png.freepik.com/512/2521/2521826.png"
          alt="Workflow"
        />
        <h2 class="mt-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Thêm mới người dùng
        </h2>
      </div>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-2xl rounded-md mb-6">
        <div class="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
          <form method="POST" action="#">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5  text-gray-700">
                Họ và tên
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  placeholder="Họ và tên"
                  type="text"
                  required=""
                  value=""
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

            <div class="mt-6">
              <label
                for="username"
                class="block text-sm font-medium leading-5 text-gray-700">
                Username
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span class="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  hehe.com/
                </span>
                <input
                  id="username"
                  name="username"
                  placeholder="john"
                  type="text"
                  required=""
                  value=""
                  class="flex-1 form-input pl-3 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 "
                />
              </div>
            </div>

            <div class="mb-3">
              <div className="text-red-500 mb-3"></div>
              <label
                for="base-input"
                class="block text-sm font-medium leading-5 text-gray-700">
                Role:
              </label>
              <select
                id="role"
                name="roleID"
                className={`block w-full mt-1 border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50`}>
                <option>Select one</option>
                <option value="1">Admin</option>
                <option value="2">Giáo viên</option>
                <option value="3">Học viên</option>
              </select>
            </div>

            <div class="mt-6">
              <label
                for="email"
                class="block text-sm font-medium leading-5  text-gray-700">
                Email address
              </label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  required=""
                  value=""
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

            <div class="mt-6">
              <label
                for="base-input"
                class="block text-sm font-medium leading-5 text-gray-700" >
                Ngày sinh:
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                class={`mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
              />
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
                  checked=""
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
              <Link
                to={"/userlist"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <button class="text-red-600 w-full flex justify-center hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-500 text-sm font-bold px-5 py-2 focus:z-10">
                  Trở về
                </button>
              </Link>
              <Link to="">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Tạo mới
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

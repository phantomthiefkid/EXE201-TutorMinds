import React from 'react';

const ModalSignIn = ({ visible, onClose }) => {
  if (!visible) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
        <div className="relative bg-white rounded-lg max-w-md p-8">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="font-semibold text-center text-2xl text-gray-700 mb-5">
            Đăng nhập vào TutorMinds
          </h1>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500"
                placeholder="Nhập địa chỉ email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-gray-500"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">
                Ghi nhớ tài khoản
              </label>
            </div>
            <div>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Chưa có tài khoản?{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
    </>
  );
};

export default ModalSignIn;

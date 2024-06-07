import React, { useEffect, useState } from "react";
import {
  GeoAltFill,
  MortarboardFill,
  Telephone,
  Calendar3,
  CashCoin,
  JournalCheck,
} from "react-bootstrap-icons";

const ModalRequest = ({ visible, onClose }) => {
  const [filter, setFilter] = useState("");
  if (!visible) return null;

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div class="fixed left-0 right-0 mx-auto w-2/5 justify-center z-50 inset-2 overflow-y-scroll ">
        <div class=" bg-white rounded-3xl shadow-md p-8 ">
          <div class="flex items-center border-b-4 border-green-400">
            <img
              src="https://storage.googleapis.com/tutormind/dev%2Ftutormindslogo.png-4pBcY7.png"
              alt="logo"
              class="w-48 h-36 mr-4"
            />
            <div>
              <p class="text-2xl font-bold">Yêu cầu đăng ký dạy kèm</p>
              <p className="text-xl">Hãy nhập đầy đủ các trường bên dưới</p>
            </div>
          </div>

          <form class="mt-4">
            <div class="mb-4">
              <div className="flex items-center mb-2">
                <MortarboardFill className="w-5 h-5 mr-2 text-blue-500" />
                <label for="name" class="block text-gray-700 font-bold">
                  Môn học:
                </label>
              </div>
              <select
                className="border p-2 rounded"
                value={filter}
                onChange={handleFilter}
              >
                <option value="">Chọn môn học</option>
                <option value="Toán">Toán</option>
                <option value="Lý">Lý</option>
                <option value="Hóa">Hóa</option>
                <option value="Anh Ngữ">Anh Ngữ</option>
                <option value="Văn">Văn</option>
              </select>
            </div>

            <div class="mb-4">
              <div className="flex items-center mb-2">
                <Calendar3 className="w-5 h-5 mr-2 text-orange-500" />
                <label for="day" class="block text-gray-700 font-bold">
                  Ngày học:
                </label>
              </div>
              <textarea
                id="day"
                name="day"
                class="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                placeholder="Nhập ngày học mà bạn mong muốn..."
             ></textarea>
            </div>
            <div class="mb-4 flex justify-between space-x-4">
              <div class="flex-1">
                <div className="flex items-center mb-2">
                  <GeoAltFill className="w-5 h-5 mr-2 text-red-500" />
                  <label for="address" class=" text-gray-700 font-bold">
                    Địa chỉ:
                  </label>
                </div>
                <textarea
                  id="address"
                  name="address"
                  class="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  placeholder="Nhập địa chỉ của bạn..."
                ></textarea>
              </div>

              <div class="flex-1">
                <div className="flex items-center mb-2">
                  <Telephone className="w-5 h-5 mr-2 text-blue-800" />
                  <label for="phone" class=" text-gray-700 font-bold">
                    Số điện thoại:
                  </label>
                </div>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  class="w-full py-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  placeholder="Nhập số điện thoại của bạn..."
                />
              </div>
            </div>

            <div class="mb-4">
              <div className="flex items-center mb-2">
                <CashCoin className="w-5 h-5 mr-2 text-yellow-500" />
                <label for="price" class="block text-gray-700 font-bold">
                  Giá tiền(1 buổi học):
                </label>
              </div>
              <input
                type="price"
                id="price"
                name="price"
                class="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                placeholder="300.000VNĐ/buổi"
              />
            </div>
            <div class="mb-4">
              <div className="flex items-center mb-2">
                <JournalCheck className="w-5 h-5 mr-2 text-purple-600" />
                <label for="address" class="block text-gray-700 font-bold">
                  Ghi chú:
                </label>
              </div>
              <textarea
                id="day"
                name="day"
                class="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                placeholder="Hãy nói những gì bạn muốn..."
              ></textarea>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={onClose}
                class=" p-2 px-10 rounded-md border border-gray-500 text-red-500 font-bold"
              >
                Hủy
              </button>
              <button
                type=""
                class="px-10 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-5"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalRequest;

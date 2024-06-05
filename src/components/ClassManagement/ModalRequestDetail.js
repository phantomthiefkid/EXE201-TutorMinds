import React, { useEffect, useState } from "react";
import {
  GeoAltFill,
  MortarboardFill,
  Telephone,
  Calendar3,
  CashCoin,
  JournalCheck,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchClassDetail } from "../../redux/ClassManagement/classSlice";

const ModalRequestDetail = ({ visible, onClose, selectedClassId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classDetail = useSelector((state) => state.class.data.content);
  const [dataClass, setDataClass] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchClassDetail({ id: selectedClassId }));
  }, [dispatch, id]);

  useEffect(() => {
    setDataClass(classDetail);
  }, [classDetail]);

  if (!visible) return null;

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  if (!classDetail) {
    return <div>Loading...</div>;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="fixed left-0 right-0 mx-auto w-2/5 justify-center z-50 inset-2 overflow-y-scroll ">
        <div className="bg-white rounded-l-3xl shadow-md p-8 ">
          <div className="flex items-center border-b-4 border-green-400">
            <img
              src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/445551860_1884650355281087_2659972058971311210_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=afA7fdo_8IUQ7kNvgGzfXrj&_nc_ht=scontent.fsgn2-4.fna&oh=00_AYCmUH7wEEo7MOax-QUL5qPfAOwHacx1dHoWZj9UvAxK6w&oe=665DFA91"
              alt="logo"
              className="w-48 h-36 mr-4"
            />
            <div>
              <p className="text-2xl font-bold">Yêu cầu đăng ký dạy kèm</p>
              <p className="text-xl">Hãy nhập đầy đủ các trường bên dưới</p>
            </div>
          </div>

          <form className="mt-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <MortarboardFill className="w-5 h-5 mr-2 text-blue-500" />
                <label htmlFor="name" className="block text-gray-700 font-bold">
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
            {dataClass.map((item, index) => (
              <div key={index}>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Calendar3 className="w-5 h-5 mr-2 text-orange-500" />
                    <label
                      htmlFor="day"
                      className="block text-gray-700 font-bold"
                    >
                      Ngày học:
                    </label>
                  </div>
                  <textarea
                    id="day"
                    name="day"
                    className="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    placeholder="Nhập ngày học mà bạn mong muốn..."
                  ></textarea>
                </div>
                <div className="mb-4 flex justify-between space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <GeoAltFill className="w-5 h-5 mr-2 text-red-500" />
                      <label
                        htmlFor="address"
                        className="text-gray-700 font-bold"
                      >
                        Địa chỉ:
                      </label>
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      className="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    >
                      {item?.address}
                    </textarea>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Telephone className="w-5 h-5 mr-2 text-blue-800" />
                      <label
                        htmlFor="phone"
                        className="text-gray-700 font-bold"
                      >
                        Số điện thoại:
                      </label>
                    </div>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="w-full py-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                      value={item?.contactNumber}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <CashCoin className="w-5 h-5 mr-2 text-yellow-500" />
                    <label
                      htmlFor="price"
                      className="block text-gray-700 font-bold"
                    >
                      Giá tiền(1 buổi học):
                    </label>
                  </div>
                  <input
                    type="price"
                    id="price"
                    name="price"
                    className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    placeholder="300.000VNĐ/buổi"
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <JournalCheck className="w-5 h-5 mr-2 text-purple-600" />
                    <label
                      htmlFor="address"
                      className="block text-gray-700 font-bold"
                    >
                      Ghi chú:
                    </label>
                  </div>
                  <textarea
                    id="day"
                    name="day"
                    className="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    value={item?.description}
                  ></textarea>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-end">
              <button
                onClick={onClose}
                className="p-2 px-10 rounded-md border border-gray-500 text-red-500 font-bold"
              >
                Hủy
              </button>
              <button
                type=""
                className="px-10 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-5"
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

export default ModalRequestDetail;

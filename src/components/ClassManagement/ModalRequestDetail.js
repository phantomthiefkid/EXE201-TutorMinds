import React, { useEffect, useState } from "react";
import {
  GeoAltFill,
  MortarboardFill,
  Telephone,
  CashCoin,
  JournalCheck,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchClassDetail, updateClassRequest } from "../../redux/ClassManagement/classSlice";
import { getUserDataFromToken } from "../../redux/auth/loginSlice";

const initial = {
  id: 0,
  title: "",
  subject: "",
  teacher: {
    id: 0,
  },
  user: {
    id: 0,
  },
  description: "",
  address: "",
  contactNumber: "",
  conversationStatus: {
    id: 0,
  },
};

const ModalRequestDetail = ({ visible, onClose, flag, setFlag, selectedClassId }) => {
  const { id } = useParams();
  const role = getUserDataFromToken();
  const dispatch = useDispatch();
  const classDetail = useSelector((state) => state.class.class);
  const [dataClass, setDataClass] = useState(initial);

  useEffect(() => {
    if (selectedClassId) {
      dispatch(fetchClassDetail({ id: selectedClassId }));
    }
  }, [dispatch, selectedClassId]);

  useEffect(() => {
    if (classDetail) {
      setDataClass((prevData) => ({
        ...prevData,
        ...classDetail,
      }));
    }
  }, [classDetail]);

  if (!visible) return null;

  const handleFilter = (e) => {
    const { value } = e.target;
    setDataClass((prevData) => ({
      ...prevData,
      subject: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataClass((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      id: dataClass.id,
      title: dataClass.title,
      subject: dataClass.subject,
      teacher: { id: dataClass.teacher.id },
      user: { id: dataClass.user.id },
      description: dataClass.description,
      address: dataClass.address,
      contactNumber: dataClass.contactNumber,
      conversationStatus: { id: role === "STUDENT" ? 2 : 3 },
    };
    try {
      const response = await dispatch(updateClassRequest({ id: dataClass.id, data: payload }));
      if (response) {
        toast.success('Gửi yêu cầu thành công!!!');
        setTimeout(() => {
          onClose();
          setFlag(!flag);
        }, 500);
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi gửi yêu cầu.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <ToastContainer />
      <div className="fixed left-0 right-0 mx-auto w-2/5 justify-center z-50 inset-2 overflow-y-scroll">
        <div className="bg-white rounded-l-3xl shadow-md p-8">
          <div className="flex items-center border-b-4 border-green-400">
            <img
              src="https://storage.googleapis.com/tutormind/dev%2Ftutormindslogo.png-4pBcY7.png"
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
                <label htmlFor="title" className="block text-gray-700 font-bold">
                  Tiêu đề:
                </label>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full py-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                value={dataClass?.title || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <MortarboardFill className="w-5 h-5 mr-2 text-blue-500" />
                <label htmlFor="subject" className="block text-gray-700 font-bold">
                  Môn học:
                </label>
              </div>
              <select
                className="border p-2 rounded"
                value={dataClass?.subject || ""}
                onChange={handleFilter}
                name="subject"
              >
                <option value="">Chọn môn học</option>
                <option value="Toán">Toán</option>
                <option value="Lý">Lý</option>
                <option value="Hóa">Hóa</option>
                <option value="Anh Ngữ">Anh Ngữ</option>
                <option value="Văn">Văn</option>
              </select>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <GeoAltFill className="w-5 h-5 mr-2 text-red-500" />
                <label htmlFor="address" className="text-gray-700 font-bold">
                  Địa chỉ:
                </label>
              </div>
              <textarea
                id="address"
                name="address"
                className="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                value={dataClass?.address || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Telephone className="w-5 h-5 mr-2 text-blue-800" />
                <label htmlFor="contactNumber" className="text-gray-700 font-bold">
                  Số điện thoại:
                </label>
              </div>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="w-full py-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                value={dataClass?.contactNumber || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <CashCoin className="w-5 h-5 mr-2 text-yellow-500" />
                <label htmlFor="price" className="block text-gray-700 font-bold">
                  Giá tiền (1 buổi học):
                </label>
              </div>
              <input
                type="text"
                id="price"
                name="price"
                className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                value="300.000VNĐ/buổi"
                readOnly
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <JournalCheck className="w-5 h-5 mr-2 text-purple-600" />
                <label htmlFor="description" className="block text-gray-700 font-bold">
                  Ghi chú:
                </label>
              </div>
              <textarea
                id="description"
                name="description"
                className="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                value={dataClass?.description || ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="p-2 px-10 rounded-md border border-gray-500 text-red-500 font-bold"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="px-10 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-5"
              >
                Gửi yêu cầu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalRequestDetail;

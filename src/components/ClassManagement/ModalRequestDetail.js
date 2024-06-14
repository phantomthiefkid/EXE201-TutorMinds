import React, { useEffect, useState } from "react";
import {
  GeoAltFill,
  MortarboardFill,
  Telephone,
  CashCoin,
  JournalCheck,
  Calendar3,
} from "react-bootstrap-icons";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchClassDetail, updateClassRequest, updateStatus } from "../../redux/ClassManagement/classSlice";
import { getUserDataFromToken } from "../../redux/auth/loginSlice";

const initial = {
  id: 0,
  title: "",
  teacher: {
    id: 0,
  },
  user: {
    id: 0,
  },
  description: "",
  address: "",
  contactNumber: "",
  dateFrom: "",
  dateTo: "",
  conversationStatus: {
    id: 0,
  },
  dayOfWeek: [],
  slot: 0,
};

const dayOptions = [
  { value: 1, label: "Thứ Hai" },
  { value: 2, label: "Thứ Ba" },
  { value: 3, label: "Thứ Tư" },
  { value: 4, label: "Thứ Năm" },
  { value: 5, label: "Thứ Sáu" },
];

const timeSlotOptions = [
  { value: "1", label: "7h30 - 9h30" },
  { value: "2", label: "10h - 12h" },
  { value: "3", label: "12h30 - 15h" },
  { value: "4", label: "15h30 - 16h30" },
  { value: "5", label: "17h - 19h" },
  { value: "6", label: "19h30 - 21h30" },
];

const ModalRequestDetail = ({ visible, onClose, flag, setFlag, selectedClassId }) => {
  const { id } = useParams();
  const role = getUserDataFromToken();
  const dispatch = useDispatch();
  const classDetail = useSelector((state) => state.class.class);
  const [dataClass, setDataClass] = useState(initial);
  const [remark, setRemark] = useState("");

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
      setRemark(classDetail?.remark || "");
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

  const handleDayOfWeek = (selectedOptions) => {
    setDataClass((prevData) => ({
      ...prevData,
      dayOfWeek: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSlotChange = (selectedOption) => {
    setDataClass((prevData) => ({
      ...prevData,
      slot: selectedOption.value,
    }));
  };

  const handleOnChangeRemark = (e) => {
    setRemark(e.target.value);
  };

  const handleTutorRefinment = async () => {
    const statusUpdate = {
      id: dataClass.id,
      statusId: 3,
      remark: remark,
    };

    try {
      const response = await dispatch(updateStatus(statusUpdate));

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

  const handleSubmit = async () => {
    const payload = {
      id: dataClass.id,
      title: dataClass.title,
      teacher: { id: dataClass.teacher.id },
      user: { id: dataClass.user.id },
      description: dataClass.description,
      address: dataClass.address,
      contactNumber: dataClass.contactNumber,
      conversationStatus: { id: role === "STUDENT" ? 2 : 3 },
      dayOfWeek: dataClass.dayOfWeek,
      slot: Number(dataClass.slot),
      dateFrom: dataClass.dateFrom,
      dateTo: dataClass.dateTo,
      totalPrice: Number(dataClass.totalPrice),
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
    console.log(payload);
  };

  const defaultDayValues = dataClass.dayOfWeek && dataClass.dayOfWeek.map((day) =>
    dayOptions.find((option) => option.value === day)
  );

  const defaultSlotValue = timeSlotOptions.find(
    (option) => option.value === String(dataClass.slot)
  );

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
                disabled={role === "TUTOR"}
                className="w-full py-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                value={dataClass?.title || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Calendar3 className="w-5 h-5 mr-2 text-orange-500" />
                <label htmlFor="day" className="block text-gray-700 font-bold">
                  Ngày học:
                </label>
              </div>

              <div className="flex items-center space-x-4 justify-center">
                <div className="custom-date-info">
                  <label htmlFor="startDate" className="mr-2 font-medium text-gray-700">
                    Ngày bắt đầu:
                  </label>
                  <input
                    type="date"
                    id="dateFrom"
                    name="dateFrom"
                    disabled={role === "TUTOR"}
                    required
                    value={dataClass?.dateFrom || ""}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="custom-date-info">
                  <label htmlFor="endDate" className="mr-2 font-medium text-gray-700">
                    Ngày kết thúc:
                  </label>
                  <input
                    type="date"
                    id="dateTo"
                    name="dateTo"
                    required
                    disabled={role === "TUTOR"}
                    value={dataClass?.dateTo || ""}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 justify-center">
                <div className="w-2/4 mt-4">
                  <Select
                    placeholder="Chọn thứ trong tuần"
                    isMulti
                    required
                    options={dayOptions}
                    value={defaultDayValues}
                    onChange={handleDayOfWeek}
                    isDisabled={role === "TUTOR"}
                  />
                </div>
                <div className="w-2/4 mt-4">
                  <Select
                    placeholder="Chọn khung giờ học"
                    isMulti={false}
                    required
                    options={timeSlotOptions}
                    value={defaultSlotValue}
                    onChange={handleSlotChange}
                    isDisabled={role === "TUTOR"}
                  />
                </div>
              </div>
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
                disabled={role === "TUTOR"}
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
                disabled={role === "TUTOR"}
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
                type="number"
                id="price"
                name="totalPrice"
                disabled={role === "TUTOR"}
                className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                value={dataClass?.totalPrice || ""}
                onChange={handleChange}
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
                disabled={role === "TUTOR"}
                className="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                value={dataClass?.description || ""}
                onChange={handleChange}
              />
            </div>

            {role === "TUTOR" && (
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <JournalCheck className="w-5 h-5 mr-2 text-purple-600" />
                  <label htmlFor="remark" className="block text-red-500 font-bold">
                    Yêu cầu điều chỉnh từ gia sư
                  </label>
                </div>
                <textarea
                  id="remark"
                  name="remark"
                  className="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  value={remark}
                  onChange={handleOnChangeRemark}
                />
              </div>
            )}

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="p-2 px-10 rounded-md border border-gray-500 text-red-500 font-bold"
              >
                Hủy
              </button>
              {role === "STUDENT" && (
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="px-10 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-5"
                >
                  Gửi yêu cầu
                </button>
              )}
              {role === "TUTOR" && (
                <button
                  onClick={handleTutorRefinment}
                  type="button"
                  className="px-10 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-5"
                >
                  Yêu cầu chỉnh sửa
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalRequestDetail;

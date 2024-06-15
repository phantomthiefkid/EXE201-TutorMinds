import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassDetail, updateStatus } from '../../redux/ClassManagement/classSlice';
import Select from "react-select";
import {
  GeoAltFill,
  MortarboardFill,
  Telephone,
  Calendar3,
  CashCoin,
  JournalCheck,
  Brush,
  ArrowDownCircle,
} from "react-bootstrap-icons";
import { toast, ToastContainer } from 'react-toastify';
import { getUserDataFromToken } from '../../redux/auth/loginSlice';
const dayOfWeekOptions = [
  { value: 1, label: "Thứ Hai" },
  { value: 2, label: "Thứ Ba" },
  { value: 3, label: "Thứ Tư" },
  { value: 4, label: "Thứ Năm" },
  { value: 5, label: "Thứ Sáu" }
];

const slotOptions = [
  { value: 1, label: "7h30 - 9h30" },
  { value: 2, label: "10h - 12h" },
  { value: 3, label: "12h30 - 15h" },
  { value: 4, label: "15h30 - 16h30" },
  { value: 5, label: "17h - 19h" },
  { value: 6, label: "19h30 - 21h30" }
];

const ModalInformationRequest = ({ selectedClassId, isOpen, onClose, flag, setFlag }) => {
  const dispatch = useDispatch();
  const classDetail = useSelector((state) => state.class.class);
  const role = getUserDataFromToken();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  useEffect(() => {
    if (isOpen && selectedClassId) {
      dispatch(fetchClassDetail({ id: selectedClassId }));
    }
  }, [dispatch, isOpen, selectedClassId]);

  if (!isOpen || !classDetail) return null;

  const getDayOfWeekLabel = (value) => {
    const day = dayOfWeekOptions.find(day => day.value === value);
    return day ? day.label : 'N/A';
  };

  const getSlotLabel = (value) => {
    const slot = slotOptions.find(slot => slot.value === value);
    return slot ? slot.label : 'N/A';
  };

  const handleReject = async (classId, remake) => {
    const data = {
      id: classId,
      statusId: 7,
      remark: remake
    }
    try {
      if (data) {
        const response = await dispatch(updateStatus(data)).then(() => {
          toast.success('Gửi yêu cầu thành công!!!');
          setTimeout(() => {
            onClose();
            setFlag(!flag)
          }, 500)
        })

      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi gửi yêu cầu.')
    }
    console.log("Check: ", data)
  }

  const handleSubmitRequest = async (classId, remake) => {
    const data = {
      id: classId,
      statusId: role === "TUTOR" ? 6 : 2,
      remark: remake
    }
    try {
      if (data) {
        const response = await dispatch(updateStatus(data))
        if (response) {
          toast.success("Duyệt yêu cầu thành công!!")
        }


        setTimeout(() => {
          onClose();
          setFlag(!flag)
        }, 500)



      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi gửi yêu cầu.')
    }
  }

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 z-40">
      <ToastContainer />
      <div class="fixed left-0 right-0 mx-auto w-2/5 justify-center z-50 inset-2 overflow-y-scroll ">
        <div class=" bg-white rounded-l-3xl shadow-md p-8 ">
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
                <Brush className="w-5 h-5 mr-2 text-purple-600" />
                <label for="address" class="block text-gray-700 font-bold">
                  Tiêu đề:
                </label>
              </div>
              <textarea
                id="title"
                name="title"
                type="text"
                disabled
                value={classDetail?.title}
                class="w-full pt-2 pb-2 px-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                placeholder="Hãy nhập tiêu đề..."
              ></textarea>

            </div>

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

              <div className="flex items-center space-x-4 justify-center">
                <div className="custom-date-info">
                  <label
                    for="startDate"
                    class="mr-2 font-medium text-gray-700"
                  >
                    Ngày bắt đầu:
                  </label>
                  <input
                    type="date"
                    id="dateFrom"
                    name="dateFrom"
                    disabled
                    value={classDetail?.dateFrom}
                    class="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="custom-date-info">
                  <label
                    for="startDate"
                    class="mr-2 font-medium text-gray-700"
                  >
                    Ngày kết thúc:
                  </label>
                  <input
                    type="date"
                    id="dateTo"
                    name="dateTo"
                    disabled
                    value={classDetail?.dateTo}
                    class="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 justify-center">
                <div className="w-2/4 mt-4">
                  <p className="mb-2"><strong>Ngày trong tuần:</strong> {classDetail.dayOfWeek && classDetail.dayOfWeek.map(day => getDayOfWeekLabel(day)).join(', ')}</p>



                </div>
                <div className="w-2/4 mt-4">
                  <p className="mb-2"><strong>Slot:</strong> {getSlotLabel(classDetail.slot)}</p>
                </div>
              </div>
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
                  type="text"
                  disabled
                  value={classDetail?.address}
                  class="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
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
                  id="contactNumber"
                  name="contactNumber"
                  disabled
                  value={classDetail?.contactNumber}
                  class="w-full py-2 px-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  placeholder="Nhập số điện thoại của bạn..."
                />

              </div>
            </div>

            <div class="mb-4">
              <div className="flex items-center mb-2">
                <CashCoin className="w-5 h-5 mr-2 text-yellow-500" />
                <label for="price" class="block text-gray-700 font-bold">
                  Giá tiền:
                </label>
              </div>
              <input
                type="totalPrice"
                id="totalPrice"
                name="totalPrice"
                disabled
                value={formatCurrency(classDetail?.totalPrice)}
                class="w-full p-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
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
                name="description"
                type="text"
                disabled
                value={classDetail?.description}
                class="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                placeholder="Hãy nói những gì bạn muốn..."
              ></textarea>
            </div>
            {classDetail?.remark && (<div class="mb-4">
              <div className="flex items-center mb-2">
                <JournalCheck className="w-5 h-5 mr-2 text-purple-600" />
                <label for="address" class="block text-gray-700 font-bold">
                  Yêu cầu điều chỉnh từ gia sư:
                </label>
              </div>
              <textarea
                id="day"
                name="description"
                type="text"
                disabled
                value={classDetail?.remark}
                class="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                placeholder="Hãy nói những gì bạn muốn..."
              ></textarea>
            </div>)}

            <div className="flex items-center justify-center">
              <button
                onClick={onClose}
                class=" p-2 px-6 rounded-md border border-gray-500 text-red-500 font-bold"
              >
                Hủy
              </button>
              {classDetail.conversationStatus?.id === 3 && (<button
                onClick={() => handleSubmitRequest(classDetail.id, classDetail.remark)}
                type="button"
                class="px-10 bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 ml-5"
              >
                Gửi yêu cầu
              </button>) || classDetail.conversationStatus?.id === 1 && (<button
                onClick={() => handleSubmitRequest(classDetail.id, classDetail.remark)}
                type="button"
                class="px-10 bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 ml-5"
              >
                Gửi yêu cầu
              </button>)}
              {classDetail.conversationStatus?.id === 3 && (<button
                onClick={() => handleReject(classDetail.id, classDetail.remark)}
                type="button"
                class="px-6 bg-red-500 text-white p-2 rounded-md hover:bg-green-600 ml-5"
              >
                Từ chối yêu cầu
              </button>)}
              {
                role === "TUTOR" && classDetail.conversationStatus?.id === 2 && (<button
                  type="button"
                  onClick={() => handleReject(classDetail.id, classDetail.remark)}
                  class="px-6 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 ml-5"
                >
                  Từ chối yêu cầu
                </button>)

              }
              {
                role === "TUTOR" && classDetail.conversationStatus?.id === 2 && (<button
                  type="button"
                  onClick={() => handleSubmitRequest(classDetail.id, classDetail.remark)}
                  class="px-6 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-5"
                >
                  Chấp nhận yêu cầu
                </button>)

              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalInformationRequest;

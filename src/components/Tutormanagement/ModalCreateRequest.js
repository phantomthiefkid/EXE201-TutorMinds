import React, { useEffect, useState } from "react";
import {
  GeoAltFill,
  MortarboardFill,
  Telephone,
  Calendar3,
  CashCoin,
  JournalCheck,
  Brush,
} from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createClasses } from "../../redux/ClassManagement/classSlice";
import { getUserIdFromToken } from "../../redux/auth/loginSlice";

const ModalCreateRequest = ({ visible, onClose, tutorId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  const class_initial = {
    title: "",
    teacher: {
      id: tutorId,
    },
    user: {
      id: userId,
    },
    description: "",
    address: "",
    contactNumber: "",
    conversationStatus: {
      id: 2,
    },
  };

  const class_error = {
    title: "",
    description: "",
    address: "",
    contactNumber: "",
  };
  const [classes, setClasses] = useState(class_initial);
  const [errorClasses, setErrorClasses] = useState(class_error);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const getDataClass = (e) => {
    setClasses({ ...classes, [e.target.name]: e.target.value });
  };

  const handleValidation = (classes) => {
    setErrorClasses({ ...class_error });
    const specialCharacters = /[@#$%^&*+\=\[\]{}':"\\|<>\/]+/;
    let isValid = false;
    if (!classes) {
      isValid = true;
      return isValid;
    }
    if (classes?.title.trim() === "") {
      setErrorClasses((prevState) => ({
        ...prevState,
        title: "Tiêu đề không được bỏ trống!!!",
      }));
      isValid = true;
    } else if (specialCharacters.test(classes.title)) {
      setErrorClasses((prevState) => ({
        ...prevState,
        title: "Tiêu đề không được có ký tự đặc biệt!!!",
      }));
      isValid = true;
    }

    if (classes?.description.trim() === "") {
      setErrorClasses((prevState) => ({
        ...prevState,
        description: "Mô tả không được bỏ trống!!!",
      }));
      isValid = true;
    } else if (specialCharacters.test(classes.description)) {
      setErrorClasses((prevState) => ({
        ...prevState,
        description: "Mô tả không được có ký tự đặc biệt!!!",
      }));
      isValid = true;
    }
    if (classes?.address.trim() === "") {
      setErrorClasses((prevState) => ({
        ...prevState,
        address: "Địa chỉ không được bỏ trống!!!",
      }));
      isValid = true;
    } else if (specialCharacters.test(classes.address)) {
      setErrorClasses((prevState) => ({
        ...prevState,
        address: "Địa chỉ không được có ký tự đặc biệt!!!",
      }));
      isValid = true;
    }
    if (classes?.contactNumber.trim() === "") {
      setErrorClasses((prevState) => ({
        ...prevState,
        contactNumber: "Số điện thoại không được bỏ trống!!!",
      }));
      isValid = true;
    } else if (specialCharacters.test(classes.contactNumber)) {
      setErrorClasses((prevState) => ({
        ...prevState,
        contactNumber: "Số điện thoại không được có ký tự đặc biệt!!!",
      }));
      isValid = true;
    }
    return isValid;
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      if (!handleValidation(classes)) {
        await dispatch(createClasses(classes));
        Swal.fire({
          title: "Success!",
          text: "Tạo yêu cầu thành công!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          onClose();
        });
      } else {
        toast.error("Validation failed!", { autoClose: 200 });
      }
    } catch (error) {
      toast.error("Thêm mới thất bại!", { autoClose: 200 });
      throw error;
    }
  };
  const handleSaveDraft = async (event) => {
    event.preventDefault();
    try {
      const draftClasses = { ...classes, conversationStatus: { id: 1 } };
      if (!handleValidation(draftClasses)) {
        await dispatch(createClasses(draftClasses));
        Swal.fire({
          title: "Success!",
          text: "Tạo yêu cầu thành công!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          onClose();
        });
        // toast.success("Lưu nháp thành công!", { autoClose: 200 });
        // setTimeout(() => {
        //   onClose();
        // }, 200);
      }
    } catch (error) {
      toast.error("Lưu nháp thất bại!", { autoClose: 200 });
      throw error;
    }
  };

  const [filter, setFilter] = useState("");
  if (!visible) return null;

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <div class="fixed inset-0 bg-black bg-opacity-50 z-40">
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
              <div className="flex mb-4">
                <div className="flex-1 mr-4">
                  <div className="flex items-center mb-2">
                    <MortarboardFill className="w-5 h-5 mr-2 text-blue-500" />
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-bold"
                    >
                      Môn học:
                    </label> 
                  </div>
                  <select
                    className="border p-2 rounded w-full"
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

                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Brush className="w-5 h-5 mr-2 text-pink-500" />
                    <label
                      htmlFor="address"
                      className="text-gray-700 font-bold"
                    >
                      Tiêu đề:
                    </label>
                  </div>
                  <textarea
                    id="title"
                    name="title"
                    type="text"
                    onChange={getDataClass}
                    className="w-full h-20 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    placeholder="Nhập tiêu đề..."
                  ></textarea>
                  {errorClasses.title && (
                    <span className="text-red-500">{errorClasses.title}</span>
                  )}
                </div>
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
                    type="text"
                    onChange={getDataClass}
                    class="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    placeholder="Nhập địa chỉ của bạn..."
                  ></textarea>
                  {errorClasses.address && (
                    <span className="text-red-500">{errorClasses.address}</span>
                  )}
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
                    onChange={getDataClass}
                    class="w-full py-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                    placeholder="Nhập số điện thoại của bạn..."
                  />
                  {errorClasses.contactNumber && (
                    <span className="text-red-500">
                      {errorClasses.contactNumber}
                    </span>
                  )}
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
                  name="description"
                  type="text"
                  onChange={getDataClass}
                  class="w-full h-28 pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  placeholder="Hãy nói những gì bạn muốn..."
                ></textarea>
                {errorClasses.description && (
                  <span className="text-red-500">
                    {errorClasses.description}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={onClose}
                  class=" p-2 px-10 rounded-md border border-gray-500 text-red-500 font-bold"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveDraft}
                  type="button"
                  class="px-10 bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 ml-5"
                >
                  Lưu nháp
                </button>
                <button
                  onClick={handleCreate}
                  type="button"
                  class="px-10 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 ml-5"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreateRequest;

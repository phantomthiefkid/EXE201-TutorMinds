import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import "../Tutormanagement/ModalCreate.css";
import { createClasses } from "../../redux/ClassManagement/classSlice";
import { getUserIdFromToken } from "../../redux/auth/loginSlice";

const ModalCreateRequest = ({ visible, onClose, tutorId }) => {
  const token = localStorage.getItem("token");
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
    // schedule: [],
    dayOfWeek: [],
    dateFrom: "",
    dateTo: "",
    slot: "",
    totalPrice: "",
    description: "",
    address: "",
    contactNumber: "",
    conversationStatus: {
      id: 2,
    },
  };

  const class_error = {
    totalPrice: "",
    title: "",
    description: "",
    address: "",
    contactNumber: "",
  };
  const [classes, setClasses] = useState(class_initial);
  const [errorClasses, setErrorClasses] = useState(class_error);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [initialPrice, setInitialPrice] = useState(0);

  function findDateFromDateTo(dates) {
    if (dates.length === 0) {
      return { dateFrom: null, dateTo: null };
    }
    const sortedDates = dates
      .map((dateStr) => new Date(dateStr))
      .sort((a, b) => a - b);
    const dateFrom = sortedDates[0];
    const dateTo = sortedDates[sortedDates.length - 1];
    return { dateFrom, dateTo };
  }

  useEffect(() => {
    const { dateFrom, dateTo } = findDateFromDateTo(selectedDates);
    const formattedSelectedDates = selectedDates.map((dateStr) =>
      new Date(dateStr).toLocaleDateString("en-CA")
    );
    setClasses({
      ...classes,
      dateFrom: dateFrom ? new Date(dateFrom).toLocaleDateString("en-CA") : "",
      dateTo: dateTo ? new Date(dateTo).toLocaleDateString("en-CA") : "",
      dayOfWeek: formattedSelectedDates,
    });
  }, [selectedDates]);

  const getDataClass = (e) => {
    const { name, value } = e.target;
    let newClasses = { ...classes };

    if (name === "totalPrice") {
      const price = parseFloat(value);
      setInitialPrice(price);
      newClasses.totalPrice = price;
    } else {
      newClasses[name] = value;
    }

    setClasses(newClasses);
  };

  const handleSlotChange = (selectedOption) => {
    setClasses({ ...classes, slot: selectedOption.value });
  };

  const handleDayOfWeek = (selectedOptionDay) => {
    const selectedDays = selectedOptionDay.map(option => option.value);
    setClasses({ ...classes, dayOfWeek: selectedDays });
  };

  // const getDataClass = (e) => {
  //   setClasses({ ...classes, [e.target.name]: e.target.value });
  // };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  console.log("Data->>>", classes);

  const handleValidation = (classes) => {
    setErrorClasses({ ...class_error });
    const specialCharacters = /[@#$%^&*+\=\[\]{}':"\\|<>\/]+/;
    const onlyDigits = /^\d+$/;
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
    if (String(classes.totalPrice).trim() === "") {
      setErrorClasses((prevState) => ({
        ...prevState,
        totalPrice: "Giá tiền không được bỏ trống!!!",
      }));
      isValid = true;
    } else if (specialCharacters.test(classes.totalPrice)) {
      setErrorClasses((prevState) => ({
        ...prevState,
        totalPrice: "Giá tiền không được có ký tự đặc biệt!!!",
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
                  onChange={getDataClass}
                  class="w-full pt-2 pb-2 px-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  placeholder="Hãy nhập tiêu đề..."
                ></textarea>
                {errorClasses.title && (
                  <span className="text-red-500">{errorClasses.title}</span>
                )}
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
                      required
                      onChange={getDataClass}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      required
                      onChange={getDataClass}
                      class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 justify-center">
                  <div className="w-2/4 mt-4">
                    <Select
                      placeholder="Chọn thứ trong tuần"
                      isMulti
                      required
                      options={[
                        { value: "1", label: "Thứ Hai" },
                        { value: "2", label: "Thứ Ba" },
                        { value: "3", label: "Thứ Tư" },
                        { value: "4", label: "Thứ Năm" },
                        { value: "5", label: "Thứ Sáu" },
                      ]}
                      onChange={handleDayOfWeek}
                    />
                  </div>
                  <div className="w-2/4 mt-4">
                    <Select
                      placeholder="Chọn khung giờ học"
                      isMulti={false}
                      required
                      options={[
                        { value: "1", label: "7h30 - 9h30" },
                        { value: "2", label: "10h - 12h" },
                        { value: "3", label: "12h30 - 15h" },
                        { value: "4", label: "15h30 - 16h30" },
                        { value: "5", label: "17h - 19h" },
                        { value: "6", label: "19h30 - 21h30" },
                      ]}
                      onChange={handleSlotChange}
                    />
                  </div>
                </div>

                {/* <div className="container rounded-b-lg bg-white mt-4">
                  <div className="flex justify-center">
                    <DatePicker
                      calendarClassName="custom-calendar"
                      selected={null}
                      onChange={handleDateClick}
                      inline
                      required
                      dayClassName={(date) => {
                        const dateStr = date.toDateString("en-CA");
                        return selectedDates.includes(dateStr)
                          ? "selected"
                          : "dayOfWeek";
                      }}
                      monthsShown={2}
                    />
                  </div>
                </div> */}
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
                    Giá tiền:
                  </label>
                </div>
                <input
                  type="totalPrice"
                  id="totalPrice"
                  name="totalPrice"
                  onChange={getDataClass}
                  class="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                  placeholder="300.000VNĐ"
                />
                {errorClasses.totalPrice && (
                  <span className="text-red-500">
                    {errorClasses.totalPrice}
                  </span>
                )}
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalRequest from "../../Tutormanagement/ModalRequest";

const ClassListRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [dropdownStates, setDropdownStates] = useState({});
  const [showModalRequest, setShowModalRequest] = useState(false);
  const handleOnClose = () => setShowModalRequest(false);

  const classes = [
    {
      id: 1,
      name: "Nguyễn Tấn",
      phone: "0987654321",
      state: "Hoàn thành",
      price: "300$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Toán",
    },
    {
      id: 2,
      name: "Hoàng Thiện",
      phone: "0979868546",
      state: "Đang xử lý",
      price: "180$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Lý",
    },
    {
      id: 3,
      name: "Gia Vinh",
      phone: "0979675432",
      state: "Từ chối",
      price: "580$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Hóa",
    },
    {
      id: 4,
      name: "Gia Vinh",
      phone: "01289347653",
      state: "Hoàn thành",
      price: "250$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Anh Ngữ",
    },
    {
      id: 5,
      name: "Thiêm Lộc",
      phone: "0937816392",
      state: "Từ chối",
      price: "120$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Văn",
    },
    {
      id: 6,
      name: "Ngọc Hân",
      phone: "092836517",
      state: "Đang xử lý",
      price: "400$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Toán",
    },
    {
      id: 7,
      name: "Minh Tuấn",
      phone: "0378291754",
      state: "Hoàn thành",
      price: "600$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Lý",
    },
    {
      id: 8,
      name: "Luke Shaw",
      phone: "0866756382",
      state: "Từ chối",
      price: "210$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Hóa",
    },
    {
      id: 9,
      name: "Harry Potter",
      phone: "0178374921",
      state: "Hoàn thành",
      price: "305$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Anh Ngữ",
    },
    {
      id: 10,
      name: "Ronaldo",
      phone: "0986589378",
      state: "Đang xử lý",
      price: "300$",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      subject: "Văn",
    },
  ];
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredClasses = classes.filter((classes) => {
    return (
      classes.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || classes.subject === filter)
    );
  });
  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Đảo ngược trạng thái dropdown khi bấm
    }));
  };

  return (
    <>
      <ModalRequest onClose={handleOnClose} visible={showModalRequest} />
      <h2 class="text-3xl font-semibold leading-tight text-center text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-4 py-2 shadow-md">
        Danh sách lớp học
      </h2>
      <div className="flex items-center mt-4 justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={handleFilter}
        >
          <option value="">Lọc theo môn học</option>
          <option value="Toán">Toán</option>
          <option value="Lý">Lý</option>
          <option value="Hóa">Hóa</option>
          <option value="Anh Ngữ">Anh Ngữ</option>
          <option value="Văn">Văn</option>
        </select>
      </div>
      <table className="my-10 mx-auto w-full max-w-7xl divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Số thứ tự
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tên môn học
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Gia sư
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Số điện thoại
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Giá tiền
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Trạng thái
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        {filteredClasses.map((classes) => (
          <tbody className="bg-white divide-y divide-gray-200">
            <tr key={classes.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {classes.id}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{classes.subject}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={classes.img}
                      alt={classes.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {classes.name}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {classes.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {classes.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    classes.state === "Hoàn thành"
                      ? "bg-green-100 text-green-800"
                      : classes.state === "Đang xử lý"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {classes.state}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap  text-sm font-medium">
                <button
                  type="button"
                  className="inline-block text-gray-500 hover:text-gray-700"
                  onClick={() => toggleDropdown(classes.id)}
                >
                  <svg
                    className="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                  </svg>
                </button>
                {dropdownStates[classes.id] && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20">
                    <div className="py-1 rounded-md bg-white shadow-xs">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Hoàn thành
                      </button>

                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Từ chối
                      </button>

                      <button
                        onClick={() => setShowModalRequest(true)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Làm lại yêu cầu
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};

export default ClassListRequest;

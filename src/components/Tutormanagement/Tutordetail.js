import React, { useEffect, useState } from "react";
import {
  GeoAltFill,
  MortarboardFill,
  StarFill,
  Star,
  ChatDots,
} from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTutorDetail } from "../../redux/TutorManagement/Tutor";
import ModalCreateRequest from "./ModalCreateRequest";
import ModalCalendar from "./ModalCalendar";

const TutorDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tutorDetail = useSelector((state) => state.tutor.tutor);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModalRequest, setShowModalRequest] = useState(false);
  const handleOnClose = () => setShowModalRequest(false);
  const [showModalCalendar, setShowModalCalendar] = useState(false);
  const handleOnCloseCalendar = () => setShowModalCalendar(false);

  useEffect(() => {
    dispatch(fetchTutorDetail({ id })).then(() => {
      setLoading(false);
    });
  }, [dispatch, id]);

  useEffect(() => {
    setData(tutorDetail);
  }, [tutorDetail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {showModalRequest && (
        <ModalCreateRequest
          onClose={handleOnClose}
          visible={showModalRequest}
          tutorId={tutorDetail?.id}
        />
      )}
      {showModalCalendar && (
        <ModalCalendar
          onClose={handleOnCloseCalendar}
          email={tutorDetail?.email}
        />
      )}
      <div className="bg-gray-100 min-h-screen text-gray-800 z-0">
        <div className="relative z-0">
          <img
            src="https://www.omni-academy.com/wp-content/uploads/2017/05/online-courses-header.jpg"
            alt="Cover"
            className="w-full z-0 h-96 object-cover"
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 p-4">
            <img
              src={
                data?.avatar ||
                `https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080`
              }
              alt="Profile"
              className="rounded-sm w-32 h-32 md:w-40 md:h-40 border-4 border-white"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-slate-200 shadow-lg rounded-lg w-full p-6 mb-6 mt-16 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Gia sư: {data?.fullName || "Samuel Abera"}
            </h1>
            <div className="flex items-center justify-center mt-2 text-gray-700">
              <MortarboardFill className="w-5 h-5 mr-2 text-blue-500" />
              <p className="text-md">
                Môn học:{" "}
                {tutorDetail.profile &&
                  tutorDetail.profile.majorList?.map(
                    (item) => item.subject.name + " "
                  )}
              </p>
            </div>
            <div className="flex items-center justify-center mt-2 text-gray-700">
              <GeoAltFill className="w-5 h-5 mr-2 text-red-500" />
              <p className="text-md">
                {tutorDetail?.address || "Ethiopia, Addis Ababa"}
              </p>
            </div>
            <div className="flex items-center justify-center mt-2 text-gray-700">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              <p className="text-md">
                Rating: {tutorDetail.profile?.ratingPoint || 4.5}/5.0
              </p>
            </div>
            <div className="flex items-center justify-center mt-2">
              <ChatDots className="w-8 h-8 text-green-500 mx-5" />
              <button
                onClick={() => setShowModalCalendar(true)}
                className=" mx-4 rounded bg-sky-500 text-white px-6 py-2 text-xs font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
              >
                Lịch dạy của gia sư
              </button>

              <button
                onClick={() => setShowModalRequest(true)}
                className="rounded bg-sky-500 text-white px-6 py-2 text-xs font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
              >
                Đăng ký
              </button>
            </div>
            <div className="mt-4 text-md">
              <p>
                {tutorDetail.profile?.personalIntroduction ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
              <p className="mt-4">
                {tutorDetail.profile?.personalInformation ||
                  "Additional personal information goes here."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                Khóa Học Đã Dạy
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-300 p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Toán Cấp 2 - Cơ Bản
                  </h3>
                  <p className="text-gray-800 mt-2">
                    Khóa học này giúp học sinh cấp 2 nắm vững các kiến thức cơ
                    bản về toán học.
                  </p>
                  <p className="text-gray-800 mt-2">Giá: $79</p>
                </div>
                <div className="bg-white border border-gray-300 p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Lập Trình Pascal cho Học Sinh Cấp 2
                  </h3>
                  <p className="text-gray-800 mt-2">
                    Học những điều cơ bản về lập trình thông qua ngôn ngữ
                    Pascal, phù hợp với học sinh cấp 2.
                  </p>
                  <p className="text-gray-800 mt-2">Giá: $89</p>
                </div>
              </div>
            </div>

            <div className="p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-300 pb-2">
                Đánh Giá
              </h2>
              <div className="space-y-4">
                <div className="bg-white border border-gray-300 p-6 hover:shadow-lg transition-shadow duration-300">
                  <p className="font-semibold text-gray-900">
                    Lý Mạc Sầu
                    <span className="flex">
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                    </span>
                  </p>
                  <p className="text-gray-800 mt-2">Giảng viên tuyệt vời!</p>
                </div>
                <div className="bg-white border border-gray-300 p-6 hover:shadow-lg transition-shadow duration-300">
                  <p className="font-semibold text-gray-900">
                    Dương Quá
                    <span className="flex">
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                      <StarFill className="w-4 h-4 mr-1 text-yellow-500" />
                      <StarFill className="w-4 h-4 mr-1 text-gray-300" />
                    </span>
                  </p>
                  <p className="text-gray-800 mt-2">Bài giảng quá hay!!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorDetail;

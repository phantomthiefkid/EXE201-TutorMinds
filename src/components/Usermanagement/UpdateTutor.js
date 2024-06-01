import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdateTutor = ({ visible, onClose, tutor, fetchUsers }) => {
    const [tutorProfile, setTutorProfile] = useState({
        personalIntroduction: "",
        personalInformation: "",
        ratingPoint: 0,
        majorList: []
    });
    const [subjectList, setSubjectList] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (tutor) {
            fetchTutorProfile(tutor.id);
        }
        fetchSubjectList();
    }, [tutor]);

    const fetchTutorProfile = async (tutorId) => {
        try {
            const response = await axios.get(`https://fams-management.tech/api/test/tutors/${tutor.id}`, {
                headers: {
                    'accept': '*/*'
                }
            });
            if (response.status === 200) {
                setTutorProfile(response.data.profile);
            } else {
                toast.error("Không thể lấy thông tin gia sư!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };

    const fetchSubjectList = async () => {
        try {
            const response = await axios.get('https://fams-management.tech/api/public/subjects');
            if (response.status === 200) {
                setSubjectList(response.data);
            } else {
                toast.error("Không thể lấy danh sách chuyên ngành!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi lấy danh sách chuyên ngành!");
        }
    };

    const handleSelectChange = (index, value) => {
        const updatedMajorList = [...tutorProfile.majorList];
        updatedMajorList[index].subject.id = value;
        setTutorProfile({ ...tutorProfile, majorList: updatedMajorList });
    };

    const handleMajorDescriptionChange = (index, value) => {
        const updatedMajorList = [...tutorProfile.majorList];
        updatedMajorList[index].majorDescription = value;
        setTutorProfile({ ...tutorProfile, majorList: updatedMajorList });
    };

    const handleAddMajor = () => {
        const newMajorList = [...tutorProfile.majorList, { subject: { id: '', }, majorDescription: '' }];
        setTutorProfile({ ...tutorProfile, majorList: newMajorList });
    };

    const handleRemoveMajor = (index) => {
        const updatedMajorList = [...tutorProfile.majorList];
        updatedMajorList.splice(index, 1);
        setTutorProfile({ ...tutorProfile, majorList: updatedMajorList });
    };

    const handleUpdateTutor = async () => {
        const encodedEmail = encodeURIComponent(tutor.email);
        try {
            const response = await axios.post(`https://fams-management.tech/api/test/tutors/${encodedEmail}`, {
                personalIntroduction: tutorProfile.personalIntroduction,
                personalInformation: tutorProfile.personalInformation,
                ratingPoint: tutorProfile.ratingPoint,
                majorList: tutorProfile.majorList.map(major => ({
                    subject: { id: major.subject.id },
                    majorDescription: major.majorDescription
                }))
            }, {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 200) {
                toast.success("Cập nhật thông tin gia sư thành công!");
                fetchUsers(); 
                onClose(); 
            } else {
                toast.error("Không thể cập nhật thông tin gia sư!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }
    };
    

    if (!visible || !tutorProfile) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-2xl rounded-md mb-6">
                <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
                    <h2 className="text-2xl mb-4 font-semibold text-center">
                        Cập nhật thông tin gia sư
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="personalIntroduction" className="block text-sm font-medium leading-5 text-gray-700">
                                Giới thiệu cá nhân
                            </label>
                            <textarea
                                id="personalIntroduction"
                                name="personalIntroduction"
                                value={tutorProfile.personalIntroduction}
                                onChange={e => setTutorProfile({ ...tutorProfile, personalIntroduction: e.target.value })}
                                className="resize-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                rows="3"
                            />
                        </div>

                        <div>
                            <label htmlFor="personalInformation" className="block text-sm font-medium leading-5 text-gray-700">
                                Thông tin cá nhân
                            </label>
                            <textarea
                                id="personalInformation"
                                name="personalInformation"
                                value={tutorProfile.personalInformation}
                                onChange={e => setTutorProfile({ ...tutorProfile, personalInformation: e.target.value })}
                                className="resize-none appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                rows="3"
                            />
                        </div>

                        <div>
                            <label htmlFor="ratingPoint" className="block text-sm font-medium leading-5 text-gray-700">
                                Điểm đánh giá
                            </label>
                            <input
                                id="ratingPoint"
                                name="ratingPoint"
                                type="number"
                                value={tutorProfile.ratingPoint}
                                onChange={e => setTutorProfile({ ...tutorProfile, ratingPoint: e.target.value })}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            />
                        </div>

                        <div>
                            <label htmlFor="majorList" className="block text-sm font-medium leading-5 text-gray-700">
                                Chuyên ngành
                            </label>
                            {tutorProfile.majorList.map((major, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <select
                                        value={major.subject.id}
                                        onChange={e => handleSelectChange(index, e.target.value)}
                                        className="flex-1 mr-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    >
                                        <option value="">Chọn chuyên ngành</option>
                                        {subjectList.map(subject => (
                                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        value={major.majorDescription}
                                        onChange={e => handleMajorDescriptionChange(index, e.target.value)}
                                        placeholder="Mô tả chuyên ngành"
                                        className="flex-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    <button onClick={() => handleRemoveMajor(index)} className="px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                        Xóa
                                    </button>
                                </div>
                            ))}
                            <button onClick={handleAddMajor} className="mt-2 px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                Thêm chuyên ngành
                            </button>
                        </div>

                    </div>
                    <div className="mt-6 flex justify-end">
                        <button onClick={handleUpdateTutor} className="px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                            Cập nhật
                        </button>
                        <button onClick={onClose} className="ml-3 px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTutor;

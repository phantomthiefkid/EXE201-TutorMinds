import React, { useEffect, useState } from 'react';
import { GeoAltFill, MortarboardFill, StarFill, CodeSlash, Star } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTutorDetail } from '../../redux/TutorManagement/Tutor';

const TutorDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const tutorDetail = useSelector((state) => state.tutor.tutor);
    const [data, setData] = useState(null);

    useEffect(() => {
        dispatch(fetchTutorDetail({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        setData(tutorDetail);
    }, [tutorDetail]);

    // Check if data is undefined or still being loaded
    if (!tutorDetail) {
        return <div>Loading...</div>;
    }
    if (tutorDetail) {
        console.log(tutorDetail)
    }
    return (
        <div className='bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400'>
            <div className="max-w-6xl mx-auto p-4 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 mb-6">
                        <img
                            src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/405341235_1774049269674530_8472061970839104134_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFJUVqz-fUD2ltXZ-nsL8Db_Q6zlIRbcIb9DrOUhFtwhoCloy0xduU5DbSlr_34JAx9dtagA58_5NEts2VEVzeX&_nc_ohc=L4xoalfqFywQ7kNvgFAeqXo&_nc_ht=scontent.fhan14-2.fna&oh=00_AYAg_jRVJWgkIK-sjAoam8Iumf7hV-MzhGqeK_2851eBOA&oe=665C9830"
                            alt="Tutor"
                            className="rounded-full w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-0 border-4 border-gray-200 shadow-sm"
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800">{data?.fullName}</h1>
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                <MortarboardFill color='blue' className="w-5 h-5 mr-2" />
                                <p className="text-md">Môn học: {tutorDetail.profile && tutorDetail.profile.majorList?.map((item) => item.subject.name + " ")}</p>
                            </div>
                            {/* <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                <CodeSlash color='#FAC140' className="w-5 h-5 mr-2" />
                                <p className="text-md">Kinh nghiệm: 10 năm trong ngành</p>
                            </div> */}
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                <GeoAltFill color='red' className="w-5 h-5 mr-2" />
                                <p className="text-md">{tutorDetail?.address}</p>
                            </div>
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                <Star color='#FFD700' className="w-5 h-5 mr-2" />
                                <p className="text-md">Rating: {tutorDetail.profile && tutorDetail.profile?.ratingPoint}/5.0</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-700 text-md mt-4">
                            {tutorDetail.profile && tutorDetail.profile?.personalIntroduction}
                        </p>
                        <p className="text-gray-700 text-md mt-4">
                            {tutorDetail.profile && tutorDetail.profile?.personalInformation}
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Khóa Học Đã Dạy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-800">Toán Cấp 2 - Cơ Bản</h3>
                            <p className="text-gray-700 mt-2">Khóa học này giúp học sinh cấp 2 nắm vững các kiến thức cơ bản về toán học.</p>
                            <p className="text-gray-700 mt-2">Giá: $79</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-800">Lập Trình Pascal cho Học Sinh Cấp 2</h3>
                            <p className="text-gray-700 mt-2">Học những điều cơ bản về lập trình thông qua ngôn ngữ Pascal, phù hợp với học sinh cấp 2.</p>
                            <p className="text-gray-700 mt-2">Giá: $89</p>
                        </div>
                    </div>
                </div>


                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Đánh Giá</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                            <p className="font-semibold text-gray-800">Lý Mạc Sầu
                                <span className="text-yellow-500 flex">
                                    <StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" />
                                </span>
                            </p>
                            <p className="text-gray-700 mt-2">Giảng viên tuyệt vời!</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                            <p className="font-semibold text-gray-800">Dương Quá
                                <span className="text-yellow-500 flex">
                                    <StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1 text-gray-300" />
                                </span>
                            </p>
                            <p className="text-gray-700 mt-2">Bài giảng quá hay!!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetail;
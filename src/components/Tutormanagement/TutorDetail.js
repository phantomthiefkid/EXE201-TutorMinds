import React from 'react';
import { GeoAltFill, MortarboardFill, StarFill, CodeSlash, Star } from 'react-bootstrap-icons';

const TutorDetail = () => {
    return (
        <div className='bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200'>
            <div className="max-w-6xl mx-auto p-4 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 mb-6">
                        <img
                            src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/405341235_1774049269674530_8472061970839104134_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFJUVqz-fUD2ltXZ-nsL8Db_Q6zlIRbcIb9DrOUhFtwhoCloy0xduU5DbSlr_34JAx9dtagA58_5NEts2VEVzeX&_nc_ohc=L4xoalfqFywQ7kNvgFAeqXo&_nc_ht=scontent.fhan14-2.fna&oh=00_AYAg_jRVJWgkIK-sjAoam8Iumf7hV-MzhGqeK_2851eBOA&oe=665C9830"
                            alt="Tutor"
                            className="rounded-full w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-0 border-4 border-gray-200 shadow-sm"
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800">Thầy Giáo Ba</h1>
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                <MortarboardFill color='blue' className="w-5 h-5 mr-2" />
                                <p className="text-md">Chuyên môn: Phát triển Web, Lập trình, v.v.</p>
                            </div>
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                <CodeSlash color='#FAC140' className="w-5 h-5 mr-2" />
                                <p className="text-md">Kinh nghiệm: 10 năm trong ngành</p>
                            </div>
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                <GeoAltFill color='red' className="w-5 h-5 mr-2" />
                                <p className="text-md">Địa điểm: New York, USA</p>
                            </div>
                            <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                                <Star color='#FFD700' className="w-5 h-5 mr-2" />
                                <p className="text-md">Rating: 4.5/5.0</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-700 text-md mt-4">
                            Thầy Giáo Ba là một chuyên gia với hơn 10 năm kinh nghiệm trong lĩnh vực phát triển web và lập trình. Với niềm đam mê giảng dạy, Thầy đã đào tạo hàng nghìn học viên và giúp họ đạt được mục tiêu nghề nghiệp của mình. Thầy không chỉ truyền đạt kiến thức mà còn chia sẻ kinh nghiệm thực tế.
                        </p>
                        <p className="text-gray-700 text-md mt-4">
                            Phong cách giảng dạy của Thầy Giáo Ba được nhiều học viên đánh giá cao nhờ vào sự tận tâm và dễ hiểu. Thầy luôn cập nhật những công nghệ mới nhất để mang đến cho học viên những kiến thức hiện đại và có tính ứng dụng cao. Với môi trường học tập thân thiện và chuyên nghiệp.
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Khóa Học Đã Dạy</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-800">React cho Người Mới Bắt Đầu</h3>
                            <p className="text-gray-700 mt-2">Học những điều cơ bản về React.</p>
                            <p className="text-gray-700 mt-2">Giá: $99</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-lg font-semibold text-gray-800">JavaScript Nâng Cao</h3>
                            <p className="text-gray-700 mt-2">Khám phá sâu hơn về JavaScript.</p>
                            <p className="text-gray-700 mt-2">Giá: $149</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">Đánh Giá</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                            <p className="font-semibold text-gray-800">John Doe
                                <span className="text-yellow-500 flex">
                                    <StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" />
                                </span>
                            </p>
                            <p className="text-gray-700 mt-2">Giảng viên tuyệt vời!</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
                            <p className="font-semibold text-gray-800">Jane Smith
                                <span className="text-yellow-500 flex">
                                    <StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1" /><StarFill className="w-4 h-4 mr-1 text-gray-300" />
                                </span>
                            </p>
                            <p className="text-gray-700 mt-2">Rất hiểu biết.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetail;

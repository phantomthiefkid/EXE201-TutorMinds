import React, { useState } from 'react';

const TutorCard = ({ tutor }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-64 text-center">
            <img className="rounded-full w-24 h-24 mx-auto" src={tutor.profilePicture} alt={`${tutor.name}'s profile`} />
            <h3 className="mt-4 font-semibold text-lg">{tutor.name}</h3>
            <p className="text-gray-600">{tutor.subject}</p>
            <p className="text-gray-600">{tutor.location}</p>
            <p className="mt-2 text-yellow-500">Rating: {tutor.rating}</p>
        </div>
    );
};

const TutorList = () => {
    const tutors = [
        { id: 1, name: 'Nguyễn Gia Vinh', subject: 'Toán', location: 'Hà Nội', rating: 4.5, profilePicture: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/277765653_1390227648056696_8469195222678842890_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGYFqMnfkxSf0TN9LN9sufnQ-9eoCfRfvFD716gJ9F-8eO3JYbaY5WXpV58Fuysdo_ENJnzuT410BU_kps85aPK&_nc_ohc=SpfvFrW-HikQ7kNvgFXeLq7&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYAa5MSLBYWFTVJvdmhN7QKDHST8nvOz485KMse6XH0JVg&oe=6656FD76' },
        { id: 2, name: 'Elon Musk', subject: 'Khoa học', location: 'TP. Hồ Chí Minh', rating: 4.7, profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/640px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg' },
        { id: 3, name: 'Nguyễn Hoàng Thiện', subject: 'Tiếng Anh', location: 'Đà Nẵng', rating: 4.9, profilePicture: 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/305400449_4033493923543248_7133759938248476730_n.jpg?stp=dst-jpg_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHUp8t60LHVtb3PlyTStB-BcWY8HGEwN_ZxZjwcYTA39syHW9j-jLI_Za9uiWh01SjX5FnUYKBcoZPyd7F7w8Y2&_nc_ohc=W3HgAr7G5rgQ7kNvgHHoTQh&_nc_ht=scontent.fsgn2-5.fna&oh=00_AYAoC39r3SXW8NDkkCNDRRp75e4iIEdJ4e3pj8EgosX0FA&oe=6657203C' },
        { id: 4, name: 'Đặng Thiêm Lộc', subject: 'Lịch sử', location: 'Hải Phòng', rating: 4.6, profilePicture: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.6435-9/160182776_981295519068884_3675899881147319937_n.jpg?stp=c0.23.206.206a_dst-jpg_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFdoIGNtHPMummP6u6C35hXMTdBcyodV0AxN0FzKh1XQIG2RPMjQTTjhxHEdD1wvpeS6A8JjStpa_2OrknK_89X&_nc_ohc=u-ZcQTR_u28Q7kNvgHmPzFA&_nc_ht=scontent.fsgn2-8.fna&oh=00_AYCSN1Yfu7b80fFN7VxVGUcflCWHll3RWlpZpJjmzkUxAQ&oe=667897BB' },
        { id: 5, name: 'Nguyễn Tắn', subject: 'Sinh học', location: 'Cần Thơ', rating: 4.8, profilePicture: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/422911099_1079163673307571_3799414645168137984_n.jpg?stp=dst-jpg_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEstcAO0PgeSZ1Pn5KhwcXq9_r-E9Ym30D3-v4T1ibfQBE13gcukayN5kYEeRoJi3vnzZ0ZZGJA4bvyFTqbqVFp&_nc_ohc=nJggUkfN5GIQ7kNvgHlIJV7&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYCQLd7lrQ2I_qdBnaxhnLVqUeC8fgmLvlXS7GSgVsb1EQ&oe=6656F171' },
        { id: 6, name: 'Hoàng Thị Xuân Quý', subject: 'Vật lý', location: 'Bà Rịa', rating: 4.1, profilePicture: 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png' },
        { id: 7, name: 'Ngô Văn G', subject: 'Vật lý', location: 'Nha Trang', rating: 4.7, profilePicture: 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png' },
        { id: 8, name: 'Đỗ Thị H', subject: 'Tin học', location: 'Buôn Ma Thuột', rating: 4.9, profilePicture: 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png' },
        { id: 9, name: 'Bùi Văn I', subject: 'Tiếng Tây Ban Nha', location: 'Biên Hòa', rating: 4.6, profilePicture: 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png' },
        { id: 10, name: 'Đặng Thị K', subject: 'Địa lý', location: 'Hạ Long', rating: 4.8, profilePicture: 'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png' },
    ];

    const [selectedSubject, setSelectedSubject] = useState('');

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };

    const filteredTutors = selectedSubject
        ? tutors.filter(tutor => tutor.subject === selectedSubject)
        : tutors;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Danh sách gia sư</h1>
            <div className="mb-6 flex justify-center">
                <label className="block text-lg font-medium text-gray-700 mr-2">Lọc theo môn học:</label>
                <select
                    className="block p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                >
                    <option value="">Tất cả các môn học</option>
                    <option value="Toán">Toán</option>
                    <option value="Khoa học">Khoa học</option>
                    <option value="Tiếng Anh">Tiếng Anh</option>
                    <option value="Lịch sử">Lịch sử</option>
                    <option value="Sinh học">Sinh học</option>
                    <option value="Hóa học">Hóa học</option>
                    <option value="Vật lý">Vật lý</option>
                    <option value="Tin học">Tin học</option>
                    <option value="Tiếng Tây Ban Nha">Tiếng Tây Ban Nha</option>
                    <option value="Địa lý">Địa lý</option>
                </select>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {filteredTutors.map(tutor => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                ))}
            </div>
        </div>
    );
};

export default TutorList;

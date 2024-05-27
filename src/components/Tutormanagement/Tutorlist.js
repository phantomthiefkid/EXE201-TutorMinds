import React, { useState } from "react";
import { Check2Circle, GeoAlt } from "react-bootstrap-icons";

const TutorCard = ({ tutor }) => {
  return (
    // <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow w-64 text-center">
    //     <img className="rounded-full w-24 h-24 mx-auto" src={tutor.profilePicture} alt={`${tutor.name}'s profile`} />
    //     <h3 className="mt-4 font-semibold text-lg">{tutor.name}</h3>
    //     <p className="text-gray-600">{tutor.subject}</p>
    //     <p className="text-gray-600">{tutor.location}</p>
    //     <p className="mt-2 text-yellow-500">Rating: {tutor.rating}</p>
    // </div>

    <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-10 bg-white shadow-xl rounded-lg text-gray-900">
      <div class="rounded-t-lg h-32 overflow-hidden">
        <img
          class="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img
          class="object-cover object-center h-32"
          src={tutor.profilePicture}
          alt={`${tutor.name}'s profile`}
        />
      </div>
      <div class="text-center mt-2">
        <div className="flex justify-center">
          <h2 class="font-semibold">{tutor.name}</h2>
          <span class="text-green-500 text-xl inline-block ml-2">
            <Check2Circle />
          </span>
        </div>
        <p class="text-sky-300 text-xl">{tutor.subject}</p>

        <p className="text-gray-500 text-sm">{tutor.intro}</p>
      </div>
      <div className="py-4 bg-gray-100 flex justify-between">
        <p className="flex">
          {" "}
          <GeoAlt className="mr-2 text-blue-700" size={20} />
          {tutor.location}
        </p>
        <div class="flex gap-0.5">
          <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <svg class="h-6 w-6 shrink-0 fill-gray-300" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <svg class="h-6 w-6 shrink-0 fill-gray-300" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <p className="ml-3 text-lg mr-2">{tutor.rating}</p>
        </div>
      </div>
    </div>
  );
};

const TutorList = () => {
  const tutors = [
    {
      id: 1,
      name: "Nguyễn Gia Vinh",
      subject: "Toán",
      location: "Hà Nội",
      intro:
        "Tôi cam kết giúp các em tiến bộ rõ rệt về kiến thức và kỹ năng Toán học, yêu thích và tự tin học Toán.",
      rating: 4.5,
      profilePicture:
        "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/277765653_1390227648056696_8469195222678842890_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGYFqMnfkxSf0TN9LN9sufnQ-9eoCfRfvFD716gJ9F-8eO3JYbaY5WXpV58Fuysdo_ENJnzuT410BU_kps85aPK&_nc_ohc=SpfvFrW-HikQ7kNvgFXeLq7&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYAa5MSLBYWFTVJvdmhN7QKDHST8nvOz485KMse6XH0JVg&oe=6656FD76",
    },
    {
      id: 2,
      name: "Elon Musk",
      subject: "Khoa học",
      location: "TP. Hồ Chí Minh",
      intro:
        "Tôi cam kết giúp các e nâng cao kiến thức và kỹ năng khoa học, phát triển tư duy sáng tạo, khả năng giải quyết vấn đề.",
      rating: 4.7,
      profilePicture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/640px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg",
    },
    {
      id: 3,
      name: "Nguyễn Hoàng Thiện",
      subject: "Tiếng Anh",
      location: "Đà Nẵng",
      intro:
        "Tôi cam kết giúp học sinh tự tin giao tiếp bằng tiếng Anh, nâng cao kiến thức và kỹ năng tiếng Anh.",
      rating: 4.9,
      profilePicture:
        "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/305400449_4033493923543248_7133759938248476730_n.jpg?stp=dst-jpg_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHUp8t60LHVtb3PlyTStB-BcWY8HGEwN_ZxZjwcYTA39syHW9j-jLI_Za9uiWh01SjX5FnUYKBcoZPyd7F7w8Y2&_nc_ohc=W3HgAr7G5rgQ7kNvgHHoTQh&_nc_ht=scontent.fsgn2-5.fna&oh=00_AYAoC39r3SXW8NDkkCNDRRp75e4iIEdJ4e3pj8EgosX0FA&oe=6657203C",
    },
    {
      id: 4,
      name: "Đặng Thiêm Lộc",
      subject: "Lịch sử",
      location: "Hải Phòng",
      intro:
        "Tôi cam kết giúp học sinh nâng cao kiến thức và kỹ năng lịch sử, phát triển ý thức yêu nước, tự hào dân tộc.",
      rating: 4.6,
      profilePicture:
        "https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.6435-9/160182776_981295519068884_3675899881147319937_n.jpg?stp=c0.23.206.206a_dst-jpg_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFdoIGNtHPMummP6u6C35hXMTdBcyodV0AxN0FzKh1XQIG2RPMjQTTjhxHEdD1wvpeS6A8JjStpa_2OrknK_89X&_nc_ohc=u-ZcQTR_u28Q7kNvgHmPzFA&_nc_ht=scontent.fsgn2-8.fna&oh=00_AYCSN1Yfu7b80fFN7VxVGUcflCWHll3RWlpZpJjmzkUxAQ&oe=667897BB",
    },
    {
      id: 5,
      name: "Nguyễn Tắn",
      subject: "Địa lý",
      location: "Cần Thơ",
      intro:
        "Tôi cam kết giúp học sinh tìm hiểu về Trái Đất, phát triển khả năng ghi nhớ và khai phá tiềm năng khám phá thế giới.",
      rating: 4.8,
      profilePicture:
        "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/422911099_1079163673307571_3799414645168137984_n.jpg?stp=dst-jpg_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEstcAO0PgeSZ1Pn5KhwcXq9_r-E9Ym30D3-v4T1ibfQBE13gcukayN5kYEeRoJi3vnzZ0ZZGJA4bvyFTqbqVFp&_nc_ohc=nJggUkfN5GIQ7kNvgHlIJV7&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYCQLd7lrQ2I_qdBnaxhnLVqUeC8fgmLvlXS7GSgVsb1EQ&oe=6656F171",
    },
    {
      id: 6,
      name: "Hoàng Thị Xuân Quý",
      subject: "Tiếng Việt",
      location: "Bà Rịa",
      intro:
        "Tôi giúp các em nắm vững kiến thức ngữ âm, chính tả, ngữ pháp. Rèn luyện kỹ năng đọc viết, nghe, nói.",
      rating: 4.1,
      profilePicture:
        "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png",
    },
  ];

  const [selectedSubject, setSelectedSubject] = useState("");

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const filteredTutors = selectedSubject
    ? tutors.filter((tutor) => tutor.subject === selectedSubject)
    : tutors;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Danh sách gia sư</h1>
      <div className="mb-6 flex justify-center">
        <label className="block text-lg font-medium text-gray-700 mr-2">
          Lọc theo môn học:
        </label>
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
          <option value="Tiếng Việt">Tiếng Việt</option>
          <option value="Hóa học">Hóa học</option>
          <option value="Vật lý">Vật lý</option>
          <option value="Tin học">Tin học</option>
          <option value="Tiếng Tây Ban Nha">Tiếng Tây Ban Nha</option>
          <option value="Địa lý">Địa lý</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredTutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default TutorList;

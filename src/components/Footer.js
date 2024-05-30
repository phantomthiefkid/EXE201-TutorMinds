import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-start">
          {/* Company Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/444151589_1877086456037477_1111746622231164736_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFWMFxBN3oBRpFAMIm2sGJSsVmeo7cxhPKxWZ6jtzGE8jXgbkR5Nk2mWoD5kF9PiAabOJAjeXYkWFn-nmXA01la&_nc_ohc=edeqdBUQWB8Q7kNvgFWqCMb&_nc_ht=scontent.fsgn2-6.fna&oh=00_AYCaPj40SYxC-4bRD6Rw-7Ww4P599NAY0fVW_iaFEljP-A&oe=6655FC8A"
                alt="Logo"
                className="h-10 w-10 rounded-full"
              />
              <span className="text-2xl font-bold ml-4">TutorMinds</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed p-2">
              TutorMinds là nền tảng kết nối học sinh với đội ngũ gia sư trực
              tuyến uy tín, giàu kinh nghiệm và tâm huyết. Chúng tôi cam kết
              mang đến cho bạn trải nghiệm học tập hiệu quả, tiện lợi và phù
              hợp với mọi nhu cầu.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Course Info Section */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Thông tin khóa học</h2>
            <ul className="text-gray-400 space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Ngoại ngữ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Toán học
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Văn học
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Bấm máy tính casio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Nhiều môn học khác
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Liên hệ với chúng tôi</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

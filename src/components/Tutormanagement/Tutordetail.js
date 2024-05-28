import React from 'react';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faComments, faUserGraduate, faBook } from '@fortawesome/free-solid-svg-icons';

const Tutordetail = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <img 
            src='https://th.bing.com/th/id/R.d2abe87782c2f9c4d68254bb0b534e75?rik=%2bYaLHYwPAyumnQ&pid=ImgRaw&r=0'
            alt="Abdul Bari" 
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Abdul Bari</h1>
            <p className="text-sm text-gray-600">Professional Programmer and Educator</p>
            <div className="flex items-center text-yellow-500">
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              <span className="text-xl font-bold">4.6</span>
              <span className="ml-2 text-gray-600">Instructor Rating</span>
            </div>
            <div className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              97,934 Reviews
            </div>
            <div className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
              325,911 Students
            </div>
            <div className="text-gray-600 flex items-center">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              5 Courses
            </div>
          </div>
        </div>
        <p className="text-gray-700">
          Having over 20 years of experience in the computer science and information technology fields. Taught many
          courses at the University level to thousands of students.
          <br/><br/>
          Have been training students and employees on various programming languages like, C++, VC++, JAVA
          technologies and Web Development.
          <br/><br/>
          Have Delivered Seminars on various topics like Distributed System, Cloud Computing and Big Data.
          <br/><br/>
          Have been into web development using technologies like, Java, ASP.NET and PHP.
          <br/><br/>
          Running a Youtube Channel on "Algorithms", which has help many university students in their academics.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">4.6 course rating • 20K ratings</h2>
        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white">PS</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-900 font-bold">Prarthana S.</p>
                <p className="text-gray-600">a month ago</p>
              </div>
            </div>
            <p className="text-gray-700">
              As a beginner to Java the tutor has taken efforts to teach each and every concept very well without
              making it too lengthy giving explanation in a very simple way. It was easy to understand and he has covered even the...
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white">AS</span>
              </div>
              <div className="ml-4">
                <p className="text-gray-900 font-bold">Abhay S.</p>
                <p className="text-gray-600">2 months ago</p>
              </div>
            </div>
            <p className="text-gray-700">
              I have experienced very good and the way of describing the topics are very unique, I got the all topics very
              clearly and i have make topics practical myself without help of anyone and now I have better knowledge from past...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutordetail;

import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LessonVideo = () => {
    const {id} = useParams();
    
    const URL = `https://fams-management.tech/course/${id}`;
    const token = localStorage.getItem('token');
    const [lessons, setLessons] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [currentVideoUrl, setCurrentVideoUrl] = useState();
    const [autoPlay, setAutoPlay] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                if (data) {
                    setLessons(data.lessonsList);
                    setCurrentVideoUrl(data.lessonsList[0].url)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClickVideo = (url) => {
        setCurrentVideoUrl(url);
        setAutoPlay(true);
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='w-full bg-slate-50'>
            <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:mx-20">
                <div className="w-full md:w-9/12">
                    <div className="relative mt-10" style={{ paddingTop: '60%' }}>
                        <ReactPlayer
                            url={currentVideoUrl}
                            controls={true}
                            width="100%"
                            height="100%"
                            playing={true}
                            className="absolute top-0 right-0"
                        />
                    </div>
                    <div className="mt-4 p-4">
                        <h3 className="text-xl font-semibold mb-4">Đánh giá</h3>
                        {/* Feedback 1 */}
                        <div className="flex items-start space-x-4 mb-4 p-4 shadow-md">
                            <img
                                className="w-10 h-10 rounded-full"
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                alt="Avatar 1"
                            />
                            <div>
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold text-gray-800">Nguyễn Văn A</span>
                                    <div className="flex ml-2 text-yellow-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                    </div>
                                </div>
                                <p className="text-gray-600">Khóa học rất hữu ích, giảng viên nhiệt tình và kiến thức thực tế. Cảm ơn!</p>
                            </div>
                        </div>
                        {/* Feedback 2 */}
                        <div className="flex items-start space-x-4 mb-4 p-4 shadow-md">
                            <img
                                className="w-10 h-10 rounded-full"
                                src="https://randomuser.me/api/portraits/women/2.jpg"
                                alt="Avatar 2"
                            />
                            <div>
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold text-gray-800">Trần Thị B</span>
                                    <div className="flex ml-2 text-yellow-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                    </div>
                                </div>
                                <p className="text-gray-600">Khóa học tuyệt vời! Các bài giảng rõ ràng và dễ hiểu. Mình đã học được rất nhiều.</p>
                            </div>
                        </div>
                        {/* Feedback 3 */}
                        <div className="flex items-start space-x-4 p-4 shadow-md">
                            <img
                                className="w-10 h-10 rounded-full"
                                src="https://randomuser.me/api/portraits/men/3.jpg"
                                alt="Avatar 3"
                            />
                            <div>
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold text-gray-800">Lê Văn C</span>
                                    <div className="flex ml-2 text-yellow-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.5 3 1-5.5L1 8.5l5.5-1L10 2l2.5 5.5 5.5 1-4 3.5 1 5.5z" /></svg>
                                    </div>
                                </div>
                                <p className="text-gray-600">Khóa học rất bổ ích, giúp tôi nâng cao kiến thức và kỹ năng. Cảm ơn giảng viên!</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full md:w-3/12 bg-gray-50 rounded-t-lg border border-blue-200 shadow-xl mt-14 p-6">
                    <h3 className="text-xl text-blue-500 font-semibold mb-6">Danh sách video bài giảng</h3>
                    <div id="accordion-collapse" className="space-y-4">
                        {lessons.map((lesson, index) => (
                            <div key={lesson.id} className={`${currentVideoUrl === lesson.url ? "bg-slate-200" : ''} w-full`}>
                                <h2 id={`accordion-collapse-heading-${lesson.id}`}>
                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full p-4 font-medium text-left text-gray-500 border-b border-gray-200 focus:outline-none"
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={activeIndex === index}
                                        aria-controls={`accordion-collapse-body-${lesson.id}`}
                                    >
                                        <span>{lesson.title}</span>
                                        <svg
                                            className={`w-4 h-4 transform ${activeIndex === index ? "rotate-180" : ""}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </button>
                                </h2>
                                <div
                                    id={`accordion-collapse-body-${lesson.id}`}
                                    className={`${activeIndex === index ? "block" : "hidden"} p-4 flex gap-4 bg-gray-50 border border-blue-200`}
                                    aria-labelledby={`accordion-collapse-heading-${lesson.id}`}
                                >
                                    <p className=" text-gray-500">{lesson.description}: </p>

                                    <button
                                        onClick={() => handleClickVideo(lesson.url)}
                                        className="text-blue-500 hover:underline focus:outline-none"
                                    >
                                        Xem video bài giảng
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default LessonVideo;

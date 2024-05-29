import React, { useState } from "react";

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const courses = [
    {
      id: 1,
      name: "Round white portable speaker",
      price: "$220",
      description:
        "Introducing our sleek round white portable speaker, the epitome of style and sound! Elevate your auditory experience with this compact yet powerful device that delivers crystal-clear audio wherever you go.",
      rating: 4.6,
      totalHours: 137.5,
      lectures: 735,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Electronics",
    },
    {
      id: 2,
      name: "Advanced Web Development",
      price: "$180",
      description:
        "Master the latest web development technologies and build professional-grade web applications with our comprehensive course.",
      rating: 4.8,
      totalHours: 120,
      lectures: 600,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Web Development",
    },
    {
      id: 3,
      name: "Data Science Bootcamp",
      price: "$300",
      description:
        "Become a data science expert with our intensive bootcamp covering everything from Python programming to machine learning.",
      rating: 4.9,
      totalHours: 150,
      lectures: 800,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Data Science",
    },
    {
      id: 4,
      name: "Beginner's Guide to Python",
      price: "$100",
      description:
        "Learn Python programming from scratch with this beginner-friendly course designed to get you up and running quickly.",
      rating: 4.2,
      totalHours: 80,
      lectures: 400,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Programming",
    },
    {
      id: 5,
      name: "Digital Marketing Mastery",
      price: "$150",
      description:
        "Gain expertise in digital marketing strategies and tools with our hands-on course, perfect for marketers of all levels.",
      rating: 4.5,
      totalHours: 100,
      lectures: 500,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Marketing",
    },
    {
      id: 6,
      name: "JavaScript Essentials",
      price: "$130",
      description:
        "Learn the fundamentals of JavaScript, the most popular programming language for web development.",
      rating: 4.7,
      totalHours: 90,
      lectures: 450,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Programming",
    },
    {
      id: 7,
      name: "React for Beginners",
      price: "$160",
      description:
        "Get started with React, the powerful JavaScript library for building user interfaces.",
      rating: 4.8,
      totalHours: 110,
      lectures: 550,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Web Development",
    },
    {
      id: 8,
      name: "Machine Learning A-Z",
      price: "$320",
      description:
        "An in-depth course on machine learning algorithms and techniques using Python.",
      rating: 4.9,
      totalHours: 200,
      lectures: 900,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Data Science",
    },
    {
      id: 9,
      name: "SEO Fundamentals",
      price: "$140",
      description:
        "Learn the basics of search engine optimization to improve your website's visibility.",
      rating: 4.4,
      totalHours: 70,
      lectures: 350,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Marketing",
    },
    {
      id: 10,
      name: "Responsive Web Design",
      price: "$170",
      description:
        "Create responsive websites that look great on all devices, from mobile phones to desktop computers.",
      rating: 4.6,
      totalHours: 100,
      lectures: 500,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Web Development",
    },
    {
      id: 11,
      name: "Data Visualization with Python",
      price: "$210",
      description:
        "Master data visualization techniques using popular Python libraries like Matplotlib and Seaborn.",
      rating: 4.7,
      totalHours: 130,
      lectures: 650,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Data Science",
    },
    {
      id: 12,
      name: "Email Marketing Strategies",
      price: "$110",
      description:
        "Learn effective email marketing strategies to boost your business and engage with your audience.",
      rating: 4.3,
      totalHours: 60,
      lectures: 300,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Marketing",
    },
    {
      id: 13,
      name: "Advanced CSS Techniques",
      price: "$140",
      description:
        "Enhance your web development skills with advanced CSS techniques for creating stunning websites.",
      rating: 4.5,
      totalHours: 80,
      lectures: 400,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Web Development",
    },
    {
      id: 14,
      name: "Introduction to SQL",
      price: "$120",
      description:
        "Learn SQL, the standard language for managing and manipulating databases.",
      rating: 4.6,
      totalHours: 75,
      lectures: 375,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Data Science",
    },
    {
      id: 15,
      name: "Python for Data Analysis",
      price: "$200",
      description:
        "Use Python to perform data analysis and gain insights from large datasets.",
      rating: 4.8,
      totalHours: 140,
      lectures: 700,
      img: "https://pagedone.io/asset/uploads/1701162826.png",
      subject: "Data Science",
    },
  ];
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || course.subject === filter)
    );
  });

  return (
    <>
      <div className="w-full max-w-7xl px-4 md:px-5 mx-auto mt-10">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 rounded w-1/3"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select className="border p-2 rounded" value={filter} onChange={handleFilter}>
            <option value="">Filter by Subject</option>
            <option value="Electronics">Electronics</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Programming">Programming</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        {filteredCourses.map((course) => (
          <div key={course.id} className="rounded-sm border-2 border-gray-200 p-4 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto">
            <div className="col-span-12 lg:col-span-2 img box">
              <img
                src={course.img}
                alt={course.name}
                className="max-lg:w-full lg:w-[200px]"
              />
            </div>
            <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
              <div className="flex items-center justify-between w-full mb-4">
                <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                  {course.name}
                </h5>
                <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                  {course.price}
                </h6>
              </div>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                {course.description}{" "}
                <a href="javascript:;" className="text-indigo-600">
                  More....
                </a>
              </p>
              <div className="flex">
                <div className="flex items-center gap-4">
                  <div className="flex gap-0.5">
                    <p className="text-lg mr-2">{course.rating}</p>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-6 w-6 shrink-0 ${i < Math.floor(course.rating) ? "fill-amber-400" : "fill-gray-300"}`}
                        viewBox="0 0 256 256"
                      >
                        <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                {course.totalHours} total hours . {course.lectures} lectures . All Video
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseList;

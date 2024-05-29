import React, { useState } from "react";
import {
  Check2,
  Laptop,
  FileEarmarkArrowDown,
  Shield,
  GeoAltFill,
  MortarboardFill,
  CodeSlash,
} from "react-bootstrap-icons";

const CourseDetail = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="w-full max-w-full px-4 md:px-5 mx-auto mt-6">
      <div class="text-white flex flex-col h-full min-h-[280px] w-full rounded-sm !bg-gray-900 px-12 py-8">
        <h2 class="text-3xl mb-4">Round White Portable Speaker</h2>
        <p class="text-xl">
          A practical programming course for office workers, academics
          <br />
          and administrators who want to improve their productivity.
        </p>
        <div class="flex gap-0.5 my-4">
          <p className="text-lg mr-2 text-yellow-400">4.7</p>
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
          <p className="text-lg ml-2"> 30 Student</p>
        </div>
        <span className="flex">
          Được tạo bởi <p className="text-indigo-300 px-2">Hoàng Thiện</p>
        </span>
        <span className="mt-4">Cập nhật gần nhất 20/9/2023</span>
      </div>

      <div className="border w-2/4 mt-4 ml-14 p-6">
        <h2 className="text-3xl font-bold">What you'll learn</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left">
          <li class="flex items-start gap-2">
            <Check2 size={30} /> Automate tasks on their computer by writing
            simple.
          </li>
          <li class="flex items-start gap-2">
            <Check2 size={30} /> Programmatically generate and update Excel
            spreadsheets.
          </li>
          <li class="flex items-start gap-2">
            <Check2 size={30} /> Crawl web sites and pull information from
            online sources.
          </li>
          <li class="flex items-start gap-2">
            <Check2 size={30} /> Use Python's debugging tools to quickly figure
            out bugs.
          </li>
          <li class="flex items-start gap-2">
            <Check2 size={30} /> Write programs that can do text pattern
            recognition.
          </li>
          <li class="flex items-start gap-2">
            <Check2 size={30} /> Parse PDFs and Word documents.
          </li>
          <li class="flex items-start gap-2">
            <Check2 size={30} /> Write programs that send out email
            notifications.
          </li>
          <li class="flex items-start gap-2">
            <Check2 size={30} /> Programmatically control the mouse and keyboard
            to click.
          </li>
        </ul>
      </div>

      <div class="-mt-[560px] lg:px-30 xl:px-40 flex justify-end">
        <div class="flex flex-col rounded-sm bg-white text-gray-700 shadow-md lg:h-max lg:scale-110 z-10 translate-y-0 w-2/6 sticky top-0">
          <div class="p-6 text-center">
            <img
              src="https://www.macobserver.com/wp-content/uploads/2019/07/workfeatured-zoom.png"
              alt="video"
              class="w-full h-auto"
            />
            <h3 class="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex justify-center mt-5 mb-2">
              $29.99
            </h3>
            <button class="border w-full py-3 bg-purple-500 text-white font-bold hover:bg-purple-700">
              Add to cart
            </button>
            <button class="border border-black w-full mt-4 py-3 font-bold hover:bg-gray-200">
              Buy now
            </button>
            <h5 class="antialiased tracking-normal font-sans text-xl font-bold leading-snug flex mt-2 mb-2">
              This course includes:
            </h5>
            <span class="flex items-center gap-2">
              <Laptop />
              16 sections • 51 lectures • 9h 30m total length
            </span>
            <span class="flex items-center gap-2">
              <FileEarmarkArrowDown />
              95 downloadable resources
            </span>
            <span class="flex items-center gap-2">
              <Shield />
              Full lifetime access
            </span>
          </div>
        </div>
      </div>

      <div className="ml-14 my-10 w-2/4">
        <h2 className="text-3xl font-bold">Course content</h2>
        <div className="flex justify-between mt-4">
          <p className="">16 sections • 51 lectures • 9h 30m total length</p>
          <p className="text-blue-600 font-bold">Expand all sections</p>
        </div>
        {/* -------------------------------------------------------------------------------------------- */}

        <div id="accordion-collapse" data-accordion="collapse">
          <h2 id="accordion-collapse-heading-1">
            <button
              type="button"
              className="flex items-center w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 gap-3"
              onClick={() => toggleAccordion(1)}
              aria-expanded={activeIndex === 1}
              aria-controls="accordion-collapse-body-1"
            >
              <svg
                className={`w-3 h-3 ${
                  activeIndex === 1 ? "rotate-0" : "rotate-180"
                } shrink-0 transition-transform`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
              <span>What is Flowbite?</span>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            className={`${
              activeIndex === 1 ? "block" : "hidden"
            } p-5 border border-b-0 border-gray-200 `}
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is an open-source library of interactive components built
              on top of Tailwind CSS including buttons, dropdowns, modals,
              navbars, and more.
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Check out this guide to learn how to{" "}
              <a
                href="/docs/getting-started/introduction/"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                get started
              </a>{" "}
              and start developing websites even faster with components on top
              of Tailwind CSS.
            </div>
          </div>

          <h2 id="accordion-collapse-heading-2">
            <button
              type="button"
              className="flex items-center w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 gap-3"
              onClick={() => toggleAccordion(2)}
              aria-expanded={activeIndex === 2}
              aria-controls="accordion-collapse-body-2"
            >
              <svg
                className={`w-3 h-3 ${
                  activeIndex === 2 ? "rotate-0" : "rotate-180"
                } shrink-0 transition-transform`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
              <span>Is there a Figma file available?</span>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-2"
            className={`${
              activeIndex === 2 ? "block" : "hidden"
            } p-5 border border-b-0 `}
            aria-labelledby="accordion-collapse-heading-2"
          >
            <div className="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is first conceptualized and designed using the Figma
              software so everything you see in the library has a design
              equivalent in our Figma file.
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Check out the{" "}
              <a
                href="https://flowbite.com/figma/"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Figma design system
              </a>{" "}
              based on the utility classes from Tailwind CSS and components from
              Flowbite.
            </div>
          </div>

          <h2 id="accordion-collapse-heading-3">
            <button
              type="button"
              className="flex items-center w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 gap-3"
              onClick={() => toggleAccordion(3)}
              aria-expanded={activeIndex === 3}
              aria-controls="accordion-collapse-body-3"
            >
              <svg
                className={`w-3 h-3 ${
                  activeIndex === 3 ? "rotate-0" : "rotate-180"
                } shrink-0 transition-transform`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
              <span>
                What are the differences between Flowbite and Tailwind UI?
              </span>
            </button>
          </h2>
          <div
            id="accordion-collapse-body-3"
            className={`${
              activeIndex === 3 ? "block" : "hidden"
            } p-5 border border-t-0 border-gray-200`}
            aria-labelledby="accordion-collapse-heading-3"
          >
            <div className="mb-2 text-gray-500 dark:text-gray-400">
              The main difference is that the core components from Flowbite are
              open source under the MIT license, whereas Tailwind UI is a paid
              product. Another difference is that Flowbite relies on smaller and
              standalone components, whereas Tailwind UI offers sections of
              pages.
            </div>
            <div className="mb-2 text-gray-500 dark:text-gray-400">
              However, we actually recommend using both Flowbite, Flowbite Pro,
              and even Tailwind UI as there is no technical reason stopping you
              from using the best of two worlds.
            </div>
            <div className="mb-2 text-gray-500 dark:text-gray-400">
              Learn more about these technologies:
            </div>
            <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
              <li>
                <a
                  href="https://flowbite.com/pro/"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Flowbite Pro
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindui.com/"
                  rel="nofollow"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/*-----------------------------------------------------------------------------------------------------------*/}
        <h2 className="text-3xl font-bold py-5">Requirements</h2>
        <ul class="list-disc list-inside ml-4 space-y-2">
          <li>No programming experience is required.</li>
          <li>
            Downloading and installing Python is covered at the start of the
            course.
          </li>
          <li>
            Basic computer skills: surfing websites, running programs, saving
            and opening documents, etc.
          </li>
        </ul>
      </div>

      <div className="w-full max-w-7xl mx-14 mb-5">
        <h2 className="text-3xl font-bold">Description</h2>
        <div className="my-2">
          If you're an office worker, student, administrator, or just want to
          become more productive with your computer, programming will allow you
          write code that can automate tedious tasks. This course follows the
          popular (and free!) book, Automate the Boring Stuff with Python.
        </div>
        <div>
          Automate the Boring Stuff with Python was written for people who want
          to get up to speed writing small programs that do practical tasks as
          soon as possible. You don't need to know sorting algorithms or
          object-oriented programming, so this course skips all the computer
          science and concentrates on writing code that gets stuff done.
        </div>
        <p>
          This course is for complete beginners and covers the popular Python
          programming language. You'll learn basic concepts as well as:
        </p>

        <h2 className="text-3xl font-bold py-5">Who this course is for:</h2>
        <ul class="list-disc list-inside ml-4 space-y-2">
          <li>
            Office workers, students, small/home business workers, and
            administrators would want to improve their productivity.
          </li>
          <li>
            Aspiring software engineers who want to add skills to their
            programming toolbelt.
          </li>
          <li>
            Computer users who have heard the "learn to code" message, but want
            practical reasons to learn programming.
          </li>
          <li>
            Experienced Python software engineers can skip the first half of the
            course, but may find the later parts that cover various third-party
            modules helpful.
          </li>
        </ul>

        <div className="border mt-4 p-6">
          <h2 className="text-3xl font-bold mb-5">Featured review</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-2">
            <img
              src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/405341235_1774049269674530_8472061970839104134_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFJUVqz-fUD2ltXZ-nsL8Db_Q6zlIRbcIb9DrOUhFtwhoCloy0xduU5DbSlr_34JAx9dtagA58_5NEts2VEVzeX&_nc_ohc=L4xoalfqFywQ7kNvgFAeqXo&_nc_ht=scontent.fhan14-2.fna&oh=00_AYAg_jRVJWgkIK-sjAoam8Iumf7hV-MzhGqeK_2851eBOA&oe=665C9830"
              alt="Tutor"
              className="rounded-full w-28 h-28 md:w-28 md:h-28 mb-4 md:mb-0 border-4 border-gray-200 shadow-sm"
            />
            <div className="text-center md:text-left">
              <h1 className="text-xl font-bold text-gray-800">Thầy Giáo Ba</h1>
              <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                <p className="text-lg">22 courses</p>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                <p className="text-lg">2 review</p>
              </div>
            </div>
          </div>
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
            <p className="text-lg ml-2"> 2 year ago</p>
          </div>
          <p>
            Amazed by Al's knowledge + teaching abilities. Exceeded all my
            expectations! Especially enjoyed the GUI automation. Actually wish I
            would have found this course while I was still working in tech years
            ago...could have written myself scripts and saved our Engineering
            team (and myself) lots of time. Over the past two weeks have written
            scripts that save time at work and even a couple for the wife (who
            now thinks I'm brilliant) so that's pretty great.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

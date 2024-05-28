import React from "react";

const CourseList = () => {
  return (
    <>
      <div class="w-full max-w-7xl px-4 md:px-5 mx-auto mt-10">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 rounded w-1/3"
          />
          <select className="border p-2 rounded">
            <option value="">Filter by Course</option>
            <option value="best">Bestseller</option>
            <option value="tutor">Bad</option>
            <option value="student">Good</option>
          </select>
        </div>
        <div class="rounded-sm border-2 border-gray-200 p-4 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto">
          <div class="col-span-12 lg:col-span-2 img box">
            <img
              src="https://pagedone.io/asset/uploads/1701162826.png"
              alt="speaker image"
              class="max-lg:w-full lg:w-[200px] "
            />
          </div>
          <div class="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
            <div class="flex items-center justify-between w-full mb-4">
              <h5 class="font-manrope font-bold text-2xl leading-9 text-gray-900">
                Round white portable speaker
              </h5>
              <h6 class="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                $220
              </h6>
            </div>
            <p class="font-normal text-base leading-7 text-gray-500 mb-6">
              Introducing our sleek round white portable speaker, the epitome of
              style and sound! Elevate your auditory experience with this
              compact yet powerful device that delivers crystal-clear audio
              wherever you go.{" "}
              <a href="javascript:;" class="text-indigo-600">
                More....
              </a>
            </p>
            <div class="flex">
              <div class="flex items-center gap-4">
                <div class="flex gap-0.5">
                  <p className="text-lg mr-2">4.6</p>
                  <svg
                    class="h-6 w-6 shrink-0 fill-amber-400"
                    viewBox="0 0 256 256"
                  >
                    <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                  </svg>
                  <svg
                    class="h-6 w-6 shrink-0 fill-amber-400"
                    viewBox="0 0 256 256"
                  >
                    <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                  </svg>
                  <svg
                    class="h-6 w-6 shrink-0 fill-amber-400"
                    viewBox="0 0 256 256"
                  >
                    <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                  </svg>
                  <svg
                    class="h-6 w-6 shrink-0 fill-gray-300"
                    viewBox="0 0 256 256"
                  >
                    <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                  </svg>
                  <svg
                    class="h-6 w-6 shrink-0 fill-gray-300"
                    viewBox="0 0 256 256"
                  >
                    <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <p class="font-normal text-base leading-7 text-gray-500 mb-6">
              137.5 total hours . 735 lectures . All Video
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseList;

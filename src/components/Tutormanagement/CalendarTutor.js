import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

import "../Tutormanagement/ModalCalendar.css";
import { getEmailDataFromToken } from "../../redux/auth/loginSlice";
import { fetchCalendar } from "../../redux/calendar/Calendar";

const CalendarTutor = () => {
  const teacher_email = getEmailDataFromToken();
  console.log("email", teacher_email);
  const dispatch = useDispatch();
  const calendar = useSelector((state) => state.calendar.calendar);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [weekStart, setWeekStart] = useState(
    startOfWeek(currentWeek, { weekStartsOn: 0 })
  );
  const [weekEnd, setWeekEnd] = useState(
    endOfWeek(currentWeek, { weekStartsOn: 0 })
  );

  const slotTimes = [
    "7h30 - 9h30",
    "10h - 12h",
    "12h30 - 15h",
    "15h30 - 16h30",
    "17h - 19h",
    "19h30 - 21h30",
  ];
  useEffect(() => {
    setWeekStart(startOfWeek(currentWeek, { weekStartsOn: 0 }));
    setWeekEnd(endOfWeek(currentWeek, { weekStartsOn: 0 }));
  }, [currentWeek]);

  useEffect(() => {
    const startDate = format(weekStart, "yyyy-MM-dd");
    const endDate = format(weekEnd, "yyyy-MM-dd");
    dispatch(fetchCalendar({ teacher_email, startDate, endDate }));
  }, [dispatch, teacher_email, weekStart, weekEnd]);

  const prevWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const nextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  const renderXIcon = (day, slot) => {
    if (calendar && calendar.length > 0) {
      const calendarItem = calendar.find(
        (item) =>
          format(new Date(item.date), "yyyy-MM-dd") ===
          format(day, "yyyy-MM-dd")
      );
      if (calendarItem) {
        const conversationSlot = calendarItem.conversationSlots.find(
          (conversation) => conversation.slot === slot
        );
        if (conversationSlot && conversationSlot.conversationList.length > 0) {
          return (
            <p className="text-green-500 font-bold">
              {conversationSlot.conversationList[0].title}
            </p>
          );
        }
      }
    }
    return <p className="text-gray-500 text-lg">-</p>;
  };

  return (
    <div className="mb-10">
      <h2 className="text-3xl font-semibold leading-tight text-center text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-4 py-2 shadow-md">
        Lịch dạy của tôi
      </h2>
      <div className="flex justify-center mt-4">
        <div className="w-full max-w-7xl">
          <div className=" calendar-head flex justify-between items-center my-4">
            <button className="btn" onClick={prevWeek}>
              <CaretLeftFill color="#707575" size="30" />
            </button>
            <h3 className="m-0 text-lg text-gray-500">
              {format(weekStart, "MMMM yyyy")}
            </h3>
            <button className="btn" onClick={nextWeek}>
              <CaretRightFill color="#707575" size="30" />
            </button>
          </div>

          <div className="overflow-x-auto shadow-xl rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr className="bg-gray-600 text-white">
                  <th className="text-red-500">Week</th>
                  <th>Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr className="calendar-cell">
                  <tr className="calendar-cell">
                    <td colSpan="8" className="text-sky-500 font-bold">
                      {format(weekStart, "dd/MM")} - {format(weekEnd, "dd/MM")}
                    </td>
                  </tr>
                  {Array.from({ length: 7 }, (_, i) => {
                    const day = addDays(weekStart, i);
                    return (
                      <td key={i} className="calendar-cell">
                        {format(day, "d")}
                      </td>
                    );
                  })}
                </tr>
                {slotTimes.map((time, slotIndex) => (
                  <tr key={slotIndex} className="calendar-cell">
                    <td className="font-bold bg-gray-200">{time}</td>
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const day = addDays(weekStart, dayIndex);
                      return (
                        <td key={dayIndex} className="border p-2">
                          {renderXIcon(day, slotIndex + 1)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTutor;

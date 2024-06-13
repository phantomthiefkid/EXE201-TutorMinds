import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import { CaretLeftFill, CaretRightFill, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

import "../Tutormanagement/ModalCalendar.css";
import { fetchCalendar } from "../../redux/calendar/Calendar";

const ModalCalendar = ({ onClose, email }) => {
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
    dispatch(fetchCalendar({ teacher_email: email, startDate, endDate }));
  }, [dispatch, email, weekStart, weekEnd]);

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
          return <p className="text-green-500 font-bold">Đã có lớp</p>;
        }
      }
    }
    return <p className="text-gray-500 text-lg">-</p>;
  };

  return (
    <div className="modal-container fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="modal-header">
        <button
          onClick={onClose}
          className=" top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none mb-2"
        >
          <XLg className="text-lg" />
        </button>
      </div>
      <div className="calendar container">
        <div className="calendar-head bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
          <button className="btn" onClick={prevWeek}>
            <CaretLeftFill color="#707575" size="30" />
          </button>
          <h3 className="month-title ">{format(weekStart, "MMMM yyyy")}</h3>
          <button className="btn" onClick={nextWeek}>
            <CaretRightFill color="#707575" size="30" />
          </button>
        </div>

        <div className="table-container">
          <table className="calendar-table">
            <thead className="table-head">
              <tr className="head-row">
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
                  <td className="slot-column font-bold bg-gray-200">{time}</td>
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const day = addDays(weekStart, dayIndex);
                    return (
                      <td key={dayIndex} className="calendar-cell">
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
  );
};

export default ModalCalendar;

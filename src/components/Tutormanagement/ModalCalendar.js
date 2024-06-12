import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import "../Tutormanagement/ModalCalendar.css";

const ModalCalendar = ({ onClose, email }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekStart = startOfWeek(currentWeek);
  const weekEnd = endOfWeek(currentWeek);

  console.log("teacher_mail", email);

  const prevWeek = () => {
    setCurrentWeek(addDays(weekStart, -7));
  };

  const nextWeek = () => {
    setCurrentWeek(addDays(weekStart, 7));
  };

  return (
    <div class=" modal-container fixed inset-0 bg-black bg-opacity-50 z-40">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="calendar container">
        <div className="calendar-head">
          <button className="btn" onClick={prevWeek}>
            <CaretLeftFill color="#707575" size="30"></CaretLeftFill>
          </button>
          <h3 className="month-title">{format(weekStart, "MMMM yyyy")}</h3>
          <button className="btn" onClick={nextWeek}>
            <CaretRightFill color="#707575" size="30"></CaretRightFill>
          </button>
        </div>
        <hr></hr>
        <div className="table-container">
          <table className="calendar-table">
            <thead className="table-head">
              <tr className="head-row">
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
              <tr
                className="calendar-cell"
                style={{ backgroundColor: "#CCCCCC" }}
              >
                {/* {Array.from({ length: 7 }, (_, i) => {
                const day = addDays(weekStart, i);
                const scheduleItems = schedule.filter(item => {
                  // So sánh ngày để lấy thông tin lịch học cho ngày tương ứng
                  return format(item.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
                });

                return (
                  <td key={i} className={`calendar-cell ${scheduleItems.length > 0 ? 'has-event' : ''}`}>
                    {format(day, 'd')}
                  </td>
                );
              })} */}
              </tr>
              <tr className="calendar-cell">
                {/* {Array.from({ length: 7 }, (_, i) => {
                const day = addDays(weekStart, i);
                const scheduleItems = schedule.filter(item => {
                  // So sánh ngày để lấy thông tin lịch học cho ngày tương ứng
                  return format(item.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
                });

                return (
                  <td key={i} className={`calendar-cell ${scheduleItems.length > 0 ? 'has-event' : ''}`}>

                    {scheduleItems && scheduleItems.map((item, index) => {
                      return (
                        <div key={index}>
                          {item.classCode.charAt(item.classCode.length - 1) === '1' ? (
                            <button style={{ fontSize: '80%', width: '100%', marginTop: '10px' }} className='btn btn-primary'>{item.classCode}</button>
                          ) : item.classCode.charAt(item.classCode.length - 1) === '2' ? (
                            <button style={{ fontSize: '80%', width: '100%', marginTop: '10px' }} className='btn btn-success'>{item.classCode}</button>
                          ) : item.classCode.charAt(item.classCode.length - 1) === '3' ? (
                            <button style={{ fontSize: '80%', width: '100%', marginTop: '10px' }} className='btn btn-warning'>{item.classCode}</button>
                          ) : item.classCode.charAt(item.classCode.length - 1) === '4' ? (
                            <button style={{ fontSize: '80%', width: '100%', marginTop: '10px' }} className='btn btn-secondary'>{item.classCode}</button>
                          ) : (
                            <button style={{ fontSize: '80%', width: '100%', marginTop: '10px' }} className='btn btn-danger'>{item.classCode}</button>
                          )}
                        </div>
                      );
                    })}
                  </td>
                );
              })} */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalCalendar;

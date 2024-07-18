import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import { getUserIdFromToken } from '../../redux/auth/loginSlice';
import { fetchWallet, topToWallet, invoice, fetchWalletTutor } from '../../redux/payment/Payment';
import { enrollCourse } from '../../redux/course/Course';
import Swal from "sweetalert2";
const ModalPaymentCourseDetail = ({ isOpen, onClose, selectedClassId, course, tutor }) => {
  const dispatch = useDispatch();
  const userId = getUserIdFromToken();
  const transactionDate = new Date().toLocaleDateString('vi-VN');
  const walletDetail = useSelector((state) => state.wallet.wallet);
  const walletTutorDetail = useSelector((state) => state.wallet.walletTutor);
  const handleAccept = () => {
    if (walletDetail.ballance < course.price) {
      Swal.fire({
        title: "Số dư không đủ?",
        text: "Số dư của bạn không đủ để thực hiện giao dịch!",
        icon: "warning",

      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
        }
      });

    } else {
      const currentBallanceStudent = Number(walletDetail.ballance - course.price)
      const currentBallanceTutor = Math.floor(walletTutorDetail.ballance + (course.price * 0.9));

      const dataStudent = {
        idAdmin: userId,
        userId: userId,
        ballance: Number(currentBallanceStudent)
      }
      const dataTutor = {
        idAdmin: userId,
        userId: course?.tutor.id,
        ballance: Number(currentBallanceTutor)
      }
      const invoiceCourse = {
        type: "Course",
        price: Number(course.price),
        studentId: userId,
        tutorId: course?.tutor.id
      }
      Swal.fire({
        title: "Thanh toán",
        text: "Bạn có chắc chắn muốn giao dịch?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Hủy",
      }).then(() => {


        const response = dispatch(topToWallet(dataStudent))
        if (response) {
          dispatch(enrollCourse({ courseId: course.id, userId: userId }));
          dispatch(invoice(invoiceCourse));
          dispatch(topToWallet(dataTutor))
          toast.success("Thanh toán khóa học thành công!!!");
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 700)
        }
      })
    }

  };

  useEffect(() => {
    dispatch(fetchWallet({ userId }));
    dispatch(fetchWalletTutor({ id: tutor }))

  }, [dispatch, userId, tutor]);

  if (!isOpen) return null;
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <ToastContainer></ToastContainer>
      <div className="bg-white p-10 rounded-lg w-100 text-center relative">
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>×</button>
        <h2 className="text-lg font-bold mb-4 break-words">Bạn có muốn thanh toán giao dịch này?</h2>
        <p className="mb-4">Số tiền thanh toán: {course.price} VND</p>
        <p className="mb-2"><strong>Khóa học:</strong> {course.title}</p>
        <p className="mb-2"><strong>Được tạo bởi:</strong> {course?.tutor.fullName}</p>
        <p className="mb-2"><strong>Ngày giao dịch:</strong> {transactionDate}</p>
        <p className="mb-4"><strong>Thông tin khóa học: </strong>{course.description}</p>
        <div className="flex justify-between mt-4">
          <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleAccept}>Chấp nhận</button>
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>Từ Chối</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPaymentCourseDetail;
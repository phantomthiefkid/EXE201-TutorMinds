import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassDetail } from "../../redux/ClassManagement/classSlice";
import { getUserIdFromToken } from "../../redux/auth/loginSlice";
import { fetchWallet } from "../../redux/payment/Payment";
import Swal from "sweetalert2";
import axios from "axios";

const URL_INVOICE = "https://fams-management.tech/api/invoice";
const URL_WALLET = "https://fams-management.tech/api/wallet";

const ModalPayment = ({ isOpen, onClose, selectedClassId }) => {
  const dispatch = useDispatch();
  const classDetail = useSelector((state) => state.class.class);
  const walletDetail = useSelector((state) => state.wallet.wallet);
  const userId = getUserIdFromToken();

  useEffect(() => {
    if (selectedClassId) {
      dispatch(fetchClassDetail({ id: selectedClassId }));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchWallet({ id: userId }));
  }, [userId]);

  if (!isOpen || !classDetail) return null;

  const handlePostRequest = async () => {
    const payload = {
      type: "RequestClass",
      price: classDetail.totalPrice,
      studentId: userId,
      tutorId: classDetail.teacher.id,
    };

    console.log("payload", payload);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(URL_INVOICE, null, {
        params: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("POST response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  const handlePostWallet = async () => {
    try {
      const payload = {
        user: {
          id: userId,
        },
        ballance: walletDetail.ballance - classDetail.totalPrice,
      };

      console.log("payload", payload);
      const token = localStorage.getItem("token");

      const response = await axios.post(`${URL_WALLET}/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch(fetchWallet({ id: userId }));
    } catch (error) {
      console.error("Error making POST wallet request:", error);
    }
  };

  // const handlePostWalletTutor = async () => {
  //   try {
  //     await dispatch(fetchWallet({ id: classDetail.teacher.id }));

  //     console.log("Teacher's wallet after fetch:", walletDetail.ballance);

  //     const payload = {
  //       user: {
  //         id: classDetail.teacher.id,
  //       },
  //       ballance: classDetail.totalPrice * 0.9 + walletDetail.ballance,
  //     };

  //     console.log("payload", payload);
  //     const token = localStorage.getItem("token");

  //     const response = await axios.post(
  //       `${URL_WALLET}/${classDetail.teacher.id}`,
  //       payload,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("POST wallet tutor response:", response.data);
  //   } catch (error) {
  //     console.error("Error making POST wallet request:", error);
  //   }
  // };

  const handlePostWalletTutor = async () => {
    try {
      const fetchResponse = await dispatch(
        fetchWallet({ id: classDetail.teacher.id })
      );

      const tutorWallet = fetchResponse.payload;

      console.log("Teacher's wallet after fetch:", tutorWallet.ballance);

      const payload = {
        user: {
          id: classDetail.teacher.id,
        },
        ballance: classDetail.totalPrice * 0.9 + tutorWallet.ballance,
      };

      console.log("payload", payload);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${URL_WALLET}/${classDetail.teacher.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("POST wallet tutor response:", response.data);
    } catch (error) {
      console.error("Error making POST wallet request:", error);
    }
  };

  const handleAccept = () => {
    if (classDetail.totalPrice <= walletDetail?.ballance) {
      Swal.fire({
        title: "Are you sure?",
        text: "Bạn có chắc chắn muốn thực hiện giao dịch!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed!",
      }).then((result) => {
        if (result.isConfirmed) {
          handlePostRequest();
          handlePostWallet();
          handlePostWalletTutor();
          Swal.fire({
            title: "Success!",
            text: "Bạn đã thanh toán thành công.",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Số dư không đủ. Vui lòng nạp thêm tiền!",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg w-100 text-center relative">
        <button
          className="absolute top-2 right-2 text-2xl"
          onClick={() => onClose()}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4 break-words">
          Bạn có muốn thanh toán giao dịch này?
        </h2>
        <p className="mb-4">
          Số tiền thanh toán: {classDetail?.totalPrice} VND
        </p>
        <p className="mb-2">
          <strong>Người dùng:</strong> {classDetail?.user?.fullName}
        </p>
        <p className="mb-2">
          <strong>Gia sư:</strong> {classDetail?.teacher?.fullName}
        </p>
        <p className="mb-2">
          <strong>Ngày giao dịch:</strong> {classDetail?.createdDate}
        </p>

        <p className="mb-4">
          <strong>Thông tin khác:</strong> {classDetail?.title}
        </p>

        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleAccept}
          >
            Chấp nhận
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => onClose()}
          >
            Từ Chối
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPayment;

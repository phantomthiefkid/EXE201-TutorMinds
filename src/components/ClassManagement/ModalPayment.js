import React from 'react';

const ModalPayment = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const userName = "Nguyen Van A";
  const tutorName = "Le Thi B";
  const amount = 100000; // Hardcoded amount for the payment
  const transactionDate = "2024-06-27";
  const additionalInfo = "Giao dịch cho khóa học lập trình ReactJS";

  const handleAccept = () => {
    if (window.confirm('Bạn có chắc chắn muốn thực hiện giao dịch?')) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg w-100 text-center relative">
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>×</button>
        <h2 className="text-lg font-bold mb-4 break-words">Bạn có muốn thanh toán giao dịch này?</h2>
        <p className="mb-4">Số tiền thanh toán: {amount} VND</p>
        <p className="mb-2"><strong>Người dùng:</strong> {userName}</p>
        <p className="mb-2"><strong>Gia sư:</strong> {tutorName}</p>
        <p className="mb-2"><strong>Ngày giao dịch:</strong> {transactionDate}</p>
        {additionalInfo && <p className="mb-4"><strong>Thông tin khác:</strong> {additionalInfo}</p>}
        <div className="flex justify-between mt-4">
          <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleAccept}>Chấp nhận</button>
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>Từ Chối</button>
        </div>
      </div>
    </div>
  );
};

export default ModalPayment;

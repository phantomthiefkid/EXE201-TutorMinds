import React, { useState, useEffect } from 'react';
import { CreditCard } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentLink } from '../../redux/payment/Payment';

const PayOSScreen = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const payLink = useSelector((state) => state.wallet.payLink);
  const paymentLoading = useSelector((state) => state.wallet.loading);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Kiểm tra nếu giá trị mới nhập vào là số nguyên
    if (!isNaN(value) && parseInt(value) === parseFloat(value)) {
      setAmount(value);
      setError('');
    } else {
      setError('Vui lòng nhập số nguyên');
    }
  };

  const handleSubmit = () => {
    if (amount === '') {
      setError('Vui lòng nhập số tiền');
    } else {
      dispatch(createPaymentLink(amount));
    }
  };

  useEffect(() => {
    if (payLink) {
      console.log("Payment Link:", payLink);
      window.location.href = payLink; // Redirect sang payLink
    }
  }, [payLink]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        E-Commerce Payment
      </header>
      <div className="bg-white shadow-md rounded-lg p-8 mt-10 max-w-md w-full relative">
        <div className="absolute top-0 right-0 p-4">
          <CreditCard className="text-blue-600 text-3xl" />
        </div>
        <div className="flex justify-center mb-6">
          <img
            src="https://storage.googleapis.com/tutormind/dev%2Fpayment.png-i781kI.png"
            alt="E-Commerce Logo"
            className="w-24 h-24 rounded-full shadow-lg"
          />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Nhập số tiền</h1>
        <input
          type="text"
          value={amount}
          onChange={handleInputChange}
          placeholder="Nhập số tiền"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={paymentLoading}
        >
          {paymentLoading ? 'Đang xử lý...' : 'Nạp Tiền'}
        </button>
        <div className="flex justify-center mt-4 space-x-4">
          <img
            src="https://storage.googleapis.com/tutormind/dev%2Fvisa.png-k6UI0t.png"
            alt="Visa"
            className="w-12 h-12"
          />
          <img
            src="https://storage.googleapis.com/tutormind/dev%2Fpaypal.png-rvOLZA.png"
            alt="Paypal"
            className="w-14 h-12"
          />
          <img
            src="https://storage.googleapis.com/tutormind/dev%2Fcard.png-jWhPGm.png"
            alt="Master Card"
            className="w-12 h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default PayOSScreen;

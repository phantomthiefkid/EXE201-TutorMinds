import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FailurePaymentScreen = () => {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cancel = urlParams.get('cancel');
    const orderCode = urlParams.get('orderCode');

    if (cancel === 'true' && orderCode) {
      console.log('Order Code:', orderCode);
      // Lưu orderCode vào biến state hoặc Redux store nếu cần thiết
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h4 className="text-lg font-bold text-red-700">Thanh toán thất bại</h4>
      <p>
        Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{' '}
        <a href="mailto:support@payos.vn" className="text-blue-500 underline">support@payos.vn</a>
      </p>
      <Link to={'/payosscreen'}
        className="mt-2 border border-purple-700 rounded bg-purple-700 py-2 px-3 text-white text-sm no-underline"
      >
        Trở về trang Tạo Link thanh toán
      </Link>
    </div>
  );
};

export default FailurePaymentScreen;

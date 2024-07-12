import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getIdOfUser } from '../../redux/auth/loginSlice';
import { getOrder, fetchWallet, topToWallet } from '../../redux/payment/Payment';

const SuccessPaymentScreen = () => {

  const dispatch = useDispatch();
  const order = useSelector((state) => state.wallet.order);
  const id = getIdOfUser();
  const walletUser = useSelector((state) => state.wallet.wallet);
  const urlParams = new URLSearchParams(window.location.search);
  const orderCode = urlParams.get('orderCode');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWallet({ id: id }));
    dispatch(getOrder(orderCode));

  }, [dispatch, id, orderCode]);

  useEffect(() => {
    const walletUpdateFlag = `walletUpdate_${orderCode}`;

    // Kiểm tra nếu đã cập nhật ví cho orderCode này chưa
    if (walletUser && order && !localStorage.getItem(walletUpdateFlag)) {
      const walletUpdate = {
        idAdmin: 32,
        userId: id,
        ballance: Number(walletUser?.ballance) + Number(order?.amount)
      };
      console.log("wallet: ", walletUser, " order: ", order);

      if (!isNaN(walletUpdate.ballance)) {
        dispatch(topToWallet(walletUpdate)).then(() => {
          // Đánh dấu đã cập nhật ví và điều hướng
          localStorage.setItem(walletUpdateFlag, 'true');
          navigate('/successpaymentscreen').then(() => {
            // Reload lại trang sau khi điều hướng
            window.location.reload();
          });
        });
      }
    }
  }, [walletUser, order, dispatch, id, orderCode]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h4 className="text-lg font-bold text-purple-700">Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!</h4>
      <p>
        Nếu có bất kỳ câu hỏi nào, hãy gửi email tới{' '}
        <a href="mailto:support@payos.vn" className="text-blue-500 underline">support@payos.vn</a>
      </p>
      <Link to={'/payosscreen'}
        id="return-page-btn"
        className="mt-2 border border-purple-700 rounded bg-purple-700 py-2 px-3 text-white text-sm no-underline"
      >
        Trở về trang Tạo Link thanh toán
      </Link>
    </div>
  );
};

export default SuccessPaymentScreen;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIdOfUser } from '../../redux/auth/loginSlice';
import { getOrder, fetchWallet, topToWallet } from '../../redux/payment/Payment';

const SuccessPaymentScreen = () => {

  const dispatch = useDispatch();
  const order = useSelector((state) => state.wallet.order);
  const id = getIdOfUser();
  const walletUser = useSelector((state) => state.wallet.wallet);
  const code = "158884"
  const urlParams = new URLSearchParams(window.location.search);
  const cancel = urlParams.get('cancel');
  const orderCode = urlParams.get('orderCode');

  useEffect(() => {
    // Kiểm tra xem trang đã reload chưa, nếu chưa thì reload
    if (!window.sessionStorage.getItem('reloaded')) {
      window.sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {

    dispatch(fetchWallet({ id: id }));
    dispatch(getOrder(orderCode))
  }, [dispatch, id, orderCode]);

  useEffect(() => {
    if (walletUser && order) {
      const walletUpdate = {
        idAdmin: 32,
        userId: id,
        ballance: Number(walletUser?.ballance) + Number(order?.amount)
      };
      console.log("wallet: ", walletUser, " order: ", order);
      // Check if wallet balance is valid
      if (!isNaN(walletUpdate.ballance)) {
        // Dispatch action to update wallet balance
        dispatch(topToWallet(walletUpdate));
      }
    }
  }, [walletUser, order, dispatch, id]);


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

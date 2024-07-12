import React, { useEffect } from 'react';
import { Amazon } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIdOfUser } from '../../redux/auth/loginSlice';
import { getOrder, fetchWallet, topToWallet } from '../../redux/payment/Payment';

const updateWallet = {
  user: {
    id: 0
  },
  ballance: 0
}

const FailurePaymentScreen = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.wallet.order);
  const id = getIdOfUser();
  const walletUser = useSelector((state) => state.wallet.wallet);
  const code = "158884"
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cancel = urlParams.get('cancel');
    const orderCode = urlParams.get('orderCode');

    dispatch(fetchWallet({ id: id }));
    dispatch(getOrder(code))
    if (cancel === 'true' && orderCode) {
      localStorage.setItem('orderCode', orderCode);
    }
    
    // if (walletUser && order) {
    //   const walletUpdate = {
    //     idAdmin: 32,
    //     userId: id,
    //     ballance: Number(walletUser?.ballance) + Number(order?.amount)
    //   }
    //   console.log("wallet: ", walletUser, " order: ", order)
    //   if (!isNaN(walletUpdate.ballance)) {
    //     dispatch(topToWallet(walletUpdate));
    //   }
    // }
  }, [dispatch, id, code]);

  useEffect(() => {
    // Check if walletUser and order are available
    const storedOrderCode = localStorage.getItem('orderCode');
    if (storedOrderCode && walletUser && order) {
      // Calculate updated wallet balance
      localStorage.removeItem('orderCode');
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
  }, [dispatch, walletUser, order, id]);

  // useEffect(() => {
  //   if (order) {
  //     console.log('Order:', order);
  //   }
  // }, [order]);

  // useEffect(() => {
  //   if (walletUser) {
  //     console.log('Wallet User:', walletUser);
  //   }
  // }, [walletUser]);

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

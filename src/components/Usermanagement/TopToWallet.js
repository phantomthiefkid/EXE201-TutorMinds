import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import PaymentPage from '../Payment/PaymentPage ';

const TopToWallet = () => {
    useEffect(() => {
        document.title = 'Nạp tiền vào ví';
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Nạp tiền vào ví</h1>

            <div className="flex flex-wrap bg-white p-6 rounded-lg shadow-md w-full max-w-5xl m-12">
                {/* Left Column: Form Inputs */}
                <div className="w-full md:w-1/2 pr-6 border-r border-gray-300">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Số tiền:
                            </label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="Nhập số tiền"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Tên:
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nhập tên của bạn"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Nhập email của bạn"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Số điện thoại:
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Nhập số điện thoại của bạn"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Địa chỉ:
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Nhập địa chỉ của bạn"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Thành phố:
                            </label>
                            <input
                                type="text"
                                name="city"
                                placeholder="Nhập thành phố của bạn"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Quốc gia:
                            </label>
                            <input
                                type="text"
                                name="country"
                                placeholder="Nhập quốc gia của bạn"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Mã bưu điện:
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Nhập mã bưu điện của bạn"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Phương thức thanh toán:
                            </label>
                            <select
                                name="paymentMethod"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="momo">MoMo</option>
                                <option value="creditCard">Thẻ tín dụng</option>
                                <option value="bankTransfer">Chuyển khoản ngân hàng</option>
                            </select>
                        </div>
                    </div>

                    {/* <Link to={`/payment`}>
                        <button
                            type="button"
                            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Tôi đã thanh toán
                        </button>
                    </Link> */}
                </div>

                {/* Right Column: QR Code */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center pl-6">
                    {/* <h2 className="text-xl font-semibold mb-4">Quét mã QR MoMo</h2> */}
                    {/* <QRCode value="momo://xxx" size={256} /> */}
                    <PaymentPage/>
                </div>
            </div>
        </div>
    );
};

export default TopToWallet;

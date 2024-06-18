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

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl m-12">
                {/* QR Code and Payment Page */}
                <div className="flex flex-col items-center justify-center">
                    {/* <h2 className="text-xl font-semibold mb-4">Quét mã QR MoMo</h2> */}
                    {/* <QRCode value="momo://xxx" size={256} /> */}
                    <PaymentPage />
                </div>
            </div>
        </div>
    );
};

export default TopToWallet;

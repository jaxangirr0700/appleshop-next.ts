import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#2b2b2b] text-white text-sm mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-5 gap-6">
        <div>
          <h3 className="font-semibold mb-2">
            Savolingiz bormi? Qo’ng’iroq qiling
          </h3>
          <p className="text-xl font-bold mb-2">+998 71 209 99 44</p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="bg-gray-700 p-2 rounded">
              {/* <FacebookFilled /> */}
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded">
              {/* <YoutubeFilled /> */}
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded">
              {/* <TwitterSquareFilled /> */}
            </a>
            <a href="#" className="bg-gray-700 p-2 rounded">
              {/* <InstagramOutlined /> */}
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Kompaniya</h4>
          <ul className="space-y-1">
            <li>
              <a href="#">Yuridik shaxslar uchun</a>
            </li>
            <li>
              <a href="#">Biz haqimizda</a>
            </li>
            <li>
              <a href="#">Yangiliklar va bloglar</a>
            </li>
            <li>
              <a href="#">IMEI ni tekshirish</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Ma’lumot</h4>
          <ul className="space-y-1">
            <li>
              <a href="#">Yetkazib berish</a>
            </li>
            <li>
              <a href="#">Texnomartda ishlash</a>
            </li>
            <li>
              <a href="#">Shaxsiy kabinet</a>
            </li>
            <li>
              <a href="#">Aloqa raqamlari</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Xaridorga yordam</h4>
          <ul className="space-y-1">
            <li>
              <a href="#">Mahsulotni qaytarish</a>
            </li>
            <li>
              <a href="#">Mahsulotlar uchun kafolat</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Ilovani yuklab olish</h4>
          <div className="flex flex-col items-start space-y-2">
            {/* <QrcodeOutlined /> QR */}
            <div className="flex space-x-2">
              {/* <GoogleOutlined /> */}

              {/* <AppstoreFilled /> */}
              {/* <ProductOutlined /> */}
            </div>
            <p className="text-xs">Yuklab olish uchun QR-kodni skanerlang</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-4">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>2016–2025 © texnomart.uz. Barcha huquqlar himoyalangan.</p>
          <div className="flex space-x-2 mt-2 md:mt-0">
            {/* <MoneyCollectOutlined />
            <MoneyCollectOutlined />
            <MoneyCollectOutlined />
            <MoneyCollectOutlined /> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

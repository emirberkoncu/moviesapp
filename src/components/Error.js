import React from 'react';

const Error = () => {
  return (
    <div className="flex items-center justify-center mt-3">
      <div className="text-center">
        <h1 className="font-bold text-red-600">Sonuç Bulunamadı</h1>
        <p className="mt-4  text-gray-600">
          Üzgünüm, arama kriterlerinize uygun film bulunamadı.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
};

export default Error;

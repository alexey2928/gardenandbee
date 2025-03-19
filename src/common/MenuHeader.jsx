import React from "react";

const MenuHeader = ({ name }) => {
  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/garden-and-bee.firebasestorage.app/o/cover.jpg?alt=media&token=38eda020-5248-4e99-b58a-314fa6f744e3')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold">{name}</h1>
      </div>
    </div>
  );
};

export default MenuHeader;

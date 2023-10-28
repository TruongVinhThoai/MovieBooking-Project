import React from "react";

export default function HomeTemplate({ children }) {
  return (
    <div>
      {children}
      <div className="px-16">
        <div className="border-b-2 border-orange-400"></div>
      </div>
    </div>
  );
}

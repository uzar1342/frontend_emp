import React from "react";
import { useSelector } from "react-redux";
import "../style/Loader.css";

export default function Loader() {
  const { loading } = useSelector((state) => state.loader);

  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
}

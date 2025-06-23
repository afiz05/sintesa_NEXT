import React, { useState } from "react";
import "./style.css";
// import { Col, Container, Row } from "react-bootstrap";

const ThangRkakl = ({ jenlap, onChange }) => {
  const thang = [
    { value: "2014", label: " 2014" },
    { value: "2015", label: " 2015" },
    { value: "2016", label: " 2016" },
    { value: "2017", label: " 2017" },
    { value: "2018", label: " 2018" },
    { value: "2019", label: " 2019" },
    { value: "2020", label: " 2020" },
    { value: "2021", label: " 2021" },
    { value: "2022", label: " 2022" },
    { value: "2023", label: " 2023" },
    { value: "2024", label: " 2024" },
    { value: "2025", label: " 2025" },
  ];
  const [selectedValue, setSelectedValue] = useState("2025");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-2">
        Tahun
      </div>

      <div className="col-span-12 md:col-span-2">
        {thang.map((tahun) => (
          <label key={tahun.value}>
            <input
              type="radio"
              className={`mx-2 custom-disabled`}
              name="thang"
              value={tahun.value}
              checked={selectedValue === tahun.value}
              onChange={handleChange}
            />
            {tahun.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ThangRkakl;

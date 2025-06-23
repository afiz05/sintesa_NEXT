import React, { useState, useEffect } from "react";
import "./style.css";
// import { Col, Container, Row } from "react-bootstrap";

const JenisLaporanRowset = ({ jenlap, onChange }) => {
  const jenisLap = [{ value: "1", label: " SPM/ SP2D" }];

  const [selectedValue, setSelectedValue] = useState("1");

  const handleJenisLaporanChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(jenlap);
    onChange({ jenlap });
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-10 jenis-laporan-option">
          Jenis Data
        </div>

        <div className="col-span-12 md:col-span-10 jenis-laporan-option">
          {jenisLap.map((jenis) => (
            <p key={jenis.value} style={{ margin: "0px" }} className="mt-1">
              <input
                type="radio"
                name="jenlap"
                className="mx-2 fade-in"
                value={jenis.value}
                checked={selectedValue === jenis.value}
                onChange={handleJenisLaporanChange}
              />

              {jenis.label}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default JenisLaporanRowset;

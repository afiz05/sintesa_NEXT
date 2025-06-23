import React, { useState } from "react";
import "./style.css"; 
// import { Col, Container, Row } from "react-bootstrap";

const Pembulatanrkakl = ({ onChange }) => {
  const pembulatan = [
    { value: "1", label: "Rupiah" },
    { value: "1000", label: "Ribu" },
    { value: "1000000", label: "Juta" },
    { value: "1000000000", label: "Milyar" },
    { value: "1000000000000", label: "Triliun" },
  ];

  const [selectedValue, setSelectedValue] = useState(pembulatan[0].value);

  const handlePembulatanoranChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-2">
            <p> Pembulatan</p>
          </div>

          <div className="col-span-12 md:col-span-2">
            {pembulatan.map((pembulatan) => (
              <label key={pembulatan.value}>
                <input
                  type="radio"
                  className="mx-2"
                  name="pembulatan"
                  value={pembulatan.value}
                  checked={selectedValue === pembulatan.value}
                  onChange={handlePembulatanoranChange}
                />
                &nbsp;{pembulatan.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pembulatanrkakl;

import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../../utils/Context";
import Encrypt from "../../../utils/Encrypt";
import { handleHttpError } from "../../notifikasi/toastError";
import { Form } from "react-bootstrap";

const RefKppn25 = (props) => {
  const { axiosJWT, token, username, role, kdkanwil } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sql, setSql] = useState("");

  useEffect(() => {
    getData();
  }, [props.kdkppn]);

  const getData = async () => {
    setLoading(true);
    let filterKanwil = "";
    if (role === "2") {
      filterKanwil =
        props.where +
        (props.where ? " AND " : "") +
        `a.kdkanwil = '${kdkanwil}'`;
    } else {
      filterKanwil = props.where;
    }

    const encodedQuery =
      encodeURIComponent(`SELECT c.kdkppn AS KDKPPN, c.nmkppn AS NMKPPN
        FROM tkd25.alokasi_bulanan c   GROUP BY c.kdkppn`);

    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    setSql(cleanedQuery);
    const encryptedQuery = Encrypt(cleanedQuery);
    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_TKD_REFERENSI_TKD_25
          ? `${process.env.NEXT_PUBLIC_TKD_REFERENSI_TKD_25}${encryptedQuery}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.result);

      setLoading(false);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
      setLoading(false);
    }
  };
  return (
    <Form.Group controlId="inputState">
      {loading ? (
        "Loading ..."
      ) : (
        <Form.Control
          value={props.kppn}
          as="select"
          className="form-select form-select-md text-select"
          name={props.name}
          onChange={(e) => props.onChange(e.target.value)}
        >
          <option value="">-- Pilih KPPN --</option>
          {data.map((dau, index) => (
            <option key={index} value={dau.KDKPPN}>
              {dau.NMKPPN} ( {dau.KDKPPN})
            </option>
          ))}
        </Form.Control>
      )}
    </Form.Group>
  );
};

export default RefKppn25;

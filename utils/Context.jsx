"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import Notifikasi from "../components/aplikasi/notifikasi/notif";
import { handleHttpError } from "../components/notifikasi/toastError";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { decryptData } from "./Decrypt";
import Notifikasi from "../components/notifikasi/notif";

const MyContext = createContext({
  role: "",
  telp: "",
  verified: "",
  name: "",
  statusLogin: false,
  token: "",
  axiosJWT: null,
  // Add other default values as needed
});

export const MyContextProvider = ({ children }) => {
  const [loggedinUsers, setLoggedinUsers] = useState([]);
  const [loggedInUser2, setLoggedInUser2] = useState(null);
  const [namelogin, setNamelogin] = useState(null);
  const [name, setName] = useState("");
  const [session, setSession] = useState("");
  const [role, setRole] = useState("");
  const [nmrole, setNmrole] = useState("");
  const [active, setActive] = useState("");
  const [kdlokasi, setKdlokasi] = useState("");
  const [verified, setVerified] = useState("");
  const [kdkanwil, setKdkanwil] = useState("");
  const [deptlimit, setDeptlimit] = useState("");
  const [kdkppn, setKdkppn] = useState("");
  const [expire, setExpire] = useState("");
  const [token, setToken] = useState("");
  const [iduser, setIduser] = useState("");
  const [url, setUrl] = useState("");
  const [statusLogin, setstatusLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [mode, setMode] = useState("");
  const [tampil, setTampil] = useState("");
  const [tampilverify, setTampilverify] = useState("");
  const [status, setStatus] = useState("");
  const [persentase, setPersentase] = useState([]);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [stat, setStat] = useState("");
  const [processquery, setProccess] = useState("");
  const [errorprocessquery, seterrorProccess] = useState("");
  const [loadingExcell, setloadingExcell] = useState(false);
  const [totNotif, settotNotif] = useState(0);
  const [listNotif, setlistNotif] = useState([]);
  const [visibilityStatuses, setVisibilityStatuses] = useState({});
  const [offline, setOffline] = useState(false);
  const [offlinest, setOfflinest] = useState("");
  const [telp, setTelp] = useState("");
  const [tampilAI, settampilAI] = useState(false);
  const [loginDengan, setloginDengan] = useState(null);
  const [dataEpa, setDataEpa] = useState({});
  const [viewMode, setViewMode] = useState("sppg");

  // const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("status") && refreshToken();
  }, []);

  const logout = async () => {
    try {
      setLogoutLoading(true); // Menampilkan loading saat logout dimulai
      setUsername("");
      await axios.delete(process.env.NEXT_PUBLIC_LOGOUT);
      setstatusLogin(false);
      setOffline(false);
      setLoggedinUsers([]);
      setTampil(false);
      setTampilverify(false);
      setNamelogin(null);
      setTelp("");
      setloginDengan(null);

      if (stat === "true") {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Logout Berhasil",
          timer: 2000, // Menutup otomatis setelah 2 detik
          showConfirmButton: false,
        });
      }

      localStorage.removeItem("status");
      // navigate("/v3/auth/login");
      // TODO: Replace with Next.js router - window.location.href = "/v3/auth/login";
      //setStat("true")
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Logout Gagal",
        timer: 2000, // Menutup otomatis setelah 2 detik
        showConfirmButton: false,
      });
    } finally {
      setLogoutLoading(false); // Menghentikan loading setelah logout selesai
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_REFRESH_TOKEN);
      setToken(response.data.accessToken);
      const decoded = jwtDecode(decryptData(response.data.accessToken));
      // console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.exp);
      setstatusLogin(true);
      setRole(decoded.role);
      setKdkanwil(decoded.kdkanwil);
      setKdkppn(decoded.kdkppn);
      setKdlokasi(decoded.kdlokasi);
      setActive(decoded.active);
      setDeptlimit(decoded.dept_limit);
      setNmrole(decoded.namarole);
      setIduser(decoded.userId);
      setUrl(decoded.url);
      setUsername(decoded.username);
      setMode(decoded.mode);
      setTampil(decoded.tampil);
      setTampilverify(decoded.tampilverify);
      setSession(decoded.session);
      setVerified(decoded.verified);
      setTelp(decoded.telp);
      // setOffline(true);
    } catch (error) {
      if (error.response) {
        localStorage.removeItem("status");
        // navigate("/v3/auth/login");
        // TODO: Replace with Next.js router - window.location.href = "/v3/auth/login";
        // return <ToastError message="error mendapatkan token" />;
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = Date.now() / 1000;
      if (expire < currentTime && localStorage.getItem("status")) {
        const response = await axios.get(process.env.NEXT_PUBLIC_REFRESH_TOKEN);
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(decryptData(response.data.accessToken));
        // console.log(decoded);
        setTelp(decoded.telp);
        setName(decoded.name);
        setExpire(decoded.exp);
        setstatusLogin(true);
        setRole(decoded.role);
        setKdkanwil(decoded.kdkanwil);
        setKdkppn(decoded.kdkppn);
        setKdlokasi(decoded.kdlokasi);
        setActive(decoded.active);
        setDeptlimit(decoded.dept_limit);
        setNmrole(decoded.namarole);
        setIduser(decoded.userId);
        setUrl(decoded.url);
        setUsername(decoded.username);
        setMode(decoded.mode);
        setTampil(decoded.tampil);
        setTampilverify(decoded.tampilverify);
        setSession(decoded.session);
        setVerified(decoded.verified);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (statusLogin && session === "1") {
      cekLogin();
    }
  }, [namelogin]);

  useEffect(() => {
    stat === "false" &&
      Notifikasi("System melakukan logout otomatis terhadap akun anda.");
    stat === "false" && logout();
  }, [stat]);

  const cekLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CEKLOGIN}?username=${username}`
      );

      setStat(response.data);
    } catch (error) {
      handleHttpError("Terjadi Permasalahan Koneksi atau Server Backend ");
      setstatusLogin(false);
      setTampil(false);
      setTampilverify(false);
      // navigate("/v3/auth/login");
      // TODO: Replace with Next.js router - window.location.href = "/v3/auth/login";
    }
  };
  useEffect(() => {
    if (statusLogin) {
      const socket = io(process.env.NEXT_PUBLIC_LOCAL_SOCKET);
      socket.on("nmuser", (nmuser) => {
        if (nmuser) {
          const uppercaseNamelogin = nmuser.toUpperCase();
          setLoggedinUsers((prevUsers) => [...prevUsers, uppercaseNamelogin]);
          setNamelogin(uppercaseNamelogin);
        } else {
          setNamelogin(null);
        }
      });

      socket.on("loginBy", (loginBy) => {
        if (loginBy) {
          setloginDengan(loginBy);
        }
      });
      return () => {
        socket.off("userLoggedin");
        socket.off("nmuser");
        socket.off("loginBy");
      };
    }
  }, [statusLogin, loginDengan]);

  useEffect(() => {
    if (statusLogin) {
      const socket = io(process.env.NEXT_PUBLIC_LOCAL_SOCKET);
      socket.on("running_querys", (running_querys) => {
        if (running_querys) {
          const uppercaseProccess = running_querys.toLowerCase();
          setProccess((prev) => [...prev, uppercaseProccess]);
        } else {
          setProccess([]);
        }
      });
      socket.on("error_querys", (error_querys) => {
        if (error_querys) {
          const uppercaseProccessError = error_querys.toLowerCase();
          seterrorProccess((preverror) => [
            ...preverror,
            uppercaseProccessError,
          ]);
        } else {
          seterrorProccess([]);
        }
      });

      return () => {
        socket.off("running_querys");
        socket.off("error_querys");
      };
    }
  }, [statusLogin]);
  // console.log(tampilverify);

  return (
    <MyContext.Provider
      value={{
        processquery,
        errorprocessquery,
        setLoggedinUsers,
        setNamelogin,
        namelogin,
        setLoggedInUser2,
        loggedInUser2,
        logout,
        loggedinUsers,
        setSession,
        setExpire,
        setToken,
        setMode,
        setTampil,
        setTampilverify,
        setStatus,
        url,
        setUrl,
        statusLogin,
        name,
        setName,
        setstatusLogin,
        role,
        kdkanwil,
        kdkppn,
        kdlokasi,
        setRole,
        setKdkanwil,
        setKdkppn,
        setKdlokasi,
        setActive,
        expire,
        token,
        axiosJWT,
        active,
        deptlimit,
        setDeptlimit,
        setNmrole,
        nmrole,
        setIduser,
        iduser,
        setUsername,
        username,
        mode,
        status,
        tampil,
        tampilverify,
        persentase,
        setPersentase,
        loadingExcell,
        setloadingExcell,
        setVerified,
        verified,
        totNotif,
        settotNotif,
        listNotif,
        setlistNotif,
        visibilityStatuses,
        setVisibilityStatuses,
        offline,
        setOffline,
        offlinest,
        setOfflinest,
        telp,
        setTelp,
        tampilAI,
        settampilAI,
        loginDengan,
        setloginDengan,
        dataEpa,
        setDataEpa,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;

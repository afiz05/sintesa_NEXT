"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
// import Notifikasi from "@/components/notifikasi/notif";
// import { handleHttpError } from "@/components/notifikasi/toastError";
import { io } from "socket.io-client";

// Define the JWT payload interface
interface CustomJwtPayload {
  telp: string;
  name: string;
  exp: number;
  role: string;
  kdkanwil: string;
  kdkppn: string;
  kdlokasi: string;
  active: string;
  dept_limit: string;
  namarole: string;
  userId: string;
  url: string;
  username: string;
  mode: string;
  tampil: string;
  tampilverify: string;
  session: string;
  verified: string;
}
//import Swal from "sweetalert2";
import { decryptData } from "./Decrypt";
import Swal from "sweetalert2";
import { AxiosInstance } from "axios";
import { handleHttpError } from "./handleError";

// 1. Tentukan tipe context
interface MyContextType {
  loggedinUsers: any[];
  loggedInUser2: any;
  namelogin: string | null;
  name: string;
  session: string;
  role: string;
  nmrole: string;
  active: string;
  kdlokasi: string;
  verified: string;
  kdkanwil: string;
  deptlimit: string;
  kdkppn: string;
  expire: string;
  token: string | null;
  axiosJWT: AxiosInstance;
  iduser: string;
  url: string;
  statusLogin: boolean;
  isTokenLoading: boolean; // Tambahkan loading state untuk token
  username: string;
  mode: string;
  tampil: string;
  tampilverify: string | boolean;
  status: string;
  persentase: any[];
  offline: boolean;
  offlinest: string;
  telp: string;
  setLoggedinUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setLoggedInUser2: React.Dispatch<React.SetStateAction<any>>;
  setNamelogin: React.Dispatch<React.SetStateAction<string | null>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSession: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setNmrole: React.Dispatch<React.SetStateAction<string>>;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setKdlokasi: React.Dispatch<React.SetStateAction<string>>;
  setVerified: React.Dispatch<React.SetStateAction<string>>;
  setKdkanwil: React.Dispatch<React.SetStateAction<string>>;
  setKdprov: React.Dispatch<React.SetStateAction<string>>;
  setDeptlimit: React.Dispatch<React.SetStateAction<string>>;
  setKdkppn: React.Dispatch<React.SetStateAction<string>>;
  setExpire: React.Dispatch<React.SetStateAction<string>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIduser: React.Dispatch<React.SetStateAction<string>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setstatusLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setTampil: React.Dispatch<React.SetStateAction<string>>;
  setTampilverify: React.Dispatch<React.SetStateAction<string | boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setPersentase: React.Dispatch<React.SetStateAction<any[]>>;
  setOffline: React.Dispatch<React.SetStateAction<boolean>>;
  setOfflinest: React.Dispatch<React.SetStateAction<string>>;
  setTelp: React.Dispatch<React.SetStateAction<string>>;
  logout: () => Promise<void>;
}

// 2. Buat context dengan tipe
const MyContext = createContext<MyContextType | undefined>(undefined);

// 3. Tipe untuk props provider
interface MyContextProviderProps {
  children: ReactNode;
}

// 4. Provider dengan tipe
export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const navigate = useRouter();
  const [loggedinUsers, setLoggedinUsers] = useState<any[]>([]);
  const [loggedInUser2, setLoggedInUser2] = useState<any>(null);
  const [namelogin, setNamelogin] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [nmrole, setNmrole] = useState<string>("");
  const [active, setActive] = useState<string>("");
  const [kdlokasi, setKdlokasi] = useState<string>("");
  const [verified, setVerified] = useState<string>("");
  const [kdkanwil, setKdkanwil] = useState<string>("");
  const [kdprov, setKdprov] = useState<string>("");
  const [deptlimit, setDeptlimit] = useState<string>("");
  const [kdkppn, setKdkppn] = useState<string>("");
  const [expire, setExpire] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [iduser, setIduser] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [statusLogin, setstatusLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [tampil, setTampil] = useState<string>("");
  const [tampilverify, setTampilverify] = useState<string | boolean>("");
  const [status, setStatus] = useState<string>("");
  const [persentase, setPersentase] = useState<any[]>([]);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [stat, setStat] = useState<string>("");
  const [processquery, setProccess] = useState<any[]>([]);
  const [errorprocessquery, seterrorProccess] = useState<any[]>([]);
  const [loadingExcell, setloadingExcell] = useState<boolean>(false);
  const [totNotif, settotNotif] = useState<number>(0);
  const [listNotif, setlistNotif] = useState<any[]>([]);
  const [visibilityStatuses, setVisibilityStatuses] = useState<
    Record<string, boolean>
  >({});
  const [offline, setOffline] = useState<boolean>(false);
  const [offlinest, setOfflinest] = useState<string>("");
  const [telp, setTelp] = useState<string>("");
  const [tampilAI, settampilAI] = useState<boolean>(false);
  const [loginDengan, setloginDengan] = useState<string | null>(null);
  const [dataEpa, setDataEpa] = useState<Record<string, any>>({});
  const [viewMode, setViewMode] = useState<string>("sppg");
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(true);

  useEffect(() => {
    const status = localStorage.getItem("status");
    if (status) {
      refreshToken();
    }
  }, []);

  const logout = async () => {
    try {
      setLogoutLoading(true); // Menampilkan loading saat logout dimulai
      setUsername("");
      await axios.delete(process.env.NEXT_PUBLIC_LOCAL_LOGOUT ?? "", {
        withCredentials: true,
      });
      setstatusLogin(false);
      setOffline(false);
      setLoggedinUsers([]);
      setTampil("");
      setTampilverify("");
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
      navigate.push("/v3/next/login");
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
    setIsTokenLoading(true); // Set loading state
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_LOCAL_REFRESH_TOKEN ?? "",
        { withCredentials: true }
      );
      setToken(response.data.accessToken);
      const decoded = jwtDecode<CustomJwtPayload>(
        decryptData(response.data.accessToken)
      );
      setName(decoded.name);
      setExpire(decoded.exp.toString());
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
    } catch (err: any) {
      console.log(err);
      const { status, data } = err.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );

      if (err.response) {
        localStorage.removeItem("status");
        navigate.push("/v3/next/login");
        // return <ToastError message="error mendapatkan token" />;
      }
    } finally {
      setIsTokenLoading(false); // Set loading state selesai
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = Date.now() / 1000;
      if (parseInt(expire) < currentTime && localStorage.getItem("status")) {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_LOCAL_REFRESH_TOKEN ?? ""
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode<CustomJwtPayload>(
          decryptData(response.data.accessToken)
        );
        setTelp(decoded.telp);
        setName(decoded.name);
        setExpire(decoded.exp.toString());
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
    stat === "false" && logout();
  }, [stat]);

  const cekLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_CEKLOGIN}?username=${username}`
      );

      setStat(response.data);
    } catch (error) {
      // handleHttpError("Terjadi Permasalahan Koneksi atau Server Backend ");
      setstatusLogin(false);
      setTampil("");
      setTampilverify("");
      navigate.push("/v3/next/login");
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

  return (
    <MyContext.Provider
      value={{
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
        setVerified,
        verified,
        offline,
        setOffline,
        offlinest,
        setOfflinest,
        telp,
        setTelp,
        session,
        setKdprov,
        isTokenLoading,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;

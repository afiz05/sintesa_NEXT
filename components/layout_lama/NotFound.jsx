import React, { useContext, useEffect } from "react";
import MyContext from "../../auth/Context";
// import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { statusLogin, offline } = useContext(MyContext);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   !statusLogin && navigate("/v3/auth/login");
  // }, [statusLogin]);

  return (
    <main>
      <div className="container-fluid">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h5>Halaman yang anda cari tidak ada !!!</h5>
          {statusLogin
            ? navigate("v3/landing/profile")
            : navigate("v3/auth/login")}
        </section>
      </div>
    </main>
  );
};

export default NotFound;

import { useRef, useState } from "react";
// import "./style.scss";
import useRequest from "../../../hooks/useRequest";
import Modal, { ModalInterfaceType } from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import localLogin from "./login.json";

type ResponseType = {
  success: boolean;
  data: any;
};

const Login = () => {
  const modalRef = useRef<ModalInterfaceType>(null!);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const { request } = useRequest<ResponseType>({manual: true});

  const navigate = useNavigate();
 
  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     alert("登陆成功");
  //   }
  //   if (error) {
  //     alert("登陆失败");
  //   }
  // }, [data, error]);

  // useEffect(()=>{
  //   if (showModal) {
  //     const timer = setTimeout(()=>{
  //       setShowModal(false);
  //     }, 1500)
  //     return () => {
  //       clearTimeout(timer);
  //     }
  //   }
  // },[showModal])

  function handleSubmitBtnClick() {
    if (!phoneNumber) {
      modalRef.current?.showMessage("手机号不能为空");
      return;
    }

    if (!password) {
      modalRef.current?.showMessage("密码不能为空");
      return;
    }
    request({
      url: "/login.json",
      method: "POST",
      data: { phone: phoneNumber, password: password },
    })
      .then((data) => {
        data && console.log(data);
        const {data: { token } }= data;
        if (token) {
          localStorage.setItem('token', token);
          navigate('/home');
        }
      })
      .catch((e) => {
        // modalRef.current?.showMessage(e.message || "未知异常");
        localStorage.setItem('token', localLogin.data.token);
        navigate('/home');
      });
  }

  return (
    // <div className="page login-page">
    //   <div className="tab">
    //     <div className="tab-item tab-item-left">登陆</div>
    //     <Link to="/register">
    //       <div className="tab-item tab-item-right">注册</div>
    //     </Link>
    //   </div>
    //   <div className="form">
    //     <div className="form-item">
    //       <div className="form-item-title">手机号</div>
    //       <input
    //         className="form-item-content"
    //         placeholder="请输入手机号"
    //         value={phoneNumber}
    //         onChange={(e) => {
    //           setPhoneNumber(e.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="form-item">
    //       <div className="form-item-title">密码</div>
    //       <input
    //         type="password"
    //         className="form-item-content"
    //         placeholder="请输入密码"
    //         value={password}
    //         onChange={(e) => {
    //           setPassword(e.target.value);
    //         }}
    //       />
    //     </div>
    //   </div>
    //   <div className="submit" onClick={handleSubmitBtnClick}>
    //     登陆
    //   </div>
    //   <p className="notice">*登录即表示您赞同使用条款及隐私政策</p>
    //   <Modal ref={modalRef} />
    // </div>
    <>
      <div className="form">
        <div className="form-item">
          <div className="form-item-title">手机号</div>
          <input
            className="form-item-content"
            placeholder="请输入手机号"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>
        <div className="form-item">
          <div className="form-item-title">密码</div>
          <input
            type="password"
            className="form-item-content"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="submit" onClick={handleSubmitBtnClick}>
        登陆
      </div>
      <p className="notice">*登录即表示您赞同使用条款及隐私政策</p>
      <Modal ref={modalRef} />
    </>
  );
};

export default Login;

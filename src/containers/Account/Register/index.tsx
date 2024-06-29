import { useRef, useState } from "react";
// import "./style.scss";
import useRequest from '../../../hooks/useRequest';
import Modal, { ModalInterfaceType } from "../../../components/Modal";
import { useNavigate } from "react-router-dom";

type ResponseType = {
  success:boolean;
  data:any;
}

const Register = () => {
  const modalRef = useRef<ModalInterfaceType>(null!);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const navigate = useNavigate();

  const { request } = useRequest<ResponseType>();

  function handleSubmitBtnClick() {
    if (!userName) {
      modalRef.current?.showMessage("用户号不能为空");
      return;
    }
    if (!phoneNumber) {
      modalRef.current?.showMessage("手机号不能为空");
      return;
    }
    if (!password) {
      modalRef.current?.showMessage("密码不能为空");
      return;
    }
    if (password.length < 6) {
      modalRef.current?.showMessage("密码不能小于6位");
      return;
    }
    if (checkPassword !== password) {
      modalRef.current?.showMessage("两次密码不一致");
      return;
    }
    request({
      url: "/login.json",
      method: "POST",
      data: {
        userName: userName,
        phone: phoneNumber,
        password: password,
        checkPassword: checkPassword,
      },
    })
      .then((data) => {
        data && console.log(data);
        navigate('/account/login');
      })
      .catch((e) => {
        modalRef.current?.showMessage(e.message || "未知异常");
      });
  }

  return (
    // <div className="page register-page">
    //   <div className="tab">
    //     <Link to="/login">
    //       <div className="tab-item tab-item-left">登陆</div>
    //     </Link>
    //     <div className="tab-item tab-item-right">注册</div>
    //   </div>
    //   <div className="form">
    //     <div className="form-item">
    //       <div className="form-item-title">用户名</div>
    //       <input
    //         className="form-item-content"
    //         placeholder="请输入用户名"
    //         value={userName}
    //         onChange={(e) => {
    //           setUserName(e.target.value);
    //         }}
    //       />
    //     </div>
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
    //     <div className="form-item">
    //       <div className="form-item-title">确认密码</div>
    //       <input
    //         type="password"
    //         className="form-item-content"
    //         placeholder="请输入确认密码"
    //         value={checkPassword}
    //         onChange={(e) => {
    //           setCheckPassword(e.target.value);
    //         }}
    //       />
    //     </div>
    //   </div>
    //   <div className="submit" onClick={handleSubmitBtnClick}>
    //     注册
    //   </div>
    //   <Modal ref={modalRef} />
    // </div>
    <>
          <div className="form">
        <div className="form-item">
          <div className="form-item-title">用户名</div>
          <input
            className="form-item-content"
            placeholder="请输入用户名"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
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
        <div className="form-item">
          <div className="form-item-title">确认密码</div>
          <input
            type="password"
            className="form-item-content"
            placeholder="请输入确认密码"
            value={checkPassword}
            onChange={(e) => {
              setCheckPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="submit" onClick={handleSubmitBtnClick}>
        注册
      </div>
      <Modal ref={modalRef} />
    </>
  );
};

export default Register;

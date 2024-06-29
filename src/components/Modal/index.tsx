import { createPortal } from "react-dom";
import "./styles.scss";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";


export type ModalInterfaceType = {
    showMessage:(message:string) => void
}

const Modal = forwardRef<ModalInterfaceType>((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const divRef = useRef(document.createElement('div'));
  const divElement = divRef.current;

  useImperativeHandle(ref, ()=>{
    return {
        showMessage(message: string) {
            setMessage(message);
            setShowModal(true);
            setTimeout(()=>{
                setShowModal(false);
            },1500)
        }
    }
  },[]);

  useEffect(() => {
    if (showModal) {
      document.body.appendChild(divElement);
    } else {
      if (divElement.parentNode) {
        document.body.removeChild(divElement);
      }
    }
    return () => {
      if (divElement.parentNode) {
        document.body.removeChild(divElement);
      }
    };
  }, [divElement, showModal]);

  return createPortal(
    <div className="modal">
      <div className="modal-text">{message || "出现错误"}</div>
    </div>,
    divElement
  );

});

export default Modal;

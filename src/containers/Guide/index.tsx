// import { useCallback, useEffect, useRef } from 'react';
import { useEffect, useRef } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';


// const useRefAnimation = () => {
//   const ref = useRef<HTMLDivElement>(null!);
//   useEffect(()=> {
//     ref.current.style.opacity = '1';
//   },[])
//   return ref;
// }

function Guide() {

  // const ref = useRefAnimation();
  const ref = useRef<HTMLDivElement>(null!);
  useEffect(()=> {
    ref.current.style.opacity = '1';
  },[])

  // const handleIconClick = useCallback(()=>{
  //   navigate('./login');
  // },[navigate]);
  const navigate = useNavigate();
  function handleIconClick() {
    navigate('./login');
  }

  return (
    <div className="page guild-page" ref={ref}>
      <img
        className="main-pic"
        src={require("../../images/halg_logo_icon_@2x.png")}
        alt="huaLe-logo"
      />
      <p className="title">欢乐购</p>
      <img
        className="sub-pic"
        src={require("../../images/slogn_word_icon_@2x.png")}
        alt="huaLeSub-logo"
      />
      <div className="iconfont arrow-icon" onClick={handleIconClick}>
        &#xe60c;
      </div>
    </div>
  );
}

export default Guide;
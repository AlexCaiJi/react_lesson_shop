import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import useRequest from "../../hooks/useRequest";
import { useRef, useState } from "react";
import { ResponseType } from "./types";
import Popover from "../../components/Popover";
import detailLocalData from './detail.json';

function Detail() {
  const navigate = useNavigate();

  const params = useParams<{ id: string }>();
  // 请求 Detail 商品内容逻辑 (useRef 全局存储变量)
  const requestData = useRef({
    url: "/detail.json",
    method: "GET",
    params: { id: params?.id || "0" },
  });
  const { data } = useRequest<ResponseType>(requestData.current);
  const result = data?.data || detailLocalData.data;
  const [showCart, setShowCart] = useState(false);
  const [count, setCount] = useState(0);

  function changeCount(count: number) {
    if (count < 0) {
      setCount(0);
    } else {
      setCount(count);
    }
  }

  function changeCartInfo() {
    setShowCart(false);
  }

  return result ? (
    <div className="page detail-page">
      <div className="title">
        <div className="iconfont" onClick={() => navigate(-1)}>
          &#xe6db;
        </div>
        商品详情
      </div>
      <img className="image" src={result?.imgUrl} alt="" />
      <div className="main">
        <div className="main-content">
          <div className="main-price">
            <span className="main-price-yen">&yen;</span>
            {result.price}
          </div>
          <div className="main-sales">已售{result.sales}</div>
          <div className="main-content-title">{result.title}</div>
          <p className="main-content-subtitle">{result.subtitle}</p>
        </div>
      </div>
      <div className="spec">
        <div className="spec-title">规格信息</div>
        <div className="spec-content">
          <div className="spec-content-left">
            <p className="spec-content-item">产地</p>
            <p className="spec-content-item">规格</p>
          </div>
          <div className="spec-content-right">
            <p className="spec-content-item">{result.origin}</p>
            <p className="spec-content-item">{result.specification}</p>
          </div>
        </div>
      </div>
      <div className="detail">
        <div className="detail-title">商品信息</div>
        <div className="detail-content">{result.detail}</div>
      </div>
      <div className="docker">
        <div className="cart-icon">
          <div className="iconfont">
            &#xe881;<span className="icon-count">{count}</span>
          </div>
          <div className="icon-text">购物车</div>
        </div>
        <div
          className="cart-button"
          onClick={() => {
            setShowCart(true);
          }}
        >
          加入购物车
        </div>
      </div>
      <Popover
        show={showCart}
        blankClickCallback={() => {
          setShowCart(false);
        }}
      >
        <div className="cart">
          <div className="cart-content">
            <img src={result.imgUrl} alt="" className="cart-content-img" />
            <div className="cart-content-info">
              <div className="cart-content-title">{result.title}</div>
              <div className="cart-content-price">
                <span className="cart-content-price-yen">&yen;</span>
                {result.price}
              </div>
            </div>
          </div>
          <div className="cart-count">
            <div className="cart-count-content">
              购买数量
              <div className="cart-count-counter">
                <div
                  className="cart-count-button"
                  onClick={() => {
                    changeCount(count - 1);
                  }}
                >
                  -
                </div>
                <div className="cart-count-text">{count}</div>
                <div
                  className="cart-count-button"
                  onClick={() => {
                    changeCount(count + 1);
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="cart-button" onClick={() => changeCartInfo()}>
            加入购物车
          </div>
        </div>
      </Popover>
    </div>
  ) : null;
}

export default Detail;

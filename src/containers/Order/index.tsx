import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { ResponseType, ResponseDataType, AddressItemType, PaymentResponseType } from "./types";
import useRequest from "../../hooks/useRequest";
import { useEffect, useState } from "react";
import { message } from "../../utils/message";
import Popover from "../../components/Popover";
import { Picker } from "antd-mobile";
import localOrderDetail from "./orderDetail.json";

function Order() {
  const { request } = useRequest<ResponseType>({ manual: true });
  const { request: paymentRequest } = useRequest<PaymentResponseType>({ manual: true});

  const [data, setData] = useState<ResponseDataType | null>(null);
  const [showAddress, setShowAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showTimeRange, setShowTimeRange] = useState(false);
  const [payWay, setPayWay] = useState("weixin");

  const navigate = useNavigate();

  const params = useParams<{ id: string }>();

  const addresses = [
    {
      id: "1",
      name: "李大雷",
      phone: "1762662121",
      address: "北京市昌平区南邵镇风景丽苑69号",
    },
    {
      id: "2",
      name: "王大炮",
      phone: "1762662121",
      address: "北京市昌平区南邵镇风景丽苑60号",
    },
    {
      id: "3",
      name: "赵三金",
      phone: "1762662121",
      address: "北京市昌平区南邵镇风景丽苑88号",
    },
  ];

  useEffect(() => {
    request({
      url: "/orderDetail.json",
      method: "GET",
      params: {
        id: params.id,
      },
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => {
        setData(localOrderDetail.data);
        message(e.message);
      });
  }, [params.id, request]);

  function handleAddressClick(address: AddressItemType) {
    if (data) {
      const newData = { ...data };
      newData.address = address;
      setData(newData);
      setShowAddress(false);
    }
  }

  function handleTimeClick() {
    setShowTimeRange(true);
  }

  function handleOrderSubmit() {
    const orderId = params.id;
    const addressId = data?.address.id;
    const time = data?.time;
    paymentRequest({
      method: 'GET',
      url: '/pay.json',
      data: {
        orderId,
        addressId,
        time,
        payWay
      }
    }).then((response) => {
      if(response.data) {
        navigate('/home')
      }else {
        message('支付失败');
      }
    }).catch(e => {
      message(e.message)
    } )
  }

  return data ? (
    <div className="page order-page">
      <div className="title">
        <div className="iconfont" onClick={() => navigate(-1)}>
          &#xe6db;
        </div>
        确定订单
      </div>
      <div
        className="receiver"
        onClick={() => {
          setShowAddress(true);
        }}
      >
        <div className="iconfont">&#xe67c;</div>
        <div className="receiver-content">
          <div className="receiver-name">
            收货人：{data.address.name}
            <span className="receiver-phone">18720408888888</span>
          </div>
          <div className="receiver-address">
            收货人地址：{data.address.address}
          </div>
        </div>
      </div>
      <div
        className="delivery"
        onClick={() => {
          handleTimeClick();
        }}
      >
        <div className="delivery-text">送达时间</div>
        <div className="delivery-select">
          {data.time?.[0]} {data.time?.[1]}:{data.time?.[2]}
        </div>
      </div>
      {data.shop.map((shop) => {
        return (
          <div className="shop" key={shop.shopId}>
            <div className="shop-title" onClick={() => {}}>
              <span className="iconfont">&#xe676;</span>
              {shop.shopName}
            </div>
            <div className="shop-products">
              {shop.cartList.map((product) => {
                return (
                  <div
                    className="shop-product"
                    key={product.productId}
                    onClick={() => {}}
                  >
                    <img
                      className="shop-product-img"
                      src="http://statics.dell-lee.com/shopping/list-2.png"
                      alt=""
                    />
                    <div className="shop-product-content">
                      <div className="shop-product-title">{product.title}</div>
                      <div className="shop-product-kilo">{product.weight}</div>
                    </div>
                    <div className="shop-product-order">
                      <div className="shop-product-price">
                        &yen;{product.price}
                      </div>
                      <div className="shop-product-count">x{product.count}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="footer">
        <div className="footer-total">
          合计：
          <span className="footer-total-price">
            <span>&yen;</span>
            {data.total}
          </span>
        </div>
        <div
          className="footer-submit"
          onClick={() => {
            setShowPayment(true);
          }}
        >
          提交订单
        </div>
      </div>
      <Popover
        show={showAddress}
        blankClickCallback={() => {
          setShowAddress(false);
        }}
      >
        <div className="address-popover">
          <div className="address-popover-title">选择地址</div>
          {addresses.map((item) => {
            return (
              <div
                className="address-item"
                key={item.name}
                onClick={() => {
                  handleAddressClick(item);
                }}
              >
                <div className="address-item-name">
                  收货人：{item.name}
                  <span className="address-item-phone">{item.phone}</span>
                </div>
                <div className="address-item-address">
                  收货人地址：{item.address}
                </div>
              </div>
            );
          })}
        </div>
      </Popover>
      <Popover
        show={showPayment}
        blankClickCallback={() => {
          setShowPayment(false);
        }}
      >
        <div className="payment-popover">
          <div className="payment-popover-title">选择支付方式</div>
          <div className="payment-popover-price"><span>&yen;</span> {data.total}</div>
          <div className="payment-popover-products">
            <div className="payment-popover-product" onClick={()=> { setPayWay('weixin')}}>
              <img
                className="payment-popover-img"
                src="http://statics.dell-lee.com/shopping/weixin.png"
                alt="微信"
              />
              微信
              <div
                className={payWay === "weixin" ? "radio radio-active" : "radio"}
              ></div>
            </div>
            <div className="payment-popover-product" onClick={()=> { setPayWay('cash')}}>
              <img
                className="payment-popover-img"
                src="http://statics.dell-lee.com/shopping/cash.png"
                alt="余额"
              />
              余额 {data.money}
              <div
                className={payWay === "cash" ? "radio radio-active" : "radio"}
              ></div>
            </div>
            <div className='payment-popover-button' onClick={handleOrderSubmit}>立即支付</div>
          </div>
        </div>
      </Popover>
      <Picker
        columns={data.timeRange}
        visible={showTimeRange}
        onClose={() => {
          setShowTimeRange(false);
        }}
        value={data.time}
        onConfirm={(value) => {
          if (data) {
            const newData = { ...data };
            newData.time = value as string[];
            setData(newData);
          }
          setShowTimeRange(false);
        }}
      />
    </div>
  ) : null;
}

export default Order;

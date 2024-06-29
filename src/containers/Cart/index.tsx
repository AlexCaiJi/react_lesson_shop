import { useEffect, useState } from "react";
import TabBar from "../../components/Tabbar";
import useRequest from "../../hooks/useRequest";
import "./style.scss";
import { ResponseType, ListItemType, CartSubmitArray } from "./types";
import { message } from "../../utils/message";
import { useNavigate } from "react-router-dom";
import localCartData from "./cartProducts.json";

function Cart() {
  const { request } = useRequest<ResponseType>({ manual: true });
  const [list, setList] = useState<ListItemType[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    request({
      url: "/cartProducts.json",
      method: "GET",
    })
      .then((data) => {
        const list = data.data;
        setCartData(list);
      })
      .catch((e) => {
        const list = localCartData.data;
        setCartData(list);
        message(e.message);
      });
  }, [request]);
  
  function setCartData(list: Array<ListItemType>) {
    const newList = list.map((shop) => {
      const newCartList = shop.cartList.map((product) => {
        return { ...product, selected: false };
      });
      return {
        shopId: shop.shopId,
        shopName: shop.shopName,
        cartList: newCartList,
      };
    });
    setList(newList);
  }

  function handleCountChange(shopId: string, productId: string, count: string) {
    const newList = [...list];
    const shop = list.find((shop) => shop.shopId === shopId);
    shop?.cartList.forEach((product) => {
      if (product.productId === productId) {
        const countNumber = +count;
        product.count = Number(isNaN(countNumber)) ? 0 : countNumber;
      }
    });
    setList(newList);
  }

  function handleProductLick(shopId: string, productId: string) {
    const newList = [...list];
    const shop = list.find((shop) => shop.shopId === shopId);
    let shopAllSelected = true;
    shop?.cartList.forEach((product) => {
      if (product.productId === productId) {
        product.selected = !product.selected;
      }
      if (!product.selected) {
        shopAllSelected = false;
      }
    });
    shop!.selected = shopAllSelected;
    setList(newList);
  }

  function handleShopSelectClick(shopId: string) {
    const newList = [...list];
    const shop = list.find((shop) => shop.shopId === shopId);
    shop!.selected = !shop!.selected;
    shop?.cartList.forEach((product) => {
      product.selected = shop!.selected;
    });
    setList(newList);
  }

  function handleSelectAll() {
    setAllSelected(!allSelected);
    const newList = [...list];
    // eslint-disable-next-line array-callback-return
    newList.map((shop) => {
      shop.selected = allSelected;
      shop.cartList.forEach((product) => {
        product.selected = allSelected;
      });
    });
    setList(newList);
  }

  function handleCartSubmit() {
    const params: CartSubmitArray = [];
    const newList = [...list];
    // eslint-disable-next-line array-callback-return
    newList.map((shop) => {
      shop.cartList.forEach((product) => {
        if (product.selected) {
          params.push({ productId: product.productId, count: product.count });
        }
      });
    });
    if (params.length === 0) {
      message("你没有勾选任何商品");
      return;
    }
    navigate(`/order/${112}`);
  }

  const notSelectedShop = list.find((shop) => !shop.selected);
  let count = 0;
  let totalPrice = 0;
  list.forEach((shop) => {
    shop.cartList.forEach((product) => {
      if (product.selected) {
        count++;
        totalPrice += product.count * product.price;
      }
    });
  });

  return (
    <div className="page cart-page">
      <div className="title">购物车</div>
      {list.map((shop) => {
        return (
          <div className="shop" key={shop.shopId}>
            <div
              className="shop-title"
              onClick={() => {
                handleShopSelectClick(shop.shopId);
              }}
            >
              <div
                className={shop.selected ? "radio radio-active" : "radio"}
              ></div>
              <span className="iconfont">&#xe676;</span>
              {shop.shopName}
            </div>
            <div className="shop-products">
              {shop.cartList.map((product) => {
                return (
                  <div
                    className="shop-product"
                    key={product.productId}
                    onClick={() => {
                      handleProductLick(shop.shopId, product.productId);
                    }}
                  >
                    <div
                      className={
                        product.selected ? "radio radio-active" : "radio"
                      }
                    ></div>
                    <img
                      className="shop-product-img"
                      src={product.imgUrl}
                      alt=""
                    />
                    <div className="shop-product-content">
                      <div className="shop-product-title">{product.title}</div>
                      <div className="shop-product-kilo">{product.weight}</div>
                      <div className="shop-product-price">
                        <span className="shop-product-price-yen">&yen;</span>
                        {product.price}
                      </div>
                      <input
                        className="shop-product-count"
                        value={product.count}
                        onClick={(e)=>{e.stopPropagation()}}
                        onChange={(e) => {
                          handleCountChange(
                            shop.shopId,
                            product.productId,
                            e.target.value
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="total-price">
        <div
          className="select-all"
          onClick={() => {
            handleSelectAll();
          }}
        >
          <div
            className={notSelectedShop ? "radio" : "radio radio-active"}
          ></div>
          <div className="select-all-text">全选</div>
        </div>
        <div className="total">
          <span className="total-text">合计:</span>
          <div className="total-price-inner">
            <span className="total-price-inner-yen">&yen;</span>
            {totalPrice}
          </div>
        </div>
        <div
          className="check"
          onClick={() => {
            handleCartSubmit();
          }}
        >
          结算{count}
        </div>
      </div>
      <TabBar activeName="cart" />
    </div>
  );
}

export default Cart;

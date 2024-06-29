import { useNavigate } from "react-router-dom";
import "./style.scss";
import React, { useEffect, useState } from "react";
import Docker from "../Home/Components/Docker";
import useRequest from "../../hooks/useRequest";
import type {
  CategoryAndTagResponseType,
  ProductResponseType,
  ProductType,
} from "./types";
import { message } from "../../utils/message";
import TabBar from "../../components/Tabbar";
import Popover from "../../components/Popover";
import localCategoryProductsAndTag from './category-list.json';
import localCategoryProducts from './category-search-list.json';

function Category() {
  const [categoryes, setCategory] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >();
  const [tags, setTags] = useState<Array<string>>([]);
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  const { request: tagRequest } = useRequest<CategoryAndTagResponseType>({
    manual: true,
  });
  const { request: productRequest } = useRequest<ProductResponseType>({
    manual: true,
  });

  const [showCart, setShowCart] = useState(false);
  const [count, setCount] = useState(0);
  const [cartProductInfo, settProductInfo] = useState({
    id: "",
    title: "",
    imageUlr: "",
    price: 0,
    count: 0,
  });

  useEffect(() => {
    productRequest({
      url: "/categoryProduct.json",
      method: "POST",
      data: { tag: currentTag, keyword, category: currentCategory },
    })
      .then((data) => {
        if (data?.success) {
          const result = data.data;
          setProducts(result);
        }
      })
      .catch((e: any) => {
        const result = localCategoryProducts.data;
        setProducts(result);
        message(e?.message);
      });
  }, [keyword, currentCategory, currentTag, productRequest]);

  useEffect(() => {
    tagRequest({ url: "/categoryAndTagList.json", method: "GET" })
      .then((data) => {
        if (data?.success) {
          const result = data.data;
          setCategory(result.category);
          setTags(result.tag);
        }
      })
      .catch((e: any) => {
        const result = localCategoryProductsAndTag.data;
        setCategory(result.category);
        setTags(result.tag);
        message(e?.message);
      });
  }, [tagRequest]);

  const navigate = useNavigate();

  function handleKeyDown(key: string, target: EventTarget & HTMLInputElement) {
    if (key === "Enter") {
      setKeyword(target.value);
    }
  }

  function changeCount(type: "minus" | "add") {
    if (type === "minus") {
      if (count <= 0) {
        setCount(0);
      } else {
        setCount(count - 1);
      }
    } else {
      setCount(count + 1);
    }
  }

  function changeCartInfo() {
    setShowCart(false);
  }

  function handleCartProductClick(item:ProductType, e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    const newCartProductInfo = { ...cartProductInfo };
    newCartProductInfo.title = item.title;
    newCartProductInfo.id = item.id;
    newCartProductInfo.imageUlr = item.imgUrl;
    newCartProductInfo.price = item.price;
    settProductInfo(newCartProductInfo);
    setShowCart(true);
  }

  return (
    <div className="page category-page">
      <div className="title">分类</div>
      <div className="search">
        <div className="search-area">
          <div className="search-icon iconfont">&#xe643;</div>
          <input
            className="search-input"
            placeholder="请输入商品名称"
            onChange={(e) => {
              if (e.target.value === "") {
                setKeyword("");
              }
            }}
            onKeyDown={(e) => {
              handleKeyDown(e.key, e.currentTarget);
            }}
          />
        </div>
      </div>
      <div className="category">
        <div
          className={
            currentCategory === ""
              ? "category-item category-item-active"
              : "category-item"
          }
          onClick={() => {
            setCurrentCategory("");
          }}
        >
          全部商品
        </div>
        {categoryes?.map((item) => {
          return (
            <div
              className={
                item.id === currentCategory
                  ? "category-item category-item-active"
                  : "category-item"
              }
              key={item.id}
              onClick={() => {
                setCurrentCategory(item.id);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className="tag">
        <div
          className={
            currentTag === "" ? "tag-item tag-item-active" : "tag-item"
          }
          onClick={() => {
            setCurrentTag("");
          }}
        >
          全部
        </div>
        {tags.map((tag, index) => {
          return (
            <div
              className={
                tag === currentTag ? "tag-item tag-item-active" : "tag-item"
              }
              key={`${tag}${index}`}
              onClick={() => {
                setCurrentTag(tag);
              }}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <div className="product">
        <div className="product-title">精品商品（{products.length}）</div>
        {products.map((item) => {
          return (
            <div className="product-item" key={item.id} onClick={()=> { navigate(`/detail/${item.id}`) }}>
            {/* // <div className="product-item" key={item.id}> */}
              <img className="product-item-img" src={item.imgUrl} alt="" />
              <div className="product-item-content">
                <div className="product-item-title">{item.title}</div>
                <div className="product-item-sales">{item.sales}</div>
                <div className="product-item-price">
                  <span className="product-item-price-yen">&yen;</span>{" "}
                  {item.price}
                </div>
                <div
                  className="product-item-button"
                  onClick={(e) => {
                    handleCartProductClick(item, e);
                  }}
                >
                  购买
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Popover
        show={showCart}
        blankClickCallback={() => {
          setShowCart(false);
        }}
      >
        <div className="cart">
          <div className="cart-content">
            <img
              src={cartProductInfo.imageUlr}
              alt=""
              className="cart-content-img"
            />
            <div className="cart-content-info">
              <div className="cart-content-title">{cartProductInfo.title}</div>
              <div className="cart-content-price">
                <span className="cart-content-price-yen">&yen;</span>
                {cartProductInfo.price}
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
                    changeCount('minus');
                  }}
                >
                  -
                </div>
                <div className="cart-count-text">{count}</div>
                <div
                  className="cart-count-button"
                  onClick={() => {
                    changeCount('add');
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="cart-buttons">
            <div
              className="cart-button cart-button-left"
              onClick={() => changeCartInfo()}
            >
              加入购物车
            </div>
            <div className="cart-button cart-button-right">立即购买</div>
          </div>
        </div>
      </Popover>

      {/* <Docker
        selectId={"2"}
        onClick={() => {}}
        dockers={[
          { icon: "&#xe6af;", name: "首页", id: "1" },
          { icon: "&#xe62f;", name: "分类", id: "2" },
          { icon: "&#xe70b;", name: "购物车", id: "3" },
          { icon: "&#xe64a;", name: "我的", id: "4" },
        ]}
      /> */}
      <TabBar activeName="category" />
    </div>
  );
}

export default Category;

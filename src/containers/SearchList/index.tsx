import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import type { ResponseType } from "./types";
import localSearchListData from "./shop-search-list.json";


function SearchList() {
  
  const navigate = useNavigate();

  const params = useParams<{shopId: string, keyword: string}>();
  console.log(params.shopId, params.keyword);

  const [keyword, setKeyword] = useState(params.keyword);
  const [ tabValue, setTabValue] = useState('default');
  
  useEffect(() => {
    setKeyword(params.keyword);
  }, [params.keyword]);

  const [requestData, setRequestData] = useState({
    url: '/shop-search-list.json',
    method: 'GET',
    params: {
      keyword,
      shopId: params.shopId,
      type: tabValue,
    }
  });

  const { data } = useRequest<ResponseType>(requestData);
  // console.log(data);
  const list = data?.data || localSearchListData.data;

  function handleKeyDown(key: string) {
    if (key === "Enter" && keyword) {
      const localSearchList = localStorage.getItem('search-list');
      const searchListHistory: string[] = localSearchList ? JSON.parse(localSearchList) : [];

      const keywordIndex = searchListHistory.findIndex(item => item === keyword);
      const newHistoryList = [...searchListHistory];
      if (keywordIndex > -1) {
        newHistoryList.splice(keywordIndex, 1);
      }
      newHistoryList.unshift(keyword);
      if (newHistoryList.length > 20) {
        newHistoryList.length = 20;
      }
      localStorage.setItem('search-list', JSON.stringify(newHistoryList));
      const newRequestData = { ...requestData };
      newRequestData.params.keyword = keyword;
      setRequestData(newRequestData);
    }
  }

  function clearKeyword() {
    setKeyword('');

  }

  function handleTabClick(value: string) {
    setTabValue(value);
    const newRequestData = { ...requestData };
    newRequestData.params.type = tabValue;
    setRequestData(newRequestData);
  }

  return (
    <div className="page search-list-page">
      <div className="search">
        <div className="search-back iconfont" onClick={() => navigate("/search")}>
          &#xe6db;
        </div>
        <div className="search-area">
          <div className="search-icon iconfont">&#xe643;</div>
          <input
            className="search-input"
            placeholder="请输入商品名称"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e.key);
            }}
          />
        </div>
        <div className="search-clear iconfont" onClick={clearKeyword}>
          &#xe619;
        </div>
      </div>
      <div className="tab">
        <div
          className={
            tabValue === "default" ? "tab-item tab-item-active" : "tab-item "
          }
          onClick={() => {
            handleTabClick("default");
          }}
        >
          默认
        </div>
        <div
          className={
            tabValue === "sales" ? "tab-item tab-item-active" : "tab-item "
          }
          onClick={() => {
            handleTabClick("sales");
          }}
        >
          销量
        </div>
        <div
          className={
            tabValue === "price" ? "tab-item tab-item-active" : "tab-item "
          }
          onClick={() => {
            handleTabClick("price");
          }}
        >
          价格
        </div>
      </div>
      <div className="list">
        {list.map((item) => {
          return (
            <div className="item" key={item.id} onClick={()=>navigate(`/detail/${item.id}`)}>
              <img className="item-img" src={item.imgUrl} alt="item-img" />
              <div className="item-content">
                <p className="item-title">{item.title}</p>
                <div className="item-price">
                  <span className="item-price-yen">&yen;</span>
                  {item.price}
                </div>
                <div className="item-sales">{item.sales}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bottom">-我是有底线的-</div>
    </div>
  );
}

export default SearchList;

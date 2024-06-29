import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useState } from "react";

function Search() {
  const localSearchList = localStorage.getItem("search-list");
  const searchListHistory: string[] = localSearchList
    ? JSON.parse(localSearchList)
    : [];
  const [keyword, setKeyword] = useState("");
  const [historyList, setHistoryList] = useState(searchListHistory);
  const navigate = useNavigate();

  const hosts = ['傻鸟牛丸', '肌肉', '鸭肉', '五花肉', '骨肉项链'];

  function handleKeyDown(key: string) {
    if (key === "Enter" && keyword) {

      const keywordIndex = historyList.findIndex(item => item === keyword);
      const newHistoryList = [...historyList];

      if (keywordIndex > -1) {
         newHistoryList.splice(keywordIndex, 1);
      }
      newHistoryList.unshift(keyword);
      if (newHistoryList.length > 20) {
        newHistoryList.length = 20;
      }
      setHistoryList(newHistoryList);
      localStorage.setItem("search-list", JSON.stringify(newHistoryList));
      setKeyword('');
    }
  }

  function handleHistoryClean() {
    setHistoryList([]);
    localStorage.setItem("search-list", JSON.stringify([]));
  }

  function handleItemClick(title: string | null) {
    navigate(`/searchList/${title}/${(title?.length ?? 0) > 0 ? title : '肌肉'}`);
  }
 

  return (
    <div className="page search-page">
      <div className="search">
        <div className="search-back iconfont" onClick={() => navigate("/home")}>
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
      </div>
      {historyList.length > 0 && (
        <div className="title">
          历史搜索
          <div className="iconfont title-close" onClick={handleHistoryClean}>
            &#xe619;
          </div>
        </div>
      )}
      <ul className="list">
        {historyList.map((item) => {
          return (
            <li
              className="list-item"
              key={item}
              onClick={() => {
                handleItemClick(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <div className="title">热门搜索</div>
      <ul className="list">
        {
          hosts.map(item => {
            return (
              <li
              className="list-item"
              key={item}
              id={item}
              onClick={() => {
                handleItemClick(document.getElementById(item)?.innerText ?? '');
              }}
            >
              {item}
            </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default Search;

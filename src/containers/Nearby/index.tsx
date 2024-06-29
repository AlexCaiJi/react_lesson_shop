import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import "./style.scss";
import { ResponseType } from "./types";
import { it } from "node:test";
import { useNavigate } from "react-router-dom";
import localNearbyData from "./nearby.json";

const localLocation = localStorage.getItem("location");
const locationHistory = localLocation ? JSON.parse(localLocation) : null;

const defaultRequestData = {
  url: "/nearby.json",
  method: "POST",
  data: {
    lat: locationHistory ? locationHistory.latitude : 37.7304367,
    log: locationHistory ? locationHistory.longitude : -122.384425,
  },
};

function Nearby() {
  const { data } = useRequest<ResponseType>(defaultRequestData);

  const [ inputValue, setInputValue ] = useState('');

  const navigate = useNavigate();

  const list = (data?.data || localNearbyData.data).filter(item => { return item.name.indexOf(inputValue) > -1 });


  function handleItemClick(lat:string, log:string) {
    localStorage.setItem('location', JSON.stringify({latitude:lat, longitude:log}));
    navigate(-1);
  }

  return (
    <div className="page nearby-page">
      <div className="title">
        <div className="iconfont title-icon" onClick={()=>navigate('/home')}>&#xe6db;</div>切换门店
      </div>
      <div className="search">
        <div className="search-icon iconfont">&#xe643;</div>
        <input className="search-input" placeholder="请输入地址" value={inputValue} onChange={(e)=> { setInputValue(e.target.value) } } />
      </div>
      <div className="subtitle">附近门店</div>
      <ul className="list">
        {list.map((item) => {
          return (
            <li className="list-item" key={item.id} onClick={()=>{ handleItemClick(item.lat, item.log) }}>
              <div className="list-item-left">
                <div className="list-item-title">{item.name}</div>
                <p className="list-item-desc">联系电话：{item.phone}</p>
                <p className="list-item-desc">{item.address}</p>
              </div>
              <div className="list-item-right">
                <span className="iconfont list-item-distance">&#xe67c;</span>{" "}
                {item.distance}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Nearby;

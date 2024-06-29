import "./style.scss";
import type { ResponseType } from "./types";
import "swiper/css";
import { useEffect, useState } from "react";
import { message } from "../../utils/message";
import useRequest from "../../hooks/useRequest";
import Banner from "./Components/Banner";
import Category from "./Components/Category";
import Card from "./Components/Card";
import Docker from "./Components/Docker";
import TabBar from "../../components/Tabbar";
import homeLocalData from './home.json';

const defaultRequestData = {
  url: "/home.json",
  method: "POST",
  data: {
    lat: 37.7304367,
    log: -122.384425,
  },
};

function Home() {
  const localLocation = localStorage.getItem("location");
  const locationHistory = localLocation ? JSON.parse(localLocation) : null;

  if (locationHistory) {
    defaultRequestData.data.lat = locationHistory.latitude;
    defaultRequestData.data.log = locationHistory.log;
  }
  const [requestData, setRequestData] = useState(defaultRequestData);
  const { data } = useRequest<ResponseType>(requestData);
  console.log(data);
  const [selectTabId, setSelectTabId] = useState("1");

  let location,
    banners,
    categories,
    freshes = undefined;
  const dataResult = data?.data;
  if (dataResult) {
    location = dataResult.location;
    banners = dataResult.banners;
    categories = dataResult.categories;
    freshes = dataResult.freshes;
  }  else {
    const homeLocal = homeLocalData.data;
    location = homeLocal.location;
    banners = homeLocal.banners;
    categories = homeLocal.categories;
    freshes = homeLocal.freshes;
  }

  return (
    <div className="page home-page">
      <Banner location={location} banners={banners} />
      <Category categories={categories} />
      <Card cards={freshes} title={"新品尝鲜"} />
      <Card cards={freshes} title={"限时抢购"} />
      <div className="bottom">-我是有底线的-</div>
      {/* <Docker
        selectId={selectTabId}
        onClick={(id) => { setSelectTabId(id)}}
        dockers={[
          { icon: "&#xe6af;", name: "首页", id: "1" },
          { icon: "&#xe62f;", name: "分类", id: "2" },
          { icon: "&#xe70b;", name: "购物车", id: "3" },
          { icon: "&#xe64a;", name: "我的", id: "4" },
        ]}
      /> */}
      <TabBar activeName="home" />
    </div>
  );
}

export default Home;

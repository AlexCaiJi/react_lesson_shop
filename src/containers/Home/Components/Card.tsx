import { useNavigate } from "react-router-dom";
import { CardListType } from "../types";

type CardTypePropsType = {
  title: string;
  cards: CardListType | undefined;
};

const Card = (props: CardTypePropsType) => {
  const navigate = useNavigate();

  const { title, cards } = props;

  return (
    <div className="card">
      <h3 className="card-title">
        <img
          className="card-title-img"
          src="http://statics.dell-lee.com/shopping/hot.png"
          alt="新品尝鲜"
        />
        {title}
        <div className="card-title-more">
          更多 <span className="iconfont">&#xe716;</span>
        </div>
      </h3>
      <div className="card-content">
        {(cards || []).map((item) => {
          return (
            <div
              className="card-content-item"
              key={item.id}
              onClick={() => navigate(`/detail/${item.id}`)}
            >
              <img
                className="card-content-item-img"
                src={item.imgUrl}
                alt={item.name}
              />
              <p className="card-content-item-desc">{item.name}</p>
              <div className="card-content-item-price">
                <span className="card-content-item-yen">&yen;</span>
                {item.price}
                <div className="iconfont">&#xe7e0;</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;

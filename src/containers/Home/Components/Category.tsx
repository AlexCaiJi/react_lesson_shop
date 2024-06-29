import { CategoriesType } from "../types";

type CategoriesTypePropsType = {
    categories: CategoriesType | undefined;
}

const Category = (props:CategoriesTypePropsType) => {
    const {  categories } = props;
    return (
        <div className="category">
        {(categories || []).map((item) => {
          return (
            <div className="category-item" key={item.id}>
              <img
                className="category-item-img"
                src={item.imgUrl}
                alt="新鲜蔬菜"
              />
              <p className="category-item-desc">{item.name}</p>
            </div>
          );
        })}
      </div>
    )
}

export default Category;
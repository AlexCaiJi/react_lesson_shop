type CartItemType = {
  productId: string;
  imgUrl: string;
  weight: string;
  title: string;
  price: number;
  count: number;
  selected?: boolean;
}

export type ListItemType = {
  shopId: string;
  shopName: string;
  selected?: boolean;
  cartList: Array<CartItemType>;
}

// 返回内容类型
export type ResponseType = {
  success: boolean;
  data: Array<ListItemType>
}


export type CartSubmitArray = Array<{
  productId: string;
  count: number;
}>
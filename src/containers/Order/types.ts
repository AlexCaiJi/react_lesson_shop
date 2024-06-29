type CartItemType = {
  productId: string;
  imgUrl: string;
  weight: string;
  title: string;
  price: number;
  count: number;
}

export type ListItemType = {
  shopId: string;
  shopName: string;
  cartList: Array<CartItemType>;
}

export type ResponseDataType = {
  address: {
    id: string;
    name: string;
    phone: string;
    address: string;
  }
  time: Array<string>;
  total: number;
  money: number;
  timeRange: Array<Array<{
    label: string; value: string;
  }>>
  shop: Array<ListItemType>
}

// 返回内容类型
export type ResponseType = {
  success: boolean;
  data:ResponseDataType;
}


export type AddressItemType = {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export type PaymentResponseType = {
  success: boolean;
  data: boolean;
};
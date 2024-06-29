
export type LocationType = {
      id: string;
      address: string;
}

export type BannersType = Array<{ id: string; imgUrl: string }>

export type CategoriesType = Array<{ id: string; imgUrl: string, name: string }>

export type CardListType = Array<{ id: string; imgUrl: string, name: string, price: string  }>

export type DockersType = Array<{ id: string; icon: string, name: string }>

export type ResponseType = {
  success: boolean;
  data: {
    location: LocationType;
    banners:BannersType;
    categories: CategoriesType;
    freshes: CardListType;
  };
};

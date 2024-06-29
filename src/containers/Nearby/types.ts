

export type ResponseType = {
  success: boolean;
  data: Array<{
    id: string;
    name:string;
    categories: string;
    phone: string;
    address: string;
    distance: string;
    lat: string;
    log: string;
  }>;
};

export type SavedAddressRequest = {
  phone: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  doorNo: string;
  landmark?: string;
  addressType: string;
  addressName?: string;
};

export type SavedAddress = {
  _id: string;
  userId: string;
  phone: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  doorNo?: string;
  landmark?: string;
  addressType: "Home" | "Work" | "Other";
  addressName: string | null;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

import { useSelector } from "react-redux";
import { CUSTOMER, SELLER } from "../Constant/auth";
import { RootState } from "../store/store";

export const useRoleBasedView = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { role } = user || { role: CUSTOMER };

  return {
    isCustomer: role === CUSTOMER,
    isSeller: role === SELLER,
  };
};

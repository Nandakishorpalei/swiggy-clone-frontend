import * as Yup from "yup";

export const addressFormSchema = Yup.object().shape({
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  doorNo: Yup.string().required("Door number is required"),
  landmark: Yup.string(),
  addressType: Yup.string().required(),
});

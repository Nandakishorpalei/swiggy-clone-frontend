import axios from "axios";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/setup";
import { phoneNumberSchema } from "../../FormValidations/PhoneNumberSchema";
import useAuth from "../../Hooks/useAuth";
import { useToast } from "../../Hooks/useToast";
import { useLazyGetUserByPhoneQuery, usersApi } from "../../store/api/user";
import { Button } from "../../UI-Components/Button/Button";
import { Input } from "../../UI-Components/Input/Input";
import { PhoneNumberInput } from "../../UI-Components/PhoneInput/PhoneInput";
import { MUITextField } from "../../UI-Components/Input/MuiTextField";
import { LoadingIcon } from "../../Icons/LoadingIcon";
import { OrangeButton } from "../../UI-Components/OrangeButton/OrangeButton";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export const AddCustomer = ({ onClose }: { onClose: () => void }) => {
  const [user, setUser] = useState<null | ConfirmationResult>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { alertToast, successToast } = useToast();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const [getUserByPhone] = useLazyGetUserByPhoneQuery();
  const [showAllFields, setShowAllFields] = useState(false);

  const sendOtp = async (values: FormikValues) => {
    try {
      setLoading(true);
      const phoneNumber = "+91" + values.phone;
      const { user } = await getUserByPhone({ phone: phoneNumber }).unwrap();

      if (!user && !values.name && !values.email) {
        setShowAllFields(true);
        setLoading(false);
        return;
      }
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );

      setUser(confirmation);
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
    setLoading(false);
  };

  const verifyOTP = async (values: FormikValues) => {
    try {
      setLoading(true);
      const result = user?.confirm(values.otp);
      setShowAllFields(false);
      const phoneNumber = "+" + "91" + values.phone;
      const payload = {
        name: values.name,
        phone: phoneNumber,
        email: values.email,
      };

      const { data } = await axios.post(
        process.env.NODE_APP_BASE_URL + "/signin",
        payload
      );
      login({ newAuthToken: data.token, newUser: data.user });
      successToast({ message: "Login successfully!" });
      onClose();
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        otp: "",
        email: "",
      }}
      onSubmit={user ? verifyOTP : sendOtp}
      validationSchema={() => phoneNumberSchema(user)}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ submitForm, values }) => (
        <Form className="m-0 space-y-4 mt-16">
          <MUITextField required name="phone" label="Phone" fullWidth />
          {showAllFields && (
            <MUITextField required name="name" label="Name" fullWidth />
          )}
          {showAllFields && (
            <MUITextField required name="email" label="Email" fullWidth />
          )}
          {Boolean(user) && (
            <MUITextField
              required
              name="otp"
              label="One time password"
              fullWidth
            />
          )}
          <div
            id="recaptcha"
            style={{ zIndex: 1001, position: "relative" }}
          ></div>
          <OrangeButton isLoading={isLoading} type="submit">
            {user ? "VERIFY OTP" : "SEND OTP"}
          </OrangeButton>
          <div className="text-text-60 text-body-sm font-normal">
            By clicking on Login, I accept the Terms & Conditions & Privacy
            Policy
          </div>
        </Form>
      )}
    </Formik>
  );
};

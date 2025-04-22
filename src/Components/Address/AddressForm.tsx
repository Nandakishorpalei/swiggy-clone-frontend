import { GoogleMap } from "@react-google-maps/api";
import { Form, Formik, FormikValues } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { addressFormSchema } from "../../FormValidations/addressSchema";
import { useToast } from "../../Hooks/useToast";
import { RootState } from "../../store/store";
import { MUITextField } from "../../UI-Components/Input/MuiTextField";
import { OrangeButton } from "../../UI-Components/OrangeButton/OrangeButton";
import { AddressTypeSelector } from "./AddressTypeSelector";
import {
  ADDRESS_TYPE_HOME,
  ADDRESS_TYPE_OTHER,
  ADDRESS_TYPE_WORK,
} from "../../Constant/address";
import { useAddAddressMutation } from "../../store/api/address";
import { SavedAddressRequest } from "../../store/model/SavedAddress";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 12.9352,
  lng: 77.614,
};

const reverseGeocode = async ({ lat, lng }: { lat: number; lng: number }) => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        resolve(results[0].formatted_address);
      } else {
        reject("Address not found");
      }
    });
  });
};

export const AddressForm = ({ close }: { close: () => void }) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const { alertToast, successToast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);
  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "denied") {
            alertToast({
              message:
                "Location access is blocked. Please enable it in your browser settings.",
            });
            setMapCenter(defaultCenter);
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setMapCenter({ lat: latitude, lng: longitude });
              },
              (error) => {
                alert(
                  "Unable to access location. Please allow location access in your browser."
                );
                setMapCenter(defaultCenter);
              }
            );
          }
        });
    } else {
      alertToast({ message: "Geolocation is not supported" });
      setMapCenter(defaultCenter);
    }
  }, []);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMapIdle = async (setFieldValue: Function) => {
    const map = mapRef.current;
    if (map) {
      const center = map.getCenter();
      const coords = {
        lat: center?.lat() || 0,
        lng: center?.lng() || 0,
      };
      setFieldValue("coordinates", coords);

      try {
        const formattedAddress = await reverseGeocode(coords);
        setFieldValue("address", formattedAddress);
      } catch (error: any) {
        alertToast({ message: error.message || "Something went wrong!" });
      }
    }
  };

  const handleSubmit = async (values: SavedAddressRequest) => {
    try {
      await addAddress({
        payload: {
          ...values,
          addressName:
            values.addressType === ADDRESS_TYPE_OTHER ? values.addressName : "",
        },
      }).unwrap();
      successToast({ message: "Address added successfully!" });
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    } finally {
      close();
    }
  };

  return (
    <Formik
      initialValues={{
        phone: user?.phone || "",
        address: "",
        coordinates: defaultCenter,
        doorNo: "",
        landmark: "",
        addressType: ADDRESS_TYPE_OTHER,
        addressName: "",
      }}
      validationSchema={addressFormSchema}
      onSubmit={async (values, formikHelpers) => {
        const errors = await formikHelpers.validateForm();
        if (Object.keys(errors).length > 0) {
          formikHelpers.setTouched(
            Object.keys(errors).reduce(
              (acc, key) => ({ ...acc, [key]: true }),
              {}
            )
          );
          return;
        }

        handleSubmit(values);
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      enableReinitialize
    >
      {({ setFieldValue, values, isSubmitting }) => (
        <Form style={{ padding: "1rem" }}>
          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={17}
              onLoad={handleMapLoad}
              onIdle={() => handleMapIdle(setFieldValue)}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -100%)",
                fontSize: "2rem",
              }}
            >
              📍
            </div>
          </div>

          <MUITextField name="address" label="Address" fullWidth disabled />
          <br />
          <br />
          <MUITextField
            name="doorNo"
            label="Door / Flat No."
            fullWidth
            required
          />
          <MUITextField name="landmark" label="Landmark" fullWidth required />
          <MUITextField name="phone" label="Phone" fullWidth required />
          <br />
          <br />
          <AddressTypeSelector name="addressType" />
          {values.addressType === ADDRESS_TYPE_OTHER && (
            <MUITextField
              name="addressName"
              label="Address Name"
              fullWidth
              required
            />
          )}
          <br />
          <OrangeButton isLoading={isSubmitting || isAdding} type="submit">
            SAVE ADDRESS & PROCEED
          </OrangeButton>
        </Form>
      )}
    </Formik>
  );
};

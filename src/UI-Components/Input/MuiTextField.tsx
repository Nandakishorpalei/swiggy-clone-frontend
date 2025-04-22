import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

export interface InputProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label?: string;
}

const textFieldStyles = {
  "& .MuiFilledInput-root": {
    border: "1px solid #e7e6eb",
    backgroundColor: "white",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "white",
      borderColor: "#e7e6eb",
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      borderColor: "#e7e6eb",
      boxShadow: "none",
    },
  },
  "& .MuiFilledInput-input": {
    backgroundColor: "transparent",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "inherit",
  },
  "& .MuiFilledInput-root::before, & .MuiFilledInput-root::after": {
    borderBottom: "none !important",
  },
};

export const MUITextField = ({ label, ...props }: InputProps) => {
  const [field, meta] = useField(props.name as string);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      error={hasError}
      // helperText={hasError ? meta.error : ""}
      fullWidth
      variant="filled"
      size="medium"
      sx={textFieldStyles}
    />
  );
};

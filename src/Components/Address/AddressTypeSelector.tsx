import { useField } from "formik";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import classNames from "classnames";
import {
  ADDRESS_TYPE_HOME,
  ADDRESS_TYPE_OTHER,
  ADDRESS_TYPE_WORK,
} from "../../Constant/address";
import { capitalizeWords } from "../../utils/capitalize";

export const addressTypes = [
  {
    icon: <HomeOutlinedIcon />,
    label: capitalizeWords(ADDRESS_TYPE_HOME),
    value: ADDRESS_TYPE_HOME,
  },
  {
    icon: <WorkOutlineOutlinedIcon />,
    label: capitalizeWords(ADDRESS_TYPE_WORK),
    value: ADDRESS_TYPE_WORK,
  },
  {
    icon: <FmdGoodOutlinedIcon />,
    label: capitalizeWords(ADDRESS_TYPE_OTHER),
    value: ADDRESS_TYPE_OTHER,
  },
];

export const AddressTypeSelector = ({ name }: { name: string }) => {
  const [field, , helpers] = useField(name);

  return (
    <div className="flex border border-solid border-neutral-10 justify-between">
      {addressTypes.map(({ label, value, icon }) => (
        <button
          key={label}
          type="button"
          onClick={() => helpers.setValue(value)}
          className={classNames(
            "all:unset border text-body border-solid border-l-0 align-middle text-center border-t-0 border-b-0 border-r-neutral-10 flex-1 h-12 flex items-center justify-center gap-2 hover:bg-text-black hover:text-white",
            {
              "bg-text-black text-white": field.value === value,
            }
          )}
        >
          <div className="flex items-center gap-2">
            {icon}
            {label}
          </div>
        </button>
      ))}
    </div>
  );
};

import { useSelector } from "react-redux";
import { HelpDetails } from "../Help/HelpDetails";
import { PastOrders } from "../Help/PastOrders";
import { ReactNode, useState } from "react";
import { RootState } from "../../store/store";
import { ProfileTypeEnum, ProfileTypeEnumMap } from "../../store/model/Profile";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";
import classNames from "classnames";
import { HelpTypeEnum } from "../../store/model/Help";
import { ManageAddress } from "./ManageAddress/ManageAddress";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const iconMaps: Record<ProfileTypeEnum, ReactNode> = {
  [ProfileTypeEnum.PAST_ORDERS]: <LocalMallIcon fontSize="small" />,
  [ProfileTypeEnum.SWIGGY_ONE_FAQ]: <QuestionAnswerIcon fontSize="small" />,
  [ProfileTypeEnum.ADDRESSES]: <LocationOnIcon fontSize="small" />,
};

export const Profile = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [selectedType, setSelectedType] = useState<ProfileTypeEnum | null>(
    ProfileTypeEnum.PAST_ORDERS
  );

  return (
    <div className="w-full h-screen bg-blue-80">
      <RestaurantNavbar title={`Help`} />

      <div className="pt-6 px-[10%] mt-6 h-[calc(100vh-120px)]">
        <div className="bg-surface p-6 mt-6 flex gap-8 h-[calc(100%-96px)]">
          <div className="flex flex-col bg-[#edf1f6] py-5 pl-5 min-w-[240px] max-w-[240px] h-full overflow-auto">
            {Object.values(ProfileTypeEnumMap).map((item) => (
              <div
                className={classNames(
                  "p-4 cursor-pointer flex gap-2 items-center text-body-lg text-text-100 hover:font-bold transition-all duration-200",
                  {
                    "bg-surface font-bold": item.id === selectedType,
                  }
                )}
                onClick={() => setSelectedType(item.id)}
                key={item.id}
              >
                <div className="h-8 w-8 bg-text-black text-white rounded-full flex justify-center items-center">
                  {iconMaps[item.id]}
                </div>
                <div>{item.title}</div>
              </div>
            ))}
          </div>
          {selectedType && (
            <div className="h-full overflow-auto flex-1">
              {selectedType === ProfileTypeEnum.PAST_ORDERS && (
                <PastOrders
                  sectionDescription={ProfileTypeEnumMap[selectedType].title}
                />
              )}
              {selectedType === ProfileTypeEnum.SWIGGY_ONE_FAQ && (
                <HelpDetails
                  type={HelpTypeEnum.SWIGGY_ONE_FAQ}
                  sectionDescription={ProfileTypeEnumMap[selectedType].title}
                />
              )}
              {selectedType === ProfileTypeEnum.ADDRESSES && <ManageAddress />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

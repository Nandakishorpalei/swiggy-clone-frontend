import { useEffect, useState } from "react";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";
import { useGetHelpTypesQuery } from "../../store/api/Help";
import { HelpType } from "../../store/model/Help";
import { RestaurantNavbar } from "../RestaurantNavbar/RestaurantNavbar";

import { HelpTypeEnum } from "../../store/model/Help";
import { HelpDetails } from "./HelpDetails";
import { PastOrders } from "./PastOrders";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  RestaurantShimmerLoader,
  HelpSectionShimmer,
} from "../../UI-Components/Shimmer/Shimmer";

export const Help = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [selectedType, setSelectedType] = useState<HelpType | null>();
  const { data, isLoading, isError, isSuccess } = useGetHelpTypesQuery({
    isAuthenticated,
  });

  useEffect(() => {
    if (data?.data.helpTypes.length) {
      setSelectedType(data.data.helpTypes[0]);
    }
  }, [data?.data.helpTypes.length]);

  return (
    <div className="w-full h-screen bg-blue-80">
      <RestaurantNavbar title={`Help`} />
      <Async.Root
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        isEmpty={false}
        key="help"
        renderOnLoad={<HelpSectionShimmer />}
      >
        <Async.Empty>
          <div className="flex justify-center items-center flex-col">help</div>
        </Async.Empty>
        <Async.ErrorHandler>
          <ErrorScreen />
        </Async.ErrorHandler>
        <Async.Success>
          <div className="px-[10%] pt-6 mt-6 h-[calc(100vh-120px)]">
            <div className="text-surface text-h3 font-extrabold">
              Help & Support
            </div>
            <div className="text-surface text-subtitle -mt-2">
              Let's take a step ahead and help you better.
            </div>
            <div className="bg-surface p-6 mt-6 flex gap-8 h-[calc(100%-96px)]">
              <div className="flex flex-col bg-[#edf1f6] py-5 pl-5 min-w-[400px] max-w-[400px] h-full overflow-auto">
                {data?.data.helpTypes.map((helpType) => (
                  <div
                    className={classNames(
                      "p-4 cursor-pointer text-body-lg text-text-100 hover:font-bold transition-all duration-200",
                      {
                        "bg-surface font-bold":
                          helpType._id === selectedType?._id,
                      }
                    )}
                    onClick={() => setSelectedType(helpType)}
                    key={helpType._id}
                  >
                    {helpType.title}
                  </div>
                ))}
              </div>
              {selectedType && (
                <div className="h-full overflow-auto flex-1">
                  {selectedType?.type === HelpTypeEnum.PAST_ORDERS ? (
                    <PastOrders sectionDescription={selectedType.title} />
                  ) : (
                    <HelpDetails
                      type={selectedType.type}
                      sectionDescription={selectedType.title}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </Async.Success>
      </Async.Root>
    </div>
  );
};

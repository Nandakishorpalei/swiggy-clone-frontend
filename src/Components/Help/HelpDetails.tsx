import { CaretDown } from "../../Icons/CaretDown";
import { useGetHelpTypeDataQuery } from "../../store/api/Help";
import { HelpTypeEnum } from "../../store/model/Help";
import { Accordion } from "../../UI-Components/Accordion/Accordion";
import Async from "../../UI-Components/Async/Async";
import ErrorScreen from "../../UI-Components/ErrorScreen/ErrorScreen";

export const HelpDetails = ({
  type,
  sectionDescription,
}: {
  type: HelpTypeEnum;
  sectionDescription: string;
}) => {
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetHelpTypeDataQuery(
      { type },
      { skip: !type, refetchOnMountOrArgChange: true }
    );

  return (
    <Async.Root
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      isEmpty={false}
      key="helpDetails"
    >
      <Async.Empty>
        <></>
      </Async.Empty>
      <Async.ErrorHandler>
        <ErrorScreen />
      </Async.ErrorHandler>
      <Async.Success>
        <div className="p-6">
          <div className="text-h4 font-semibold">{sectionDescription}</div>
          <Accordion.Root
            type="single"
            defaultValue=""
            className="space-y-4 mt-6"
            collapsible
          >
            {data?.data.helpArticles.map((item) => (
              <Accordion.Item key={item._id} value={item._id}>
                <Accordion.Trigger className="all:unset flex justify-between group w-full">
                  <span className="flex gap-2 text-body-lg text-text-60 hover:text-dark_orange">
                    {item.title}
                  </span>
                  <span className="group-data-state-open:rotate-0 group-data-state-closed:-rotate-90 text-neutral transform transition duration-1000 ease-in-out">
                    <CaretDown size="20" />
                  </span>
                </Accordion.Trigger>
                <Accordion.Content className="text-body text-text-60 !p-0 mt-2 mr-10">
                  {item.description}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </Async.Success>
    </Async.Root>
  );
};

import * as AccordionPrimitives from "@radix-ui/react-accordion";
import classNames from "classnames";
import React, { ReactNode, HTMLAttributes } from "react";

export const InfoItem = ({
  label,
  children,
  dir = "col",
  ...rest
}: {
  label: string | ReactNode;
  children: ReactNode;
  dir?: "col" | "row";
} & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={classNames("flex", {
        "flex-col gap-1": dir === "col",
        [rest.className || ""]: rest.className,
      })}
    >
      <span className="!pb-0 font-sans text-body-sm text-text-30">{label}</span>
      <div className="text-subtext break-words">{children}</div>
    </div>
  );
};

export const ItemGrid = ({ children }: { children: ReactNode }) => (
  <span className="grid gap-6 grid-cols-2">{children}</span>
);

export const Trigger = ({
  children,
  ...props
}: {
  children: ReactNode;
} & AccordionPrimitives.AccordionTriggerProps &
  React.RefAttributes<HTMLButtonElement>) => {
  return (
    <AccordionPrimitives.Trigger asChild {...props}>
      <button className="all:unset group select-none text-subtext after:content-[''] after:block after:absolute after:bottom-0 after:w-[calc(100%-32px)] after:mx-4 after:right-0 w-full relative capitalize text-left">
        {children}
      </button>
    </AccordionPrimitives.Trigger>
  );
};

export const Item = ({
  isActive,
  ...props
}: AccordionPrimitives.AccordionItemProps &
  React.RefAttributes<HTMLDivElement> & {
    isActive?: boolean;
  }) => {
  return (
    <AccordionPrimitives.Item
      {...props} // Spread only recognized props
      className={classNames(
        "border border-solid border-l-0 border-t-0 border-r-0 pb-4",
        {
          "animate-active": isActive,
          "border-neutral-10": !isActive,
        }
      )}
    />
  );
};

export const Content = (
  props: AccordionPrimitives.AccordionContentProps &
    React.RefAttributes<HTMLDivElement>
) => {
  return (
    <AccordionPrimitives.Content
      {...props}
      className={classNames("p-4", props.className || "")}
    />
  );
};

export const Accordion = {
  ...AccordionPrimitives,
  Item,
  Trigger,
  Content,
  ItemGrid,
  InfoItem,
};

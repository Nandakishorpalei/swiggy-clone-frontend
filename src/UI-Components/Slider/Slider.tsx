import classNames from "classnames";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { HTMLAttributes, ReactNode, useEffect } from "react";
import { Button } from "../Button/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { CloseIcon } from "../../Icons/CloseIcon";

type ContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  width?: string | number;
  open?: boolean;
  withOverlay?: boolean;
  useCustomOverlay?: boolean;
};

type SliderProps = {
  open: boolean;
  position?: "right" | "left" | "top" | "bottom" | "";
  className?: string;
  children: ReactNode;
  overlay?: boolean;
  width?: number;
  type?: "fixed";
  withOverlay?: boolean;
  onClose?: () => void;
} & HTMLMotionProps<"div">;

const SLIDER_TYPE_CLASSES = {
  LEFT: "left-0 top-0 h-screen",
  RIGHT: "right-0 top-0 h-screen",
  TOP: "top-0 w-full left-0",
  BOTTOM: "bottom-0 w-full left-0",
};

const Header = ({
  children,
  bottom,
  ...props
}: HTMLAttributes<HTMLDivElement> & { bottom?: ReactNode }) => {
  return (
    <div className="pl-5 pr-4 border-0 border-b border-solid border-b-neutral-0">
      <div
        {...props}
        className={classNames(
          "flex flex-shrink-0 items-center justify-between my-3",
          props.className || ""
        )}
      >
        {children}
      </div>
      {bottom}
    </div>
  );
};

const Title = (
  props: Dialog.DialogTitleProps &
    React.RefAttributes<HTMLHeadingElement> & { titleIcon?: JSX.Element }
) => {
  return (
    <Dialog.Title
      {...props}
      asChild
      className={classNames("mb-0 text-subtitle", props.className || "")}
    >
      <span className="flex justify-between">
        {props?.children}
        {props?.titleIcon}
      </span>
    </Dialog.Title>
  );
};

const Close = (props: Dialog.DialogCloseProps) => (
  <Dialog.Close {...props} asChild>
    <span>
      <Button customType="ghost_icon" size="small" title="Close Modal">
        <CloseIcon />
      </Button>
    </span>
  </Dialog.Close>
);

const Body = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames("overflow-auto p-5", props.className || "")}
    />
  );
};

const Footer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames(
        "flex-shrink-0 px-5 py-4 bottom-0 bg-white border-solid border-t border-0 border-neutral-0 absolute right-0 left-0 w-full",
        props.className || ""
      )}
    />
  );
};

const CustomOverlay = (
  props: Dialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>
) => {
  useEffect(() => {
    document.body.classList.add("pointer-events-none");

    return () => {
      document.body.classList.remove("pointer-events-none");
    };
  }, []);

  return (
    <div
      className={classNames(
        "fixed inset-0 z-slider bg-text-100 opacity-20",
        props.className || ""
      )}
      {...props}
    />
  );
};

export const Content = ({
  withOverlay = true,
  open,
  className,
  children,
  useCustomOverlay,
  width = 480,
  ...props
}: ContentProps) => {
  const OverlayComponent = useCustomOverlay ? CustomOverlay : Dialog.Overlay;

  return (
    //@ts-ignore
    <AnimatePresence>
      <Dialog.Portal>
        {withOverlay && (
          <OverlayComponent asChild>
            <motion.div
              key="overlay"
              initial={{ opacity: 0, right: -width }}
              animate={{ opacity: 0.2, right: 0 }}
              exit={{ opacity: 0, right: -width }}
              className={classNames(
                "fixed top-0 left-0 bg-text-100 opacity-20 w-full h-full z-[10] data-state-close:!w-0 data-state-close:!h-0 data-state-close:!invisible"
              )}
            />
          </OverlayComponent>
        )}

        <Dialog.Content asChild>
          <motion.div
            key="modal"
            initial={{ right: -width }}
            animate={{ right: 0 }}
            exit={{ right: -width }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={classNames(
              "bg-surface px-8 py-6",
              SLIDER_TYPE_CLASSES.RIGHT,
              "border border-solid border-neutral-10 fixed bg-surface w-[480px] h-full z-[10] top-0 right-0 overflow-auto !p-0"
            )}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </AnimatePresence>
  );
};

/**
 * @deprecated This component is deprecated and will be removed in future releases. Use import * as Slider and Slider.Root instead.
 */
export const Slider = ({
  withOverlay,
  type,
  open,
  position = "right",
  className,
  children,
  overlay = false,
  width = 480,
  onClose,
  ...props
}: SliderProps) => {
  return (
    //@ts-ignore
    <AnimatePresence>
      <>
        {withOverlay && open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0, right: -width }}
            animate={{ opacity: 0.2, right: 0 }}
            exit={{ opacity: 0, right: -width }}
            className={classNames({
              "fixed top-0 left-0 bg-text-100 opacity-20 w-full h-full z-[10]":
                open,
            })}
            onClick={onClose}
          />
        )}

        {open && (
          <motion.div
            {...props}
            key="modal"
            initial={{ right: -width }}
            animate={{ right: 0 }}
            exit={{ right: -width }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={classNames("bg-surface px-8 py-6", className || "", {
              [SLIDER_TYPE_CLASSES.LEFT]: position === "left",
              [SLIDER_TYPE_CLASSES.RIGHT]: position === "right",
              [SLIDER_TYPE_CLASSES.TOP]: position === "top",
              [SLIDER_TYPE_CLASSES.BOTTOM]: position === "bottom",
              "border border-solid border-neutral-10 fixed bg-surface w-[480px] h-full z-[10] top-0 right-0 overflow-auto !p-0":
                type === "fixed",
              "absolute z-[10]": overlay,
            })}
          >
            {children}
          </motion.div>
        )}
      </>
    </AnimatePresence>
  );
};

const SliderComp = {
  Root: Dialog.Root,
  Trigger: Dialog.Trigger,
  Description: Dialog.Description,
  Content: Content,
  Header,
  Title,
  Close,
  Body,
  Footer,
};

export default SliderComp;

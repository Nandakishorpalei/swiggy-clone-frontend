import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../../Hooks/useToast";
import { Button } from "../../UI-Components/Button/Button";
import { useClearCartMutation } from "../../store/api/cart";

export const DifferentRestaurantPopup = ({
  show,
  addNewItem,
  close,
}: {
  show: boolean;
  addNewItem: () => void;
  close: () => void;
}) => {
  const [clearCart] = useClearCartMutation();
  const { alertToast } = useToast();

  const handleClearCart = async () => {
    try {
      close();
      await clearCart().unwrap();
      addNewItem();
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
  };

  return (
    //@ts-ignore
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-end justify-center"
          initial={{ opacity: 0, zIndex: 51 }}
          animate={{ opacity: 1, zIndex: 51 }}
          exit={{ opacity: 0, zIndex: -1 }}
          onClick={close}
        >
          <motion.div
            initial={{ y: 240 }}
            animate={{ y: 0 }}
            exit={{ y: 240 }}
            transition={{ type: "spring", stiffness: 300, damping: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="w-11/12 md:w-1/3 mb-8 shadow-box-shadow-2 z-[51] bg-surface rounded-lg"
          >
            <div className="p-7 space-y-5">
              <div className="space-y-2">
                <div className="text-h5 text-text-100">
                  Items already in cart
                </div>
                <div className="text-body text-text-60">
                  Your cart contains items from another restaurant. Would you
                  like to reset your cart for adding items from this restaurant?
                </div>
              </div>
              <div className="flex gap-5">
                <Button
                  customType="primary-outlined"
                  customColor="border-[#1ba672] text-[#1ba672]"
                  block
                  onClick={close}
                >
                  NO
                </Button>
                <Button
                  customType="special-primary"
                  customColor="bg-[#1ba672] text-white"
                  block
                  onClick={handleClearCart}
                >
                  YES
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { pluralize } from "../../utils/pluralize";

export const CartNotification = ({
  show,
  itemCount,
  isSameRestaurant,
}: {
  show: boolean;
  itemCount: number;
  isSameRestaurant: boolean;
}) => {
  const navigate = useNavigate();

  return (
    //@ts-ignore
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          onClick={() => navigate("/checkout")}
          transition={{ type: "spring", stiffness: 300, damping: 50 }}
          className="fixed bottom-0 left-1/4 -translate-x-1/2 w-1/2 text-white shadow-lg z-50 cursor-pointer"
        >
          <div>
            {isSameRestaurant && <div className="w-full h-3 bg-red-100" />}
            <div className="bg-[#1ba672] w-full flex justify-between items-center px-4 py-3 ">
              <span className="text-subtext">
                {pluralize(itemCount, "item", "items")} added
              </span>
              <div className="flex gap-1 items-center">
                <div className="text-subtitle font-medium">VIEW CART</div>
                <ShoppingBagOutlinedIcon className="text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

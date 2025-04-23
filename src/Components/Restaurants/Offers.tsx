import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetAllRestaurantsQuery } from "../../store/api/restaurant";
import Carousel from "../../UI-Components/Carousel/Carousel";

const Offers = () => {
  const { data } = useGetAllRestaurantsQuery();
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto">
      <Carousel
        title={<h2 className="font-bold text-h5">What's on your mind?</h2>}
      >
        <motion.div className="flex gap-10">
          {data?.data.offers.map((offer) => (
            <motion.div
              key={offer.id}
              className="w-[144px] h-[180px] flex-shrink-0 rounded-lg"
            >
              <img
                src={offer.imageId}
                alt="image"
                className="w-full h-full object-cover rounded-lg"
                role="button"
                onClick={() => navigate(`/food/${offer.action.text}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </Carousel>
    </div>
  );
};

export default Offers;

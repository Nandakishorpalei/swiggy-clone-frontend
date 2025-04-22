import { motion } from "framer-motion";
import Carousel from "../../UI-Components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";

const list1 = [
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Biryani.png",
    name: "Biryani",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Cake.png",
    name: "Cake",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Coffee.png",
    name: "Coffee",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dosa.png",
    name: "Dosa",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Idli.png",
    name: "Idli",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Poha.png",
    name: "Poha",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Omelette.png",
    name: "Omelette",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pancake.png",
    name: "Pancake",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Paratha.png",
    name: "Paratha",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Chole%20Bhature.png",
    name: "Chole Bhature",
  },
];

const list2 = [
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Samosa.png",
    name: "Samosa",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pav%20Bhaji.png",
    name: "Pav Bhaji",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Juice.png",
    name: "Juice",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pure%20Veg.png",
    name: "Pure Veg",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Salad.png",
    name: "Salad",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Shake.png",
    name: "Shake",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Khichdi.png",
    name: "Khichdi",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Lassi.png",
    name: "Lassi",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Parotta.png",
    name: "Parotta",
  },
  {
    url: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Poori.png",
    name: "Poori",
  },
];

export const FoodsCarousel = () => {
  const navigate = useNavigate();

  return (
    <Carousel>
      <div>
        <motion.div className="flex gap-10">
          {list1.map((image) => (
            <motion.div
              key={image.name}
              onClick={() => navigate("/food/" + image.name)}
              className="w-[144px] h-[180px] flex-shrink-0 rounded-lg"
            >
              <img
                src={image.url}
                alt="image"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="flex gap-10">
          {list2.map((image) => (
            <motion.div
              key={image.name}
              onClick={() => navigate("/food/" + image.name)}
              className="w-[144px] h-[180px] flex-shrink-0 rounded-lg"
            >
              <img
                src={image.url}
                alt="image"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Carousel>
  );
};

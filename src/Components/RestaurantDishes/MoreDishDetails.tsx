import React from "react";
import { Dish } from "../../store/model/Dish";

import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { CloseIcon } from "../../Icons/CloseIcon";
import { VegIcon } from "./VegIcon";
import { NonVegIcon } from "./NonVegIcon";
import { PriceTag } from "../../Icons/PriceTag";
import { GreenStar } from "../../Icons/GreenStar";
import { Button } from "../../UI-Components/Button/Button";

const commonURL = process.env.REACT_APP_RESTAURANTS_IMAGE_URL;

export const MoreDishDetails = ({
  dish,
  show,
  onClose,
}: {
  dish: Dish;
  show: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={show}
      onClose={onClose}
      maxWidth="xs"
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle className="flex justify-end items-center">
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="my-4">
        <img
          src={`${commonURL}${dish.info.imageId}`}
          alt={dish.info.name}
          className="w-full object-cover rounded-xl"
        />
        <div className="mt-6">
          {dish.info.itemAttribute?.vegClassifier === "VEG" ? (
            <VegIcon />
          ) : (
            <NonVegIcon />
          )}
          <div className="flex justify-between gap-8">
            <div>
              <div className="text-text-60 text-[18px] font-semibold">
                {dish.info.name}
              </div>
              <div className="flex gap-1 items-center">
                {dish.info.price && (
                  <div className="text-neutral-30 line-through">
                    ₹{(dish.info.price / 100).toFixed(2)}
                  </div>
                )}
                {dish.info.finalPrice && (
                  <div className="text-body-lg font-semibold">
                    ₹{(dish.info.finalPrice / 100).toFixed(2)}
                  </div>
                )}
                <PriceTag />
              </div>
              {dish.info.ratings.aggregatedRating.rating &&
                dish.info.ratings.aggregatedRating.ratingCountV2 && (
                  <div className="flex items-center gap-1">
                    <GreenStar />
                    <div className="text-body text-green-70 font-medium">
                      {dish.info.ratings.aggregatedRating.rating}
                      <span className="text-text-100 ml-0.5">
                        ({dish.info.ratings.aggregatedRating.ratingCountV2})
                      </span>
                    </div>
                  </div>
                )}
            </div>
            <div className="w-28">
              <Button block>
                <span className="text-green-70 font-bold">ADD</span>
              </Button>
            </div>
          </div>
          <div className="mt-2 text-text-30 text-body-lg font-light">
            {dish.info.description}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

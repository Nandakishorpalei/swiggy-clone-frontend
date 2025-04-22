import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Addon } from "../../store/model/Dish";
import { AddonPayload } from "../../store/model/Cart";
import { Button } from "../../UI-Components/Button/Button";

type AddonsProps = {
  show: boolean;
  onClose: () => void;
  addon: Addon[];
  onConfirm: (value: AddonPayload[]) => void;
};

export const Addons = ({ show, onClose, addon, onConfirm }: AddonsProps) => {
  const [selectedAddons, setSelectedAddons] = useState<AddonPayload[]>([]);

  const handleSelect = (
    groupId: string,
    choiceId: string,
    choiceName: string
  ) => {
    setSelectedAddons((prev) => {
      const updatedAddons = prev.filter((item) => item.groupId !== groupId);
      return [...updatedAddons, { groupId, id: choiceId, name: choiceName }];
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedAddons);
    onClose();
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      onClick={(e) => e.stopPropagation()}
    >
      <DialogTitle className="border-b border-neutral-10 text-h4 flex justify-between items-center bg-surface-grey">
        Customise as per your taste
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="bg-surface-grey">
        <div className=" text-text-60 text-subtitle space-y-6 my-4">
          {addon.map((group) => (
            <div key={group.groupId}>
              <h3 className="font-bold text-text-60 mb-3">{group.groupName}</h3>
              <div className="bg-white p-4 rounded-2xl space-y-1">
                {group.choices.map((choice) => (
                  <label
                    key={choice.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-body-lg text-text-30">
                      {choice.name}
                    </span>
                    <input
                      type="radio"
                      name={group.groupId}
                      checked={selectedAddons.some(
                        (item) =>
                          item.groupId === group.groupId &&
                          item.id === choice.id
                      )}
                      onChange={() =>
                        handleSelect(group.groupId, choice.id, choice.name)
                      }
                      className="accent-dark_orange scale-125"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>

      <DialogActions className="border border-l-0 border-r-0 border-b-0 border-neutral-10 py-3 px-6">
        <div className="w-1/2">
          <Button
            onClick={handleConfirm}
            size="large"
            customType="special-primary"
            block
            customColor="bg-[#1ba672] text-white rounded"
          >
            Add Item to cart
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

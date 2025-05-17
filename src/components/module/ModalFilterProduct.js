"use client";

import { Checkbox, FormControlLabel, Popover } from "@mui/material";
import { orange } from "@mui/material/colors";

const ModalFilterProduct = ({
  handleCheckboxChange,
  handleClose,
  feature_sample_list, 
  anchorEl,
  openFeatureModal,
  setOpenFeatureModal
}) => {
  return (
    <>
      <Popover
        anchorEl={anchorEl}
        open={openFeatureModal}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: { width: "16rem" },
        }}
      >
        <div className="p-4">
          <h3 className="header px-4 border-r-4 border-khas ">title</h3>

          <div className="h-72">
            {" "}
            {feature_sample_list?.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      handleCheckboxChange(
                        "feature_sample",
                        item,
                        e.target.checked
                      )
                    }
                    sx={{
                      color: orange[800],
                      "&.Mui-checked": {
                        color: orange[700],
                      },
                    }}
                  />
                }
                label={item?.feature_sample_name}
              />
            ))}
          </div>

          <div className="footer w-full flex flex-row justify-between items-center">
            <button
              onClick={() => setOpenFeatureModal(false)}
              className="p-2 rounded-2xl bg-rose-200 hover:bg-rose-300"
            >
              {" "}
              بستن{" "}
            </button>
            <button className="p-2 rounded-2xl bg-khas text-white hover:bg-orange-500">
              {" "}
              اعمال{" "}
            </button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default ModalFilterProduct;

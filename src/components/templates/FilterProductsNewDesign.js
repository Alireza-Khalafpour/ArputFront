"use client";
import {
  Popover,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Dialog,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ModalFilterProduct from "../module/ModalFilterProduct";

const FilterProductsNewDesign = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const handleChildStateChange = (newState) => {
    setOpenModal(newState);
  };

  const url = process.env.NEXT_PUBLIC_URL;
  const [anchorEl, setAnchorEl] = useState(null);
  const [catgAndFeatures, setCatgAndFeatures] = useState([]);
  const [features, setFeatures] = useState([]);
  const [factories, setFactories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(true);
  const loading = open && catgAndFeatures?.length === 0;
  const [queryParams, setQueryParams] = useState(new URLSearchParams());
  const router = useRouter();
  const [openFactory, setOpenFactory] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openFeatureModal, setOpenFeatureModal] = useState(false);
  const [feature_sample_list, set_feature_sample_list] = useState([]);

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await axios
        .get(`${url}/filter/`, {
          headers: {
            accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data?.data);
          setFactories(response.data?.data?.factory?.factory);
          setLocations(response.data?.data?.location?.location);
          if (active) {
            setCatgAndFeatures(response.data?.data?.category?.category);
          }
        })
        .catch((error) => {
          console.log(error, "Error");
        });
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setCatgAndFeatures([]);
    }
  }, [open]);

  const handleCheckboxChange = (paramName, item, isChecked) => {
    if (isChecked) {
      if (paramName === "city") {
        queryParams.append(paramName, item?.province_id);
      } else if (paramName === "feature_sample") {
        queryParams.append(paramName, item?.feature_sample_id);
      } else if (paramName === "factory") {
        queryParams.append(paramName, item?.factory_id);
      }
    } else {
      if (paramName === "city") {
        queryParams.delete(paramName, item?.province_id);
      } else if (paramName === "feature_sample") {
        queryParams.delete(paramName, item?.feature_sample_id);
      } else if (paramName === "factory") {
        queryParams.delete(paramName, item?.factory_id);
      }
    }
    setQueryParams(new URLSearchParams(queryParams));
  };

  const baseUrl = `${url}/filter/items`;
  const finalUrl = `${baseUrl}?${queryParams.toString()}`;

  const handleClickFactory = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenFactory(true);
  };

  const handleClickCity = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenCity(true);
  };


  const handleFeatureClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    console.log(item);
    set_feature_sample_list(item?.feature_sample_list)
    setOpenFeatureModal(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenFactory(false);
    setOpenCity(false);
    setOpenFeatureModal(false);
  };

  return (
    <div className="no-scrollbar w-full flex flex-row gap-4 overflow-x-scroll">
      <div>
        <Select
          placeholder="انتخاب دسته بندی"
          size="small"
          onChange={(i, val) => setFeatures(val?.props.value?.feature_list)}
          className="bg-white min-w-32 text-black"
          
        >
          {catgAndFeatures.map((val, i) => (
            <MenuItem key={i} value={val}>
              {val?.category_name}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div
        onClick={handleClickFactory}
        className="bg-white min-w-fit py-2 px-3 text-paszamine3 text-lg font-semibold hover:text-khas hover:bg-white rounded-3xl cursor-pointer"
      >
        کارخانه ها
      </div>

      <div
        onClick={handleClickCity}
        className="bg-white min-w-fit py-2 px-3 text-paszamine3 text-lg font-semibold hover:text-khas hover:bg-white rounded-3xl cursor-pointer"
      >
        استان
      </div>

      {features?.length > 0 ? (
        <>
          {features?.map((i) => (
            <div
              onClick={(e) => handleFeatureClick(e, i)}
              className="bg-white min-w-fit py-2 px-3 text-paszamine3 text-lg font-semibold hover:text-khas hover:scale-105 hover:bg-white rounded-3xl cursor-pointer"
            >
              {i?.feature_name}
            </div>
          ))}
        </>
      ) : null}

      <ModalFilterProduct
        handleClose={handleClose}
        handleCheckboxChange={handleCheckboxChange}
        feature_sample_list={feature_sample_list}
        anchorEl={anchorEl}
        openFeatureModal={openFeatureModal}
        setOpenFeatureModal={setOpenFeatureModal}
      />

      <Popover
        anchorEl={anchorEl}
        open={openFactory}
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
            {factories?.map((item) => (
              <FormControlLabel
                key={item?.factory_id}
                control={
                  <Checkbox
                    onChange={(e) =>
                      handleCheckboxChange("factory", item, e.target.checked)
                    }
                    sx={{
                      color: "#f57c00",
                      "&.Mui-checked": {
                        color: "#f57c00",
                      },
                    }}
                  />
                }
                label={item?.factory_name}
              />
            ))}
          </div>

          <div className="footer w-full flex flex-row justify-between items-center">
            <button
              onClick={() => setOpenFactory(false)}
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
      <Popover
        anchorEl={anchorEl}
        open={openCity}
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
            {locations?.map((item) => (
              <FormControlLabel
                key={item?.province_id}
                control={
                  <Checkbox
                    onChange={(e) =>
                      handleCheckboxChange("city", item, e.target.checked)
                    }
                    sx={{
                      color: "#f57c00",
                      "&.Mui-checked": {
                        color: "#f57c00",
                      },
                    }}
                  />
                }
                label={item?.province_name}
              />
            ))}
          </div>

          <div className="footer w-full flex flex-row justify-between items-center">
            <button
              onClick={() => setOpenCity(false)}
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
    </div>
  );
};

export default FilterProductsNewDesign;

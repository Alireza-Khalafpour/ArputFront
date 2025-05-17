"use client";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import MySlider from "./MySlider";
import { CloseRounded } from "@mui/icons-material";
import { Autocomplete, TextField } from "@mui/material";
import ProductSwiper from "./ProductSwiper";

const SearchPartHeader = () => {
  const [searchBy, setSearchBy] = useState("محصولات");
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  async function GetItems() {
    let res = null;

    if (searchBy == "محصولات") {
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/search/pre_product/text_search?text=${searchText}&page=0&limit=10`,
        {
          headers: {
            "accept": "application/json",
          },
        }
      );
      setItems(res?.data?.data);
    }

    if (searchBy == "کارخانه ها") {
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/search/factory/text_search?text=${searchText}&page=0&limit=10`,
        {
          headers: {
            "accept": "application/json",
          },
        }
      );
      setItems(res?.data?.data);
    }

    if (searchBy == "فروشگاه ها") {
      res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/search/shop/text_search?text=${searchText}&page=0&limit=10`,
        {
          headers: {
            "accept": "application/json",
          },
        }
      );
      setItems(res?.data?.data);
    }
  }

  return (
    <>
      <div className="flex flex-col md:justify-center justify-start items-center gap-2 md:w-[90%] w-full h-full ">
        <div
          className="w-full rounded-2xl bg-paszamine2 !text-asliDark flex justify-center items-center "
        >
          <IconButton
            sx={{ p: "10px", color: "black" }}
            aria-label="menu"
            onClick={() => setItems([])}
          >
            <CloseRounded />      
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            className="text-asliDark"
            placeholder={` جستجو در ${searchBy} `}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton
            className="bg-khas text-white hover:bg-orange-600"
            type="button"
            sx={{ p: "8px" }}
            aria-label="search"
            onClick={() => GetItems()}
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Select
            className="text-asliDark w-32 "
            label="جستجو در"
            size="small"
            variant="standard"
            defaultValue={"محصولات"}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <MenuItem selected value={"محصولات"}>
              محصولات
            </MenuItem>
            <MenuItem value={"کارخانه ها"}> کارخانه ها</MenuItem>
            <MenuItem value={"فروشگاه ها"}> فروشگاه ها</MenuItem>
          </Select>
        </div>
      </div>
        {items.length > 0 ? (
          <div className="w-full md:!absolute relative md:top-[85%] md:left-0 h-full ">
            <div className="w-full bg-blue-100 md:flex hidden justify-center  ">
              <IconButton
                sx={{ p: "10px", color: "black" }}
                aria-label="menu"
                className=" rounded-full p-4 bg-red-600 text-white hover:bg-red-500 "
                onClick={() => setItems([])}
              >
                <CloseRounded />
              </IconButton>
            </div>
            <div className="md:block hidden" >

            </div>
            <MySlider title="نتایج" data={items} />
            {/* <ProductSwiper title="نتایج" /> */}
          </div>
        ) : null}
    </>
  );
};

export default SearchPartHeader;

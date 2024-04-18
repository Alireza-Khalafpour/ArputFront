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

const SearchPartMainPage = () => {
  const [searchBy, setSearchBy] = useState("محصولات");
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  async function GetItems() {
    let res;

    if (searchBy == "محصولات") {
      res = await axios.get(
        `https://supperapp-backend.chbk.run/search/pre_product/text_search?text=${searchText}&page=0&limit=10`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      setItems(res?.data?.data);
    }

    if (searchBy == "کارخانه ها") {
      res = await axios.get(
        `https://supperapp-backend.chbk.run/search/factory/text_search?text=${searchText}&page=0&limit=10`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      setItems(res?.data?.data);
    }

    if (searchBy == "فروشگاه ها") {
      res = await axios.get(
        `https://supperapp-backend.chbk.run/search/shop/text_search?text=${searchText}&page=0&limit=10`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      setItems(res?.data?.data);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <Paper
          component="form"
          className="md:w-[40%] w-full"
          sx={{ p: "6px 8px", display: "flex", alignItems: "center" }}
        >
          <IconButton
            sx={{ p: "10px" }}
            aria-label="menu"
            onClick={() => setItems([])}
          >
            <CloseRounded />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={` جستجو در ${searchBy} `}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton
            className="bg-khas text-white hover:bg-orange-600"
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => GetItems()}
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Select
            className="w-32"
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
        </Paper>

        <div className="w-full md:block hidden ">
          {items.length > 0 ? <MySlider title=" نتایج " data={items} /> : null}
        </div>
      </div>
    </>
  );
};

export default SearchPartMainPage;

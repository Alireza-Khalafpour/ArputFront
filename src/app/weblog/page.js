"use client";

import WeblogCard from "@/components/module/WeblogCard";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function Weblog() {
  const cookie = new Cookies();
  const Auth = cookie.get("tokenDastResi");

  const [articleList, setArticleList] = useState([]);
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
    GetArticlesList(value);
  };

  const GetArticlesList = async (p) => {
    await axios
      .get(
        `https://supperapp-backend.chbk.run/blogs/?page=${p}&limit=30`,
        // {
        //   headers: {
        //     accept: "application/json",
        //     Authorization: `Bearer ${Auth}`,
        //   },
        // }
      )
      .then((response) => {
        setArticleList(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  useEffect(() => {
    GetArticlesList(1);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
      <div className="min-h-36 bg-asliLight w-full text-center flex justify-center items-center rounded-3xl text-white text-4xl font-semibold ">
        مقالات آرپوت
      </div>
      <div className="w-full px-16">header filter</div>
      <div className="w-full h-full flex flex-wrap gap-8 justify-start items-center px-16 ">
        {articleList?.map((art) => (
          <WeblogCard art={art} />
        ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <Pagination
          count={10}
          page={page}
          size="large"
          color="primary"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default Weblog;

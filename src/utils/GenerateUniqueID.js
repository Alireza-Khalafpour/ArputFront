"use client";

import Cookies from "universal-cookie";
import { uuid } from "uuidv4";

const GenerateUniqueID = () => {
  const Uid = uuid();

  const cookies = new Cookies();

  if (cookies.get("UniqueID")) {
    return;
  } else {
    cookies.set("UniqueID", Uid);
  }

  return <div></div>;
};

export default GenerateUniqueID;

import React from "react";
import { BsShieldCheck } from "react-icons/bs";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

const getIcon = ({ value }) => {
  const Icon = value ? <BsShieldCheck /> : <MdOutlineDoNotDisturbAlt />;

  return <div>{Icon}</div>;
};

export default getIcon;

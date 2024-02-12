import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SideData } from "./SideData";
import { loadAllCategories } from "../Services/category-service";
import { Button } from "reactstrap";
import { Search } from "@mui/icons-material";
import { BiSolidCategory } from "react-icons/bi";


function Side() {
  const navigate = useNavigate();
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategorylist([...data]);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="sidebar" style={{ background: "linear-gradient(to left, #73ad21 0%, rgb(130, 143, 135) 41%, #e8fe69 100%" }}>
      <div className="sidebarlist">
        {SideData.map((val, key) => {
          return (
            <ul className="row"
              key={key}
              onClick={() => {
                navigate(val.link);
              }}>
              <li className="dashboard_title">
                {val.icon} &nbsp;
                {val.title} &nbsp;
                <Search />
              </li>
            </ul>
          );
        })}
        {categorylist &&
          categorylist.map((cat, index) => {
            return (
              <ul className="row"
                key={index}
                onClick={() => { navigate(`/category/${cat.id}`); }}>
                <li className="dashboard_title">
                  <BiSolidCategory /> &nbsp;
                  {cat.categoryName}
                </li>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default Side;

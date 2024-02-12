import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useEffect } from "react";
import { doLogout, getCurrentUserDetails, isLoggedIn } from "../auth/Index";
import { useStateValue } from "./StateProvider";
import "./Header.css";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, } from "reactstrap";
import { Search } from "@mui/icons-material";


const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUsername(getCurrentUserDetails());
    console.log(user);
  }, [login, user]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      dispatch({
        type: "SET_USER",
        user: null,
      });
      navigate("/home");
    });
  };

  const [searchField, setSearchField] = useState("");
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const showProfile = () => {
    navigate(`/profile/${user.id}`);
  };
  const resp = JSON.parse(localStorage.getItem("data"));

  return (
    <>
      <Navbar className="nav-bar-bg" style={{ background: "linear-gradient(to left, #73ad21 0%, rgb(130, 143, 135) 41%, #e8fe69 100%" }}>
        <Nav className="me-auto">
          <NavLink to="/" className="text-decoration-none text-light mx-5">
            <img src="logo/FreshBasket_logo.png" alt="Curved image" width="300" height="60" />
          </NavLink>
        </Nav>
        <Nav>
          <Nav>
            <NavLink to="/cart" className="text-decoration-none mx-5">
              <Badge badgeContent={basket?.length} color="primary">
                <i className="fa-solid fa-cart-shopping text-black" style={{ fontSize: 25, cursor: "pointer" }} />
              </Badge>
            </NavLink>
          </Nav>
          {login && (
            <div>
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  Welcome {user?.name}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={showProfile}>Profile</DropdownItem>
                  <DropdownItem onClick={() => {
                    if (resp.role === "seller") {
                      navigate("/sellerDashboard");
                    } else if (resp.role === "admin") {
                      navigate("/adminDashboard");
                    } else navigate("/");
                  }}>Dashboard</DropdownItem>
                  <DropdownItem>My Orders</DropdownItem>
                  <DropdownItem onClick={() => { logout(); }}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown >
            </div>
          )}
          {!login && (
            <>
              <NavLink to="/login" className="text-decoration-none text-black mx-5">
                <h4>Login</h4>
              </NavLink>
              <NavLink to="/about" className="text-decoration-none text-black mx-5">
                <h4>About</h4>
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;

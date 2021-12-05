import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

const MyNav = () => {
  const [isOpen, setIsOpen] = useState(false); // nav
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const toggleFunc = () => setDropdownOpen((prevState) => !prevState);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    history.push("/auth");
    window.location.reload();
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // console.log(user.result);
  }, [location]);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Coach</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      {user && (
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {user?.result?.role === 1 && (
              <>
                <NavItem>
                  <NavLink href="/coachs/">Xe khách</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/drivers/">Tài xế</NavLink>
                </NavItem>
              </>
            )}
            <NavItem>
              <NavLink href="/routes/">Tuyến đường</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/coachtrips/">Chuyến xe</NavLink>
            </NavItem>
            {user?.result?.role !== 1 && (
              <div>
                <NavItem>
                  <NavLink href="/tickets/">Vé xe</NavLink>
                </NavItem>
              </div>
            )}
          </Nav>
          <NavbarText>
            <Dropdown isOpen={dropdownOpen} toggle={toggleFunc}>
              <DropdownToggle caret>{user?.result.name}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={logout}>Đăng xuất</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarText>
        </Collapse>
      )}
    </Navbar>
  );
};

export default MyNav;

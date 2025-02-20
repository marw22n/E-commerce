import React, { useContext } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { IsLoggedIn ,setIsLoggedIn} = useContext(authContext)

  const menuItems = ["Home", "Categories", "Brands", "Cart","wishlist"];

  function logout(){
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/login")
  }

  return (
    
    <HeroUINavbar shouldBlockScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <Link to={"/"}>
          <NavbarBrand>
            <p className="font-bold text-inherit">Store</p>
          </NavbarBrand>
        </Link>
      </NavbarContent>

      {IsLoggedIn && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link
                color="foreground"
                to={item == menuItems[0] ? "/" : "/" + item}
              >
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}

      {IsLoggedIn? (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="danger" variant="bordered" onClick={logout}>logout</Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem>
            <Link to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to="/register">Register</Link>
          </NavbarItem>
        </NavbarContent>
      )}
      {IsLoggedIn && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" color={"foreground"} href="#" size="lg">
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </HeroUINavbar>
  );
}

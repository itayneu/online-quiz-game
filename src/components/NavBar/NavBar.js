import React from "react";
import { useLocalStorage } from "../../hooks";
import Text from "../../components/Text";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const [value, setValue] = useLocalStorage("navbar tab", 0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      style={{ position: "fixed", top: 0 }}
    >
      {/* <Text>Hi</Text>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} href="/PplFinder/" />
        <Tab label="Favorites" index={1} href="/PplFinder/#/favorites" />
      </Tabs> */}
    </AppBar>
  );
};

export default NavBar;
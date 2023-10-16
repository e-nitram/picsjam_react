import React, { useState } from 'react';
import { Drawer, useMediaQuery } from "@mui/material";
import HeaderLaptop from "./HeaderLaptop";
import HeaderMobile from "./HeaderMobile";
import Sidebar from "./Sidebar";

export default function Header() {
  const [show, setShow] = useState(false);
  const isMdSize = useMediaQuery('(max-width: 899px)', { noSsr: true })
  const open = () => setShow(true);
  const close = () => setShow(false);

  return (
    <>
      <HeaderLaptop />
      <HeaderMobile open={open} />
      <React.Fragment>
        <Drawer
          anchor='right'
          open={show && isMdSize}
          onClose={close}
        >
          <Sidebar />
        </Drawer>
      </React.Fragment>
    </>
  );
}

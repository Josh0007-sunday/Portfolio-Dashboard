import React from 'react';
import logo from "../../images/logo.png";
import { FaDiscord, FaHome, FaInfoCircle, FaAddressBook, FaInbox } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiGoogledocs, SiDocsify } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from 'next/image';

const Navbar: React.FC = () => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: 'left' | 'right' | 'top' | 'bottom', open: boolean) => 
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const list = (anchor: 'left' | 'right' | 'top' | 'bottom') => (
        <Box
            className="box"
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List className='side'>
                <section className="logo-section">
                    <Image className="logo" src={logo} alt='logo' />
                </section>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FaHome className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FaInfoCircle className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"About"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FaAddressBook className='icos' />
                        </ListItemIcon>
                        <ListItemText primary={"Contact"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <FaInbox className='icos' />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <section className="bottomsocials">
                <section className="icos">
                    <FaDiscord className="discord" />
                    <BsTwitterX className="twitter" />
                    <SiGoogledocs className="googledocs" />
                    <SiDocsify className="docsify" />
                </section>
            </section>
        </Box>
    );

    return (
        <div className='Navbar'>
            <GiHamburgerMenu
                onClick={(event: React.MouseEvent<SVGElement>) => toggleDrawer("left", true)(event)}
            />

            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
        </div>
    )
}

export default Navbar;
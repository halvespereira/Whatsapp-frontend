import React, { useState } from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import fire from "../firebase";
import "../Styles/Sidebar.css";

const SidebarHeader = ({ currentUserDoc, setCurrentFriend }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const auth = fire.auth();

  const menuAction = (e) => {
    if (e.currentTarget.textContent === "Log out") {
      setCurrentFriend("");
      auth.signOut();
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    "New Group",
    "Create a room",
    "Profile",
    "Archived",
    "Starred",
    "Settings",
    "Log out",
  ];

  const ITEM_HEIGHT = 48;
  return (
    <div className="sidebar__header">
      <Avatar className="avatar" />
      <div className="loggedIn__div">
        <p className="loggedIn__as">Logged in as:</p>
        <p className="loggedIn__user">
          {currentUserDoc ? currentUserDoc.name : null}
        </p>
      </div>

      <div className="sidebar__headerRight">
        <IconButton>
          <DonutLargeIcon id="donutIcon" />
        </IconButton>
        <IconButton>
          <ChatIcon id="chatIcon" />
        </IconButton>
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon id="verticalIcon" />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 7,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={menuAction}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;

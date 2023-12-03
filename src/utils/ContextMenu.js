import { MenuItem, Menu, ListItemIcon, ListItemText } from "@mui/material";

const ContextMenu = ({ open, position, onClose, options, rowData }) => (
  <Menu
    open={open}
    onClose={onClose}
    anchorReference='anchorPosition'
    anchorPosition={{ top: position.y, left: position.x }}
  >
    {options.map((option) => (
      <MenuItem
        key={option.label}
        onClick={(event) => option.onClick(event, rowData)}
      >
        <ListItemIcon>{option.icon}</ListItemIcon>
        <ListItemText>{option.label}</ListItemText>
      </MenuItem>
    ))}
  </Menu>
);

export default ContextMenu;

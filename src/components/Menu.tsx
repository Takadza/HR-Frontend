import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { useMemo } from "react";

export default function Menu() {

  const menuItems = useMemo(() => {
    return [
      ["Employees", "/employees"],
      ["Create Employee", "/employees/create"],
      ["Departments", "/departments"],
      ["Create Department", "/departments/create"],
    ];
  }, []);

  return (
    <div className="flex flex-col items-stretch w-1/5 shadow-md min-h-[600px] rounded-md bg-white">
      <List 
      subheader={
        <ListSubheader component="div">
          Menu
        </ListSubheader>
      }>
        {menuItems.map(([label, link]) => (
          <ListItem disablePadding>
            <ListItemButton component="a" href={link}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
import logo from '../assets/logo.png';
import styles from '../styles/header.module.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AbcRoundedIcon from '@mui/icons-material/AbcRounded';
import { useNavigate } from 'react-router-dom';
function Header()
{
    const [open, setOpen] = React.useState(false);
    const navigate=useNavigate();
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  const handleCategoryClick=(category)=>
  {
    navigate(`/category/${category}`);
  }
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        
        <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Menu" />
              </ListItemButton>
            </ListItem>
        <Divider />
        <List>
          {['Bussiness', 'Entertainment', 'General', 'Health Science','Sports','Technology'].map((text, index) => (
            <ListItem key={text} disablePadding onClick={()=>handleCategoryClick(text.toLowerCase())}>
              <ListItemButton>
                <ListItemIcon>
                {text==="Bussiness" && <BusinessCenterIcon/>}
                {text==="Entertainment" && <MovieFilterIcon/>}
                {text==="General" && <AbcRoundedIcon/>}
                {text==="Health Science" && <MedicalInformationIcon/>}
                {text==="Sports" && <SportsCricketIcon/>}
                {text==="Technology" && <ImportantDevicesIcon/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  

    return(
    
        <div className={styles.header}>
            <MenuRoundedIcon onClick={toggleDrawer(true)}/>
            <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
            <div>
            <img style={{cursor:"pointer"}} src={logo} alt='logo' onClick={(e)=>{navigate('/');window.location.reload();}}/>
            </div>
        </div>
    )
}
export default Header;
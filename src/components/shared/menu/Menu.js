import '../../../style/App.css';
import bosch from '../../../assets/bosch.png';
import React from 'react';
import { Box, Divider, List, ListItem, SwipeableDrawer } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

// choose right, left, down, up, it displays where the menu will be shown
const anchor = 'right';

export function Menu() {
    const navigate = useNavigate();
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer =
        (anchor, open) =>
            (event) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event).key === 'Tab' ||
                        (event).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>

                <ListItem button onClick={() => navigate('/')}>
                    <Typography style={{ color: 'black' }} variant="body1" gutterBottom component="div">
                        Home
                    </Typography>

                </ListItem>
                <Divider />


                <ListItem button onClick={() => navigate('/createTemplate')}>
                    <Typography style={{ color: 'black' }} variant="body1" gutterBottom component="div">
                        App
                    </Typography>

                </ListItem>

                <Divider />

                <ListItem button onClick={() => navigate('/editTemplate')}>
                    <Typography style={{ color: 'black' }} variant="body1" gutterBottom component="div">
                        Services
                    </Typography>


                </ListItem>

                <Divider />

            </List>

        </Box >
    );



    return (
        <>
            <hr className='bosch-divider' />
            <nav className="bosch-header">
                <img src={bosch} className="bosch-header-logo" alt="logo" />
                <button type="button" onClick={toggleDrawer(anchor, true)} id="hamburger">

                    <span className="Navigation-icon" >
                        <span className="Navigation-bar"></span>
                        <span className="Navigation-bar"></span>
                        <span className="Navigation-bar"></span>
                    </span>
                    <span className="Mobile-Menu" id="navMenu">Menu</span>
                </button>
            </nav>


            <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
            >
                {list(anchor)}
            </SwipeableDrawer>


        </>
    )
}
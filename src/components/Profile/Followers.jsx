import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #',
    boxShadow: 24,
    p: 4,
};

export default function Followers({ followers }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    return (
        <div>
            <Typography onClick={handleOpen}>followers</Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography>Followers</Typography>
                    {followers?.map((oneFollower, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                border: '0.5px solid #121212',
                                m: 1,
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                navigate(`/profile/${oneFollower.id}`);
                                handleClose();
                            }}
                        >
                            <img
                                src={oneFollower.avatar}
                                alt=""
                                width={'40px'}
                                height={'40px'}
                            />
                            <Typography sx={{ ml: 2 }}>
                                {oneFollower.nick}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Modal>
        </div>
    );
}

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
    border: '2px solid #262627',
    boxShadow: 24,
    p: 4,
};

export default function Follows({ follows }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    return (
        <>
            <Typography onClick={handleOpen}>follows</Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ m: 1, fontSize: '20px' }}>
                        Follows
                    </Typography>

                    {follows.map((oneFollow, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                border: '0.5px solid #121212',
                                m: 1,
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                navigate(`/profile/${oneFollow.id}`);
                                handleClose();
                            }}
                        >
                            <img
                                src={oneFollow.avatar}
                                alt=""
                                width={'40px'}
                                height={'40px'}
                            />
                            <Typography sx={{ ml: 2 }}>
                                {oneFollow.nick}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Modal>
        </>
    );
}

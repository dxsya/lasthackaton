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

export default function Followers({ buys }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                sx={{
                    color: 'white',
                    border: '1px solid #aeaeae',
                    fontSize: '13px',
                    paddingX: 5,
                    height: '30px',
                }}
                onClick={handleOpen}
            >
                buys
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography>Buys</Typography>
                    {buys?.map((oneBuy, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                border: '0.5px solid #121212',
                                m: 1,
                                alignItems: 'center',
                            }}
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            <img
                                src={oneBuy.image}
                                alt=""
                                width={'40px'}
                                height={'40px'}
                            />
                            <Typography sx={{ ml: 2 }}>
                                {oneBuy.price}$
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Modal>
        </div>
    );
}

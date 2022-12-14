import { Box } from '@mui/material';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { useUsers } from './contexts/UsersContextProvider';
import AuthPage from './pages/AuthPage';
import MainRoutes from './routes/MainRoutes';

function App() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />

            <Box sx={{ width: '84%', margin: '0 auto' }}>
                <MainRoutes />
            </Box>
        </Box>
    );
}

export default App;

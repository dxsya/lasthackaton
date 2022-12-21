import { Box } from '@mui/material';
import Sidebar from './components/Sidebar/Sidebar';
import MainRoutes from './routes/MainRoutes';
import './App.css';

function App() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ width: '88%', margin: '0 auto' }}>
                <MainRoutes />
            </Box>
        </Box>
    );
}

export default App;

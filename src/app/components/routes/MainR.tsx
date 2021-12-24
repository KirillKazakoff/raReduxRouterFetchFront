import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box } from '../primitives/Box';

export default function MainR() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/services');
    }, []);

    return (
        <Box variant='layout'>
            <Outlet />
        </Box>
    );
}

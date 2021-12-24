import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Box } from '../primitives/Box';

export default function MainR() {
    return (
        <Box variant='layout'>
            <Outlet />
        </Box>
    );
}

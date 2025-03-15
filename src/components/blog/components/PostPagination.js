import React from 'react';
import { Box, Pagination } from '@mui/material';

const PostPagination = ({ totalPages, currentPage, onChange }) => {
    if (totalPages <= 1) return null;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={onChange}
                color="primary"
                size="large"
            />
        </Box>
    );
};

export default PostPagination;

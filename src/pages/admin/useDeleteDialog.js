import { useState } from 'react';

const useDeleteDialog = () => {
    const [open, setOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleOpen = (item) => {
        setItemToDelete(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setItemToDelete(null);
    };

    return { open, itemToDelete, handleOpen, handleClose };
};

export default useDeleteDialog;

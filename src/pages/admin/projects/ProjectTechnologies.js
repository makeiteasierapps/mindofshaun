import React from 'react';
import {
    Grid2,
    Button,
    Typography,
    Box,
    Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTextField } from './styles/ProjectForm.styles';

const ProjectTechnologies = ({
    formData,
    newClientTech,
    newServerTech,
    setNewClientTech,
    setNewServerTech,
    handleAddClientTech,
    handleAddServerTech,
    handleRemoveClientTech,
    handleRemoveServerTech,
}) => {
    // Safely access tech arrays from project_details
    const clientTech = formData?.project_details?.clientTech || [];
    const serverTech = formData?.project_details?.serverTech || [];

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={12}>
                <Typography variant="h6" gutterBottom>
                    Project Technologies
                </Typography>
            </Grid2>

            {/* Client Technologies */}
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="subtitle1">
                        Client Technologies
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <StyledTextField
                            fullWidth
                            label="Add Client Technology"
                            value={newClientTech}
                            onChange={(e) => setNewClientTech(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddClientTech}
                            disabled={!newClientTech}
                        >
                            Add
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {clientTech.map((tech, index) => (
                            <Chip
                                key={index}
                                label={tech}
                                onDelete={() => handleRemoveClientTech(index)}
                                deleteIcon={<DeleteIcon />}
                            />
                        ))}
                    </Box>
                </Box>
            </Grid2>

            {/* Server Technologies */}
            <Grid2 size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="subtitle1">
                        Server Technologies
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <StyledTextField
                            fullWidth
                            label="Add Server Technology"
                            value={newServerTech}
                            onChange={(e) => setNewServerTech(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddServerTech}
                            disabled={!newServerTech}
                        >
                            Add
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {serverTech.map((tech, index) => (
                            <Chip
                                key={index}
                                label={tech}
                                onDelete={() => handleRemoveServerTech(index)}
                                deleteIcon={<DeleteIcon />}
                            />
                        ))}
                    </Box>
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default ProjectTechnologies;

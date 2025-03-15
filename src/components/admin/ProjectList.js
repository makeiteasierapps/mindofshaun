import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ProjectList = ({ projects, loading, onEdit, onDelete }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!projects || projects.length === 0) {
        return (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1">
                    No projects found. Create your first project!
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Technologies</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project._id}>
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle2">
                                    {project.ProjectDetails.title}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        maxWidth: 250,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {project.ProjectDetails.description}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {project.images.length} images
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                    }}
                                >
                                    {project.clientTech
                                        .slice(0, 2)
                                        .map((tech, index) => (
                                            <Chip
                                                key={index}
                                                label={tech.name}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            />
                                        ))}
                                    {project.serverTech
                                        .slice(0, 2)
                                        .map((tech, index) => (
                                            <Chip
                                                key={index}
                                                label={tech.name}
                                                size="small"
                                                variant="outlined"
                                                color="secondary"
                                            />
                                        ))}
                                    {project.clientTech.length +
                                        project.serverTech.length >
                                        4 && (
                                        <Chip
                                            label={`+${
                                                project.clientTech.length +
                                                project.serverTech.length -
                                                4
                                            } more`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell>
                                {project.published ? (
                                    <Chip
                                        icon={
                                            <VisibilityIcon fontSize="small" />
                                        }
                                        label="Published"
                                        color="success"
                                        size="small"
                                    />
                                ) : (
                                    <Chip
                                        icon={
                                            <VisibilityOffIcon fontSize="small" />
                                        }
                                        label="Draft"
                                        color="default"
                                        size="small"
                                    />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Tooltip title="Edit">
                                        <IconButton
                                            color="primary"
                                            onClick={() => onEdit(project)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={() => onDelete(project)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectList;

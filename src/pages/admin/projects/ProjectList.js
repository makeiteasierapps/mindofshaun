import React from 'react';
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Chip,
    Tooltip,
    CircularProgress,
    Card,
    CardContent,
    CardActions,
    Divider,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ImageIcon from '@mui/icons-material/Image';

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
        <Grid2 container spacing={2}>
            {projects.map((project) => {
                const projectDetails = project.project_details || project.ProjectDetails || {};
                const clientTech = projectDetails.clientTech || [];
                const serverTech = projectDetails.serverTech || [];

                return (
                    <Grid2 size={12} sm={6} md={4} lg={3} key={project._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'flex-start',
                                    mb: 1
                                }}>
                                    <Typography variant="h6" gutterBottom noWrap sx={{ maxWidth: '80%' }}>
                                        {projectDetails.title || 'Untitled'}
                                    </Typography>
                                    
                                    {projectDetails.published ? (
                                        <Chip
                                            icon={<VisibilityIcon fontSize="small" />}
                                            label="Published"
                                            color="success"
                                            size="small"
                                        />
                                    ) : (
                                        <Chip
                                            icon={<VisibilityOffIcon fontSize="small" />}
                                            label="Draft"
                                            color="default"
                                            size="small"
                                        />
                                    )}
                                </Box>
                                
                                <Typography variant="body2" color="text.secondary" sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    mb: 2,
                                    height: '4.5em'
                                }}>
                                    {projectDetails.description || 'No description'}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <ImageIcon fontSize="small" sx={{ mr: 1 }} />
                                    <Typography variant="body2">
                                        {project.images?.length || 0} images
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
                                    Technologies:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {clientTech.slice(0, 2).map((tech, index) => (
                                        <Chip
                                            key={`client-${index}`}
                                            label={tech}
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                        />
                                    ))}
                                    {serverTech.slice(0, 2).map((tech, index) => (
                                        <Chip
                                            key={`server-${index}`}
                                            label={tech}
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    ))}
                                    {clientTech.length + serverTech.length > 4 && (
                                        <Chip
                                            label={`+${clientTech.length + serverTech.length - 4} more`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                            </CardContent>

                            <CardActions>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                    <Tooltip title="Edit">
                                        <IconButton color="primary" onClick={() => onEdit(project)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color="error" onClick={() => onDelete(project)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid2>
                );
            })}
        </Grid2>
    );
};

export default ProjectList;
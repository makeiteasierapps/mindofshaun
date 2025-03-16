import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    IconButton,
    FormControlLabel,
    Switch,
    Divider,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useProjects } from '../../contexts/ProjectsContext';

const initialProjectState = {
    images: [],
    clientTech: [],
    serverTech: [],
    ProjectDetails: {
        font: '',
        fontColor: '',
        title: '',
        description: '',
        clientCode: '',
        serverCode: '',
    },
    published: false,
};

const ProjectForm = ({ project = null, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(initialProjectState);
    const [newImage, setNewImage] = useState({ file: null, description: '' });
    const [newClientTech, setNewClientTech] = useState('');
    const [newServerTech, setNewServerTech] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [isNewProject, setIsNewProject] = useState(true);

    const { uploadProjectImage } = useProjects();

    // Initialize form with project data if editing
    useEffect(() => {
        // Check if this is a new project or an existing one
        // A new project will be an empty object or null
        const isExistingProject = project && project._id;
        setIsNewProject(!isExistingProject);

        if (isExistingProject) {
            // Ensure all array properties exist and are arrays
            setFormData({
                ...initialProjectState, // Start with defaults
                ...project, // Override with project data
                // Ensure these are always arrays
                clientTech: Array.isArray(project.clientTech)
                    ? project.clientTech
                    : [],
                serverTech: Array.isArray(project.serverTech)
                    ? project.serverTech
                    : [],
                images: Array.isArray(project.images) ? project.images : [],
            });

            // Create preview URLs for existing images
            const previews = project.images
                ? project.images.map((img) => ({
                      url: img.image,
                      description: img.description,
                  }))
                : [];
            setPreviewImages(previews);
        } else {
            // For new projects, reset to initial state
            setFormData(initialProjectState);
            setPreviewImages([]);
        }
    }, [project]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Handle published toggle
    const handlePublishedToggle = (e) => {
        setFormData({
            ...formData,
            published: e.target.checked,
        });
    };

    // Handle image file selection
    const handleImageSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImage({
                ...newImage,
                file,
            });

            // Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreviewImages([
                ...previewImages,
                {
                    url: previewUrl,
                    description: newImage.description,
                    isNew: true,
                    file,
                },
            ]);
        }
    };

    // Handle image description change
    const handleImageDescriptionChange = (e) => {
        setNewImage({
            ...newImage,
            description: e.target.value,
        });
    };

    // Add image to project
    const handleAddImage = async () => {
        if (!newImage.file || !newImage.description) {
            return;
        }

        try {
            setIsUploading(true);
            const imagePath = await uploadProjectImage(newImage.file);

            const newImageObj = {
                image: imagePath,
                description: newImage.description,
            };

            setFormData({
                ...formData,
                images: [...formData.images, newImageObj],
            });

            // Update preview images
            const updatedPreviews = previewImages.map((preview) => {
                if (preview.file === newImage.file) {
                    return {
                        ...preview,
                        url: imagePath,
                        isNew: false,
                    };
                }
                return preview;
            });
            setPreviewImages(updatedPreviews);

            // Reset new image state
            setNewImage({ file: null, description: '' });
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Remove image from project
    const handleRemoveImage = (index) => {
        const updatedImages = [...formData.images];
        updatedImages.splice(index, 1);

        setFormData({
            ...formData,
            images: updatedImages,
        });

        // Also remove from preview images
        const updatedPreviews = [...previewImages];
        updatedPreviews.splice(index, 1);
        setPreviewImages(updatedPreviews);
    };

    // Add client technology
    const handleAddClientTech = () => {
        if (!newClientTech) return;

        setFormData({
            ...formData,
            clientTech: [...formData.clientTech, { name: newClientTech }],
        });
        setNewClientTech('');
    };

    // Remove client technology
    const handleRemoveClientTech = (index) => {
        const updatedClientTech = [...formData.clientTech];
        updatedClientTech.splice(index, 1);

        setFormData({
            ...formData,
            clientTech: updatedClientTech,
        });
    };

    // Add server technology
    const handleAddServerTech = () => {
        if (!newServerTech) return;

        setFormData({
            ...formData,
            serverTech: [...formData.serverTech, { name: newServerTech }],
        });
        setNewServerTech('');
    };

    // Remove server technology
    const handleRemoveServerTech = (index) => {
        const updatedServerTech = [...formData.serverTech];
        updatedServerTech.splice(index, 1);

        setFormData({
            ...formData,
            serverTech: updatedServerTech,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
                {!isNewProject ? 'Edit Project' : 'Add New Project'}
            </Typography>

            <form onSubmit={handleSubmit}>
                {/* Project Details Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Project Details
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="ProjectDetails.title"
                                value={formData?.ProjectDetails?.title}
                                onChange={handleChange}
                                required
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="ProjectDetails.description"
                                value={formData?.ProjectDetails?.description}
                                onChange={handleChange}
                                required
                                margin="normal"
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Client Code URL"
                                name="ProjectDetails.clientCode"
                                value={formData?.ProjectDetails?.clientCode}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Server Code URL"
                                name="ProjectDetails.serverCode"
                                value={formData?.ProjectDetails?.serverCode}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Images Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Project Images
                    </Typography>

                    {/* Image Preview */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        {previewImages.map((preview, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 1,
                                        position: 'relative',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={preview.url}
                                        alt={preview.description}
                                        sx={{
                                            width: '100%',
                                            height: 150,
                                            objectFit: 'contain',
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ flex: 1 }}
                                    >
                                        {preview.description}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            mt: 1,
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() =>
                                                handleRemoveImage(index)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Add New Image */}
                    <Box
                        sx={{
                            mb: 2,
                            p: 2,
                            border: '1px dashed grey',
                            borderRadius: 1,
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={5}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                >
                                    Select Image
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    fullWidth
                                    label="Image Description"
                                    value={newImage.description}
                                    onChange={handleImageDescriptionChange}
                                    disabled={!newImage.file}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddImage}
                                    disabled={
                                        !newImage.file ||
                                        !newImage.description ||
                                        isUploading
                                    }
                                    fullWidth
                                >
                                    {isUploading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        'Add'
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Technologies Section */}
                <Grid container spacing={4}>
                    {/* Client Technologies */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Client Technologies
                        </Typography>

                        <Box sx={{ display: 'flex', mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Add Client Technology"
                                value={newClientTech}
                                onChange={(e) =>
                                    setNewClientTech(e.target.value)
                                }
                                sx={{ mr: 1 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddClientTech}
                                disabled={!newClientTech}
                            >
                                <AddIcon />
                            </Button>
                        </Box>

                        <List>
                            {formData?.clientTech?.map((tech, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText primary={tech.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() =>
                                                handleRemoveClientTech(index)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Server Technologies */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Server Technologies
                        </Typography>

                        <Box sx={{ display: 'flex', mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Add Server Technology"
                                value={newServerTech}
                                onChange={(e) =>
                                    setNewServerTech(e.target.value)
                                }
                                sx={{ mr: 1 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddServerTech}
                                disabled={!newServerTech}
                            >
                                <AddIcon />
                            </Button>
                        </Box>

                        <List>
                            {formData?.serverTech?.map((tech, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText primary={tech.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() =>
                                                handleRemoveServerTech(index)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Publishing Options */}
                <Box sx={{ mb: 3 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData?.published}
                                onChange={handlePublishedToggle}
                                color="primary"
                            />
                        }
                        label="Publish Project"
                    />
                </Box>

                {/* Form Actions */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        mt: 3,
                    }}
                >
                    <Button variant="outlined" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        {!isNewProject ? 'Update Project' : 'Create Project'}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default ProjectForm;

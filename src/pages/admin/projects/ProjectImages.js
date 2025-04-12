import React from 'react';
import {
    Grid2,
    TextField,
    Box,
    Typography,
    IconButton,
    Paper,
    CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ProjectImages = ({
    previewImages,
    handleImageSelect,
    handleImageDescriptionChange,
    handleRemoveImage,
}) => {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={12}>
                <Typography variant="h6" gutterBottom>
                    Project Images
                </Typography>
            </Grid2>

            <Grid2 size={12}>
                <Grid2 container spacing={2}>
                    {/* Upload Card - Always visible */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                        <Paper
                            sx={{
                                p: 0,
                                position: 'relative',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'background.paper',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition:
                                    'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4,
                                    '& .upload-overlay': {
                                        backgroundColor:
                                            'rgba(0, 178, 181, 0.2)',
                                    },
                                },
                                minHeight: '240px',
                            }}
                            onClick={() =>
                                document.getElementById('image-upload').click()
                            }
                        >
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                type="file"
                                onChange={handleImageSelect}
                                multiple
                            />

                            {/* Upload Card Content */}
                            <Box
                                className="upload-overlay"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(0, 115, 117, 0.1)',
                                    border: '2px dashed',
                                    borderColor: 'primary.main',
                                    p: 3,
                                    transition:
                                        'background-color 0.2s ease-in-out',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <AddIcon
                                        sx={{
                                            fontSize: 48,
                                            color: 'primary.main',
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        color="primary.main"
                                        align="center"
                                    >
                                        Add more images
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        align="center"
                                    >
                                        JPG, PNG, GIF
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid2>

                    {/* Image Preview Cards */}
                    {previewImages.map((image, index) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Paper
                                sx={{
                                    p: 0,
                                    position: 'relative',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'background.paper',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    transition:
                                        'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        paddingTop: '75%', // 4:3 aspect ratio
                                    }}
                                >
                                    <img
                                        src={image.url}
                                        alt={`Preview ${index + 1}`}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <IconButton
                                        onClick={() => handleRemoveImage(index)}
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.5)',
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.7)',
                                            },
                                        }}
                                    >
                                        <DeleteIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Image Description"
                                        value={image.description}
                                        onChange={(e) =>
                                            handleImageDescriptionChange(
                                                e,
                                                index
                                            )
                                        }
                                        multiline
                                        rows={2}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                                {image.isLoading && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.7)',
                                            color: 'white',
                                            gap: 2,
                                        }}
                                    >
                                        <CircularProgress
                                            size={40}
                                            color="primary"
                                        />
                                        <Typography variant="body2">
                                            Loading preview...
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            </Grid2>

            {/* Show instructions when no images */}
            {previewImages.length === 0 && (
                <Grid2 size={12}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 2,
                            color: 'text.secondary',
                        }}
                    >
                        <Typography variant="body1">
                            Click the upload card to add your first project
                            image
                        </Typography>
                    </Box>
                </Grid2>
            )}
        </Grid2>
    );
};

export default ProjectImages;

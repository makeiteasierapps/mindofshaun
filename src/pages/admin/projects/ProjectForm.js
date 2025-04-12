import React from 'react';
import {
    Typography,
    Button,
    FormControlLabel,
    Switch,
    Divider,
    CircularProgress,
} from '@mui/material';
import { useProjects } from '../../../contexts/ProjectsContext';
import { StyledPaper, FormActions } from './styles/ProjectForm.styles';
import ProjectDetails from './ProjectDetails';
import ProjectImages from './ProjectImages';
import ProjectTechnologies from './ProjectTechnologies';

const ProjectForm = ({ project = null, onSubmit, onCancel }) => {
    const { useProjectForm } = useProjects();
    const {
        formData,
        handlePublishedToggle,
        handleSubmit,
        handleChange,
        onCancel: handleCancel,
        isNewProject,
        isUploading,
        previewImages,
        handleImageSelect,
        handleImageDescriptionChange,
        handleRemoveImage,
        newClientTech,
        newServerTech,
        setNewClientTech,
        setNewServerTech,
        handleAddClientTech,
        handleAddServerTech,
        handleRemoveClientTech,
        handleRemoveServerTech,
    } = useProjectForm(project, onSubmit, onCancel);

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
                {!isNewProject ? 'Edit Project' : 'Add New Project'}
            </Typography>

            <form onSubmit={handleSubmit}>
                <ProjectDetails
                    formData={formData}
                    handleChange={handleChange}
                />

                <Divider sx={{ my: 3 }} />

                <ProjectImages
                    previewImages={previewImages}
                    handleImageSelect={handleImageSelect}
                    handleImageDescriptionChange={handleImageDescriptionChange}
                    handleRemoveImage={handleRemoveImage}
                />

                <Divider sx={{ my: 3 }} />

                <ProjectTechnologies
                    formData={formData}
                    newClientTech={newClientTech}
                    newServerTech={newServerTech}
                    setNewClientTech={setNewClientTech}
                    setNewServerTech={setNewServerTech}
                    handleAddClientTech={handleAddClientTech}
                    handleAddServerTech={handleAddServerTech}
                    handleRemoveClientTech={handleRemoveClientTech}
                    handleRemoveServerTech={handleRemoveServerTech}
                />

                <Divider sx={{ my: 3 }} />

                <FormControlLabel
                    control={
                        <Switch
                            checked={formData?.project_details.published}
                            onChange={handlePublishedToggle}
                            color="primary"
                        />
                    }
                    label="Publish Project"
                />

                <FormActions>
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        disabled={isUploading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isUploading}
                        startIcon={
                            isUploading && (
                                <CircularProgress size={20} color="inherit" />
                            )
                        }
                    >
                        {isUploading
                            ? 'Processing...'
                            : !isNewProject
                            ? 'Update Project'
                            : 'Create Project'}
                    </Button>
                </FormActions>
            </form>
        </StyledPaper>
    );
};

export default ProjectForm;

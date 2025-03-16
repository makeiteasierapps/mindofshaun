import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect,
} from 'react';

const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl =
        process.env.NODE_ENV === 'development'
            ? `http://${process.env.REACT_APP_BACKEND_URL}`
            : `https://${process.env.REACT_APP_BACKEND_URL_PROD}`;

    // Fetch all projects (for admin)
    const fetchAllProjects = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backendUrl}/projects`);
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            console.log('data', data);
            setProjects(data);
            return data;
        } catch (error) {
            console.error('Error fetching all projects:', error);
            setError(error.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, [backendUrl]);

    // Create a new project
    const createProject = useCallback(
        async (projectData) => {
            try {
                const response = await fetch(`${backendUrl}/api/projects`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(projectData),
                });
                if (!response.ok) {
                    throw new Error('Failed to create project');
                }
                const newProject = await response.json();
                setProjects((prevProjects) => [...prevProjects, newProject]);
                return newProject;
            } catch (error) {
                console.error('Error creating project:', error);
                setError(error.message);
                throw error;
            }
        },
        [backendUrl]
    );

    // Update an existing project
    const updateProject = useCallback(
        async (projectId, projectData) => {
            console.log('projectData', projectData);
            try {
                const response = await fetch(
                    `${backendUrl}/projects/${projectId}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(projectData),
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to update project');
                }
                const updatedProject = await response.json();
                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project._id === projectId ? updatedProject : project
                    )
                );
                return updatedProject;
            } catch (error) {
                console.error('Error updating project:', error);
                setError(error.message);
                throw error;
            }
        },
        [backendUrl]
    );

    // Delete a project
    const deleteProject = useCallback(
        async (projectId) => {
            try {
                const response = await fetch(
                    `${backendUrl}/projects/${projectId}`,
                    {
                        method: 'DELETE',
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to delete project');
                }
                setProjects((prevProjects) =>
                    prevProjects.filter((project) => project._id !== projectId)
                );
                return true;
            } catch (error) {
                console.error('Error deleting project:', error);
                setError(error.message);
                throw error;
            }
        },
        [backendUrl]
    );

    // Upload a project image
    const uploadProjectImage = useCallback(
        async (file) => {
            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch(
                    `${backendUrl}/projects/upload-image`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await response.json();
                return data.path; // Return the path to the uploaded image
            } catch (error) {
                console.error('Error uploading project image:', error);
                setError(error.message);
                throw error;
            }
        },
        [backendUrl]
    );

    // Get published projects only (for public view)
    const getPublishedProjects = useCallback(() => {
        return projects.filter((project) => project.published);
    }, [projects]);

    // Load projects on initial mount
    useEffect(() => {
        fetchAllProjects();
    }, [fetchAllProjects]);

    const value = {
        projects,
        loading,
        error,
        fetchAllProjects,
        createProject,
        updateProject,
        deleteProject,
        uploadProjectImage,
        getPublishedProjects,
    };

    return (
        <ProjectsContext.Provider value={value}>
            {children}
        </ProjectsContext.Provider>
    );
};

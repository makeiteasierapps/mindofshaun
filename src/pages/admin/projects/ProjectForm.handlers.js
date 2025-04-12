import { useState, useEffect } from 'react';

export const useProjectFormHandlers = (project, onSubmit, onCancel) => {
    const [formData, setFormData] = useState({
        images: [],
        project_details: {
            title: '',
            description: '',
            clientCode: '',
            serverCode: '',
            clientTech: [],
            serverTech: [],
            published: false,
        },
    });
    const [newClientTech, setNewClientTech] = useState('');
    const [newServerTech, setNewServerTech] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [isNewProject, setIsNewProject] = useState(true);

    // Initialize form with project data if editing
    useEffect(() => {
        const isExistingProject = project && project._id;
        setIsNewProject(!isExistingProject);

        if (isExistingProject) {
            // Convert from backend format (ProjectDetails) to frontend format (project_details)
            const projectDetails = project.ProjectDetails ||
                project.project_details || {
                    title: '',
                    description: '',
                    clientCode: '',
                    serverCode: '',
                    clientTech: [],
                    serverTech: [],
                    published: false,
                };

            setFormData({
                ...project,
                images: Array.isArray(project.images) ? project.images : [],
                project_details: projectDetails,
            });

            const previews = project.images
                ? project.images.map((img) => ({
                      url: img.image,
                      description: img.description,
                      isNew: false,
                      isLoading: false,
                  }))
                : [];
            setPreviewImages(previews);
        } else {
            // Reset form for new project
            setFormData({
                images: [],
                project_details: {
                    title: '',
                    description: '',
                    clientCode: '',
                    serverCode: '',
                    clientTech: [],
                    serverTech: [],
                    published: false,
                },
                
            });
            setPreviewImages([]);
        }
    }, [project]);

    const updateFormData = (path, value) => {
        if (typeof path === 'string') {
            // Handle dot notation path like 'project_details.title'
            if (path.includes('.')) {
                const [parent, child] = path.split('.');
                setFormData((prev) => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: value,
                    },
                }));
            } else {
                // Handle top-level fields
                setFormData((prev) => ({
                    ...prev,
                    [path]: value,
                }));
            }
        }
    };

    // Handle form field changes with consolidated handler
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Use the value for normal inputs, checked for checkboxes
        updateFormData(name, type === 'checkbox' ? checked : value);
    };

    // Handle technology additions and removals with consolidated handlers
    const handleTechChange = (techType, action, value = null, index = null) => {
        const path = `project_details.${techType}Tech`;
        const currentTech = [...formData.project_details[`${techType}Tech`]];

        if (action === 'add' && value) {
            updateFormData(path, [...currentTech, value ]);
            // Reset the input field
            techType === 'client' ? setNewClientTech('') : setNewServerTech('');
        } else if (action === 'remove' && index !== null) {
            currentTech.splice(index, 1);
            updateFormData(path, currentTech);
        }
    };

    // Simplified handler functions that use the consolidated handlers
    const handleAddClientTech = () => {
        if (!newClientTech) return;
        handleTechChange('client', 'add', newClientTech);
    };

    const handleRemoveClientTech = (index) => {
        handleTechChange('client', 'remove', null, index);
    };

    const handleAddServerTech = () => {
        if (!newServerTech) return;
        handleTechChange('server', 'add', newServerTech);
    };

    const handleRemoveServerTech = (index) => {
        handleTechChange('server', 'remove', null, index);
    };

    // Handle published toggle - now uses the consolidated updateFormData
    const handlePublishedToggle = (e) => {
        updateFormData('project_details.published', e.target.checked);
    };
    
    // Handle image file selection
    const handleImageSelect = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            // Create new preview objects with loading state
            const newPreviews = files.map((file) => {
                const url = URL.createObjectURL(file);
                const preview = {
                    url,
                    description: '',
                    isNew: true,
                    file,
                    isLoading: true,
                };

                // When the image loads, update the loading state
                const img = new Image();
                img.onload = () => {
                    setPreviewImages((prev) =>
                        prev.map((item) =>
                            item.url === url
                                ? { ...item, isLoading: false }
                                : item
                        )
                    );
                };
                img.src = url;

                return preview;
            });

            setPreviewImages((prev) => [...prev, ...newPreviews]);
        }
    };

    // Handle image description change
    const handleImageDescriptionChange = (e, index) => {
        const updatedPreviews = [...previewImages];
        updatedPreviews[index] = {
            ...updatedPreviews[index],
            description: e.target.value,
        };
        setPreviewImages(updatedPreviews);
    };

    // Remove image from project
    const handleRemoveImage = (index) => {
        const updatedPreviews = [...previewImages];
        const removedImage = updatedPreviews[index];

        // Clean up object URL if it's a new image
        if (removedImage.isNew && removedImage.url.startsWith('blob:')) {
            URL.revokeObjectURL(removedImage.url);
        } else {
            // For existing images, mark for deletion
            setFormData((prevFormData) => ({
                ...prevFormData,
                imagesToDelete: [
                    ...(prevFormData.imagesToDelete || []),
                    removedImage.url,
                ],
            }));
        }

        updatedPreviews.splice(index, 1);
        setPreviewImages(updatedPreviews);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            // Create a FormData object for multipart/form-data submission
            const formDataObj = new FormData();

            // Prepare the project data
            const projectData = {
                ...formData,
                // Include existing images
                images: previewImages
                    .filter((img) => !img.isNew)
                    .map((img) => ({
                        image: img.url,
                        description: img.description,
                    })),
            };

            // Convert project data to JSON and add to form
            formDataObj.append('projectData', JSON.stringify(projectData));

            // Create an array of descriptions that matches the order of files we'll upload
            const imageDescriptions = previewImages
                .filter((img) => img.isNew && img.file)
                .map((img) => img.description);

            // Add the descriptions as a JSON array - this ensures order is preserved
            formDataObj.append(
                'imageDescriptions',
                JSON.stringify(imageDescriptions)
            );

            // Add all new image files with the same field name
            // FastAPI will collect these as a list
            previewImages
                .filter((img) => img.isNew && img.file)
                .forEach((img) => {
                    formDataObj.append('image_files', img.file);
                });

            // Pass FormData to the submit handler
            await onSubmit(formDataObj);
        } catch (error) {
            console.error('Error in form submission:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return {
        formData,
        newClientTech,
        newServerTech,
        isUploading,
        previewImages,
        isNewProject,
        setNewClientTech,
        setNewServerTech,
        handleChange,
        handlePublishedToggle,
        handleImageSelect,
        handleImageDescriptionChange,
        handleRemoveImage,
        handleAddClientTech,
        handleAddServerTech,
        handleRemoveClientTech,
        handleRemoveServerTech,
        handleSubmit,
        onCancel,
    };
};

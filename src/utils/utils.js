export const getBackendUrl = () => {
    return import.meta.env.MODE === 'development'
        ? `http://${import.meta.env.VITE_BACKEND_URL}`
        : `https://${import.meta.env.VITE_BACKEND_URL_PROD}`;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const getBackendUrl = () => {
    return process.env.NODE_ENV === 'development'
        ? `http://${process.env.REACT_APP_BACKEND_URL}`
        : `https://${process.env.REACT_APP_BACKEND_URL_PROD}`;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

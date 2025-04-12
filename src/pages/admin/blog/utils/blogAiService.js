import { getBackendUrl } from '../../../../utils/utils';

const backendUrl = getBackendUrl();

/**
 * Service for interacting with the AI blog assistant endpoints
 */
const blogAiService = {
    /**
     * Organize unorganized thoughts into structured blog ideas
     * @param {string} rawThoughts - The raw thoughts to organize
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The organized thoughts
     */
    organizeThoughts: async (rawThoughts, postId) => {
        try {
            const response = await fetch(
                `${backendUrl}/blog/ai/organize-thoughts`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blog_content: rawThoughts,
                        post_id: postId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to organize thoughts');
            }

            return await response.json();
        } catch (error) {
            console.error('Error organizing thoughts:', error);
            throw error;
        }
    },

    /**
     * Review blog content and provide specific improvement suggestions
     * @param {string} draftContent - The draft content to edit
     * @param {string} tone - The desired tone
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The edited content suggestions
     */
    editContent: async (content, tone, postId) => {
        try {
            const response = await fetch(`${backendUrl}/blog/ai/edit-content`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blog_content: content,
                    tone: tone,
                    post_id: postId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to edit content');
            }

            return await response.json();
        } catch (error) {
            console.error('Error editing content:', error);
            throw error;
        }
    },

    /**
     * Generate engaging blog titles from content or topic
     * @param {string} blogContent - The blog content
     * @param {string} tone - The tone
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The generated titles
     */
    generateTitles: async (content, tone, postId) => {
        try {
            const response = await fetch(
                `${backendUrl}/blog/ai/generate-titles`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blog_content: content,
                        tone,
                        post_id: postId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to generate titles');
            }

            return await response.json();
        } catch (error) {
            console.error('Error generating titles:', error);
            throw error;
        }
    },

    /**
     * Expand blog content into fully developed paragraphs
     * @param {string} content - The blog content to expand
     * @param {string} tone - The desired tone
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The expanded content
     */
    expandBlogContent: async (content, tone, postId) => {
        try {
            const response = await fetch(
                `${backendUrl}/blog/ai/expand-blog-content`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blog_content: content,
                        tone,
                        post_id: postId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to expand blog content');
            }

            return await response.json();
        } catch (error) {
            console.error('Error expanding blog content:', error);
            throw error;
        }
    },

    /**
     * Suggest research directions to strengthen blog content
     * @param {string} content - The blog content
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The research directions
     */
    generateResearchDirections: async (content, postId) => {
        try {
            const response = await fetch(
                `${backendUrl}/blog/ai/generate-research-directions`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blog_content: content,
                        post_id: postId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to generate research directions');
            }

            return await response.json();
        } catch (error) {
            console.error('Error generating research directions:', error);
            throw error;
        }
    },

    /**
     * Adjust the tone of content to match your brand voice
     * @param {string} content - The content to adjust
     * @param {string} tone - The target tone
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The adjusted content
     */
    adjustTone: async (content, tone, postId) => {
        try {
            const response = await fetch(`${backendUrl}/blog/ai/adjust-tone`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blog_content: content,
                    tone: tone,
                    post_id: postId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to adjust tone');
            }

            return await response.json();
        } catch (error) {
            console.error('Error adjusting tone:', error);
            throw error;
        }
    },

    /**
     * Create compelling conclusions that summarize and drive action
     * @param {string} content - The blog content
     * @param {string} tone - The tone
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The generated conclusion
     */
    generateConclusion: async (content, tone, postId) => {
        try {
            const response = await fetch(
                `${backendUrl}/blog/ai/generate-conclusion`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blog_content: content,
                        tone,
                        post_id: postId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to generate conclusion');
            }

            return await response.json();
        } catch (error) {
            console.error('Error generating conclusion:', error);
            throw error;
        }
    },

    /**
     * Craft engaging introductions that hook readers immediately
     * @param {string} content - The blog content
     * @param {string} tone - The tone
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The generated introduction
     */
    generateIntroduction: async (content, tone, postId) => {
        try {
            const response = await fetch(
                `${backendUrl}/blog/ai/generate-introduction`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blog_content: content,
                        tone,
                        post_id: postId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to generate introduction');
            }

            return await response.json();
        } catch (error) {
            console.error('Error generating introduction:', error);
            throw error;
        }
    },

    /**
     * Create a complete publishing package with titles, summary, and tags
     * @param {string} blogContent - The blog content
     * @param {string} postId - The ID of the post to associate with this result
     * @returns {Promise<Object>} - The publishing package
     */
    preparePublishingPackage: async (content, tone, postId) => {
        try {
            const response = await fetch(
                `${backendUrl}/blog/ai/prepare-publishing-package`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blog_content: content,
                        tone,
                        post_id: postId,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to prepare publishing package');
            }

            return await response.json();
        } catch (error) {
            console.error('Error preparing publishing package:', error);
            throw error;
        }
    },

    /**
     * Get AI results for a specific blog post
     * @param {string} postId - The ID of the post to get results for
     * @returns {Promise<Object>} - The AI results
     */
    getAiResults: async (postId) => {
        try {
            const response = await fetch(
                `${backendUrl}/blog/posts/${postId}/ai-results`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch AI results');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching AI results:', error);
            throw error;
        }
    },
};

export default blogAiService;

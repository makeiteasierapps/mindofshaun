import { getBackendUrl } from '../utils/blogUtils';

const backendUrl = getBackendUrl();

/**
 * Service for interacting with the AI blog assistant endpoints
 */
const blogAiService = {
    /**
     * Organize unorganized thoughts into structured blog ideas
     * @param {string} rawThoughts - The raw thoughts to organize
     * @returns {Promise<Object>} - The organized thoughts
     */
    organizeThoughts: async (rawThoughts) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/organize-thoughts`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ raw_thoughts: rawThoughts }),
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
     * @returns {Promise<Object>} - The edited content suggestions
     */
    editContent: async (draftContent, tone) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/edit-content`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        draft_content: draftContent,
                        tone: tone,
                    }),
                }
            );

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
     * @param {string} topic - The blog topic
     * @returns {Promise<Object>} - The generated titles
     */
    generateTitles: async (blogContent, topic) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/generate-titles`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blog_content: blogContent,
                        topic: topic,
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
     * Expand brief points into fully developed paragraphs
     * @param {string} briefPoints - The brief points to expand
     * @param {string} desiredTone - The desired tone
     * @returns {Promise<Object>} - The expanded content
     */
    expandBriefPoints: async (briefPoints, desiredTone) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/expand-brief-points`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        brief_points: briefPoints,
                        desired_tone: desiredTone,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to expand brief points');
            }

            return await response.json();
        } catch (error) {
            console.error('Error expanding brief points:', error);
            throw error;
        }
    },

    /**
     * Suggest research directions to strengthen blog content
     * @param {string} blogTopic - The blog topic
     * @returns {Promise<Object>} - The research directions
     */
    generateResearchDirections: async (blogTopic) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/generate-research-directions`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blog_topic: blogTopic }),
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
     * @param {string} targetTone - The target tone
     * @returns {Promise<Object>} - The adjusted content
     */
    adjustTone: async (content, targetTone) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/adjust-tone`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: content,
                        target_tone: targetTone,
                    }),
                }
            );

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
     * @param {string} blogContent - The blog content
     * @returns {Promise<Object>} - The generated conclusion
     */
    generateConclusion: async (blogContent) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/generate-conclusion`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blog_content: blogContent }),
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
     * @returns {Promise<Object>} - The generated introduction
     */
    generateIntroduction: async (content, tone) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/generate-introduction`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content,
                        tone,
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
     * @returns {Promise<Object>} - The publishing package
     */
    preparePublishingPackage: async (blogContent) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/blog/ai/prepare-publishing-package`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blog_content: blogContent }),
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
};

export default blogAiService;

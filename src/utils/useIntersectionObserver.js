import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for detecting when an element is visible in the viewport
 * using the Intersection Observer API
 *
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - A number between 0 and 1 indicating the percentage of the element that needs to be visible
 * @param {string} options.root - The element that is used as the viewport for checking visibility
 * @param {string} options.rootMargin - Margin around the root element
 * @returns {Array} [ref, isVisible, entry] - ref to attach to the element, boolean indicating if element is visible, and the IntersectionObserverEntry
 */
const useIntersectionObserver = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [entry, setEntry] = useState(null);
    const ref = useRef(null);
    const observer = useRef(null);

    const { threshold = 0.1, root = null, rootMargin = '0px' } = options;

    useEffect(() => {
        // Disconnect previous observer if it exists
        if (observer.current) {
            observer.current.disconnect();
        }

        // Create a new observer
        observer.current = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                setEntry(entry);
            },
            { threshold, root, rootMargin }
        );

        // Observe the element if it exists
        const currentRef = ref.current;
        if (currentRef) {
            observer.current.observe(currentRef);
        }

        // Cleanup function
        return () => {
            if (observer.current && currentRef) {
                observer.current.unobserve(currentRef);
                observer.current.disconnect();
            }
        };
    }, [threshold, root, rootMargin]);

    return [ref, isVisible, entry];
};

export default useIntersectionObserver;

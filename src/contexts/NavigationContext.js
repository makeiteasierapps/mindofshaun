import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useRef,
} from 'react';
import useIntersectionObserver from '../utils/useIntersectionObserver';

const sections = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
];

const NavigationContext = createContext();

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error(
            'useNavigation must be used within a NavigationProvider'
        );
    }
    return context;
};

export const NavigationProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef(sections.map(() => null));

    // Create separate observer refs for each section using the custom hook
    const sectionObservers = sections.map((_, index) => {
        // Use a more generous threshold and rootMargin for better detection
        const [ref, isVisible] = useIntersectionObserver({
            threshold: [0.1, 0.2, 0.3, 0.4],
            rootMargin: '-10% 0px -70% 0px',
        });

        return { index, ref, isVisible };
    });

    // Effect to find DOM elements and set refs
    useEffect(() => {
        // Try to find all section elements
        sections.forEach((section, index) => {
            const element = document.getElementById(section.id);
            if (element && sectionObservers[index]) {
                // Manually set the ref's current value
                sectionObservers[index].ref.current = element;
                sectionRefs.current[index] = element;
            }
        });
    }, []);

    // Update active section when visibility changes
    useEffect(() => {
        const visibleSections = sectionObservers
            .filter((section) => section.isVisible)
            .map((section) => section.index);

        if (visibleSections.length > 0) {
            // Use the topmost visible section (lowest index)
            const topmostSectionIndex = Math.min(...visibleSections);
            setActiveSection(topmostSectionIndex);
        }
    }, [sectionObservers.map((section) => section.isVisible)]);

    // Handle manual section changes (e.g., from menu clicks)
    const handleSectionChange = (index) => {
        setActiveSection(index);

        // Scroll to the section
        const sectionElement = document.getElementById(sections[index].id);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Expose the sections, active section and setter
    const value = {
        sections,
        activeSection,
        setActiveSection: handleSectionChange,
    };

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import useIntersectionObserver from '../utils/useIntersectionObserver';

const ParallaxSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
    pointerEvents: 'auto',
    transition: 'transform 0.05s linear', // Smoother transitions
    scrollSnapAlign: 'start', // Ensure consistent scroll snap alignment
    scrollSnapStop: 'always', // Force stopping at this snap point
    height: '100vh', // Ensure full viewport height for proper snapping
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        height: 'auto', // Allow content to determine height on mobile
        minHeight: '100vh', // But ensure at least full viewport height
    },
}));

const ParallaxContainer = ({ children, speed = 0.5, ...props }) => {
    const [transform, setTransform] = useState('translate3d(0, 0, 0)');
    const requestRef = useRef();
    const previousScrollY = useRef(0);
    const containerRef = useRef(null);

    // Use our custom intersection observer hook with improved options
    const [ref, isVisible] = useIntersectionObserver({
        threshold: 0,
        rootMargin: '100px 0px 100px 0px', // Reduced margin for more precise detection
    });

    // Combine refs
    const setRefs = useCallback(
        (element) => {
            // Set the ref from useIntersectionObserver
            if (typeof ref === 'function') {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }

            // Set our local ref
            containerRef.current = element;
        },
        [ref]
    );

    // Throttle function to limit how often the transform is updated
    const throttle = (callback, delay) => {
        let lastCall = 0;
        return function (...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return callback(...args);
        };
    };

    // Find the closest parent with scrolling capability
    const getScrollParent = useCallback((element) => {
        if (!element) return document.documentElement;

        const style = getComputedStyle(element);
        const overflowY = style.overflowY;

        if (overflowY === 'auto' || overflowY === 'scroll') {
            return element;
        }

        return getScrollParent(element.parentElement);
    }, []);

    const updateTransform = useCallback(
        throttle(() => {
            if (!containerRef.current || !isVisible) return;

            const scrollParent = getScrollParent(containerRef.current);
            const scrollTop =
                scrollParent === document.documentElement
                    ? window.pageYOffset
                    : scrollParent.scrollTop;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate parallax offset based on element position relative to viewport
            const relativePosition = rect.top / windowHeight;
            const offset = relativePosition * speed * 100; // Scale the effect

            const newTransform = `translate3d(0, ${offset}px, 0)`;
            setTransform(newTransform);

            previousScrollY.current = scrollTop;
        }, 16), // ~60fps
        [speed, isVisible, getScrollParent]
    );

    // Set up scroll event listener on the appropriate scrolling parent
    useEffect(() => {
        if (!containerRef.current || !isVisible) return;

        const scrollParent = getScrollParent(containerRef.current);

        const handleScroll = () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            requestRef.current = requestAnimationFrame(updateTransform);
        };

        scrollParent.addEventListener('scroll', handleScroll, {
            passive: true,
        });
        window.addEventListener('resize', handleScroll, { passive: true });

        // Initial update
        handleScroll();

        return () => {
            scrollParent.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [updateTransform, isVisible, getScrollParent]);

    return (
        <ParallaxSection ref={setRefs} {...props} style={{ transform }}>
            {children}
        </ParallaxSection>
    );
};

export default ParallaxContainer;

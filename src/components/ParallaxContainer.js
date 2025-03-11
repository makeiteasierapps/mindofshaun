import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const ParallaxSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
    scrollSnapAlign: 'none',
    scrollSnapStop: 'none',
}));

const ParallaxContainer = ({ children, speed = 0.5, ...props }) => {
    const elementRef = React.useRef(null);
    const [transform, setTransform] = React.useState('translate3d(0, 0, 0)');
    const requestRef = React.useRef();

    const updateTransform = useCallback(() => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const elementVisible = rect.top <= windowHeight && rect.bottom >= 0;

        if (elementVisible) {
            const offset = rect.top * speed;
            const newTransform = `translate3d(0, ${offset}px, 0)`;
            setTransform(newTransform);
        }

        requestRef.current = requestAnimationFrame(updateTransform);
    }, [speed]);

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(updateTransform);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [updateTransform]);

    return (
        <ParallaxSection ref={elementRef} {...props} style={{ transform }}>
            {children}
        </ParallaxSection>
    );
};

export default ParallaxContainer;

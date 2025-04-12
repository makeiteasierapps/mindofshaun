// components/AnimatedSection.js
import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

export const AnimatedSection = ({ children, delay = 0 }) => {
    const ref = useRef();
    const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay }}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

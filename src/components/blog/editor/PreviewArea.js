import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { PreviewContainer } from '../styles/WritingEditor.styles';

const PreviewArea = ({ previewContent }) => {


    return (
        <>
            <Typography variant="subtitle1" gutterBottom color="text.primary">
                Preview
            </Typography>
            <PreviewContainer sx={{ backgroundColor: 'rgba(0, 12, 12, 0.5)' }}>
                {previewContent ? (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: previewContent.replace(/\n/g, '<br />'),
                        }}
                    />
                ) : (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: 'italic' }}
                    >
                        Send content to preview using the send button or by
                        selecting text.
                    </Typography>
                )}
            </PreviewContainer>
        </>
    );
};

PreviewArea.propTypes = {
    previewContent: PropTypes.string.isRequired,
};

export default PreviewArea;

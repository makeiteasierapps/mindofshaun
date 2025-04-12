import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const HomeContainer = styled(Box)`
    position: relative;
    z-index: 10;
    min-height: 100vh;
    display: flex;
    align-items: center;
`;

export const HeroImage = styled.img`
    width: 100%;
    max-width: 600px;
    height: auto;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 0 20px rgba(0, 200, 255, 0.4));
    animation: float 6s ease-in-out infinite;

    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-12px);
        }
        100% {
            transform: translateY(0px);
        }
    }
`;

export const CTAButtonContainer = styled(Box)`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
`;

export const CTAButton = styled.a`
    display: inline-block;
    margin-top: 1.5rem;
    padding: 12px 30px;
    border: 1px solid rgba(0, 255, 255, 0.4);
    border-radius: 8px;
    background: rgba(0, 178, 181, 0.15);
    color: #e5fcff;
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    backdrop-filter: blur(10px);
    transition: 0.3s all ease;
    min-width: 140px;
    text-align: center;

    &:hover {
        background: rgba(0, 178, 181, 0.4);
        transform: scale(1.05);
        box-shadow: 0 0 18px rgba(0, 255, 255, 0.4);
    }
`;

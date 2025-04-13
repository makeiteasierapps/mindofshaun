import { useState, useEffect } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from '@mui/icons-material/Article';
import EmailIcon from '@mui/icons-material/Email';
import { MenuContainer, Menu, NavMenuItem, MenuFab } from './NavMenu.styles';
import { useNavigation } from '../contexts/NavigationContext';

const NavMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { sections, activeSection, setActiveSection } = useNavigation();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        // Initial check
        checkScreenSize();

        // Add event listener
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const getIconForSection = (sectionId) => {
        switch (sectionId) {
            case 'home':
                return <HomeIcon fontSize="small" />;
            case 'about':
                return <PersonIcon fontSize="small" />;
            case 'projects':
                return <CodeIcon fontSize="small" />;
            case 'blog':
                return <ArticleIcon fontSize="small" />;
            case 'contact':
                return <EmailIcon fontSize="small" />;
            default:
                return null;
        }
    };

    const handleNavClick = (index) => {
        setActiveSection(index);
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <MenuContainer
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <MenuFab
                    size="small"
                    aria-label="Navigation menu"
                    onClick={handleMenuToggle}
                    rotate={isMenuOpen}
                >
                    <KeyboardArrowLeftIcon fontSize="small" />
                </MenuFab>

                <Menu className="nav-menu" open={isMenuOpen}>
                    {sections.map((section, index) => (
                        <NavMenuItem
                            key={index}
                            active={activeSection === index}
                            href={`#${section.id}`}
                            component="a"
                            onClick={() => handleNavClick(index)}
                            aria-label={section.name}
                        >
                            {isMobile
                                ? getIconForSection(section.id)
                                : section.name}
                        </NavMenuItem>
                    ))}
                </Menu>
            </MenuContainer>
        </>
    );
};

export default NavMenu;

import DataDash from '../EmailManagerAssest/datadash.png';
import EmailManagerLogo from '../EmailManagerAssest/email-manager-logo.jpeg';
import EmailForm from '../EmailManagerAssest/emailform.png';
import LoginScreen from '../EmailManagerAssest/login.png';
import ProfileScreen from '../EmailManagerAssest/profile.png';
import WelcomeScreen from '../EmailManagerAssest/welcome.png';
import ExtractedData from '../EmailManagerAssest/extractedData.png';

export const EmailManagerData = {
    images: [
        {
            image: EmailManagerLogo,
            description: `Email Manager is a full stack web app hosted serverless with Vercel. 
            The front end has been built with React and Material-UI while the back end has been done with Node.js. 
            The project started as an actual solution to a companies problem. 
            The handling of sending and tracking emails with automated follow ups based on elapsed time. 
            I then decided to have some fun and implement GPT-4 to automatically respond to email replies. 
            I have preloaded the AI with context about myself and the project so feel free to ask questions!`,
        },
        {
            image: LoginScreen,
            description:
                'User accounts are managed with Firebase and Firestore',
        },
        {
            image: WelcomeScreen,
            description: `The first screen shown upon login, gives an overview of the project.`,
        },
        {
            image: ProfileScreen,
            description: `An option to use your own credentials is provided. Keys are encrypted via symmetric encryption using
        Google Cloud KMS. Profile data is pulled from the respective oAuth option choosen by the user.`,
        },
        {
            image: EmailForm,
            description:
                'Simple form to send email with a predefined template or a custom one',
        },
        {
            image: ExtractedData,
            description: `Example of data extracted from a .csv and applied to the template. Templates dynamically update to show previews`,
        },
        {
            image: DataDash,
            description: `The Dashboard shows all emails that have been sent. 
            It also displays the interactions between the recipient of the email and the AI`,
        },
    ],
    clientTech: [
        { name: 'React'},
        { name: 'Material UI'},
    ],
    serverTech: [
        { name: 'Node.js'},
        { name: 'Mailgun'},
        { name: 'OpenAI'},
        { name: 'Firebase'},
    ],
    ProjectDetails: {
        font: 'BioRhyme',
        fontColor: '#00D1B5',
        title: 'Email Manager',
        description: `Full Stack Web App utilizing Mailgun to send
        emails and OpenAi to automatically respond.`,
        clientCode: 'https://github.com/makeiteasierapps/email-manager-ui',
        serverCode:
            'https://github.com/makeiteasierapps/email-manager/tree/main/node_version',
    },
};



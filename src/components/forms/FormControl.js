import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { ControlledOnBoardingFlow } from './ControlledOnBoardingFlow';
import HomeForm from './HomeForm'
import LoginForm from './LoginForm'
import { Alert, Container, Link, StepContent, StepLabel } from '@mui/material';
import ThemeForm from './ThemeForm';
import PartDetailsForm from './PartDetailsForm';
import TermsForm from './TermsForm';
import MenuForm from './MenuForm'
import IdentificationResultForm from './IdentificationResultForm';
import ListViewForm from './ListViewForm';
import CompanyForm from './CompanyForm';
import handleAppDateInputFromClient from '../../services/azureBlobController';
import runPiplineToDeployApp from '../../api/azurePipline';

// if u want to add new step, then add the name of it here, 
// and put the component as child of ControlledOnBoardingFlow.
// Order of the array must be like the children's order of ControlledOnBoardingFlow
const steps = ['Login ', 'Home', 'Theme', 'Terms', 'Menu', 'Result',
    'Part details', 'List view', 'App name'
];

export default function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [appName, setAppName] = React.useState('')

    //configuration file which is app template. this file will be upload on azure later!
    const [configData, setConfigData] = React.useState({
        "features": {
            "typePlate": false,
            "showThumbnailsInText": true,
            "skipPassword": false
        }
    })

    const getPartDetailsDataId = () => {
        return configData.partDetails.fields
    }

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = (key, value) => {
        //update configData, when children submits
        let updatedDate = configData
        updatedDate[key] = value
        setConfigData(updatedDate)
        console.log(updatedDate)
        //calculate what next as step
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handleSubmit = (appName, deployApp) => {

        // call azure controller with appName and config data
        handleAppDateInputFromClient(appName, configData)

        if (deployApp) {
            setAppName(appName)
            runPiplineToDeployApp(appName)
        }


        setActiveStep(totalSteps);

    }



    return (

        <Container maxWidth='sm' >
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step}>
                        <StepLabel
                            optional={
                                index === steps.length - 1 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step}
                        </StepLabel>
                        <StepContent>
                            <ControlledOnBoardingFlow currentIndex={activeStep}
                                handleNext={handleNext} handleBack={handleBack}
                                numSteps={steps.length}>
                                <LoginForm />
                                <HomeForm />
                                <ThemeForm />
                                <TermsForm />
                                <MenuForm />
                                <IdentificationResultForm />
                                <PartDetailsForm />
                                <ListViewForm getFields={getPartDetailsDataId} />
                                <CompanyForm handler={handleSubmit} />
                            </ControlledOnBoardingFlow>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Alert severity='success'>All steps completed - Your request is processing now!</Alert>
                    {appName && (<Alert severity='info'>
                        Your URL is &nbsp;&nbsp;&nbsp;
                        <Link href={process.env.REACT_APP_CUSTOMER_URL + appName} underline="none">
                            {process.env.REACT_APP_CUSTOMER_URL + appName}
                        </Link></Alert>)
                    }
                    <Typography></Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Container>


    );
}

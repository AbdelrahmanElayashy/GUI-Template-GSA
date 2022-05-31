# Overview

App Customizer is GUI interface to create new app for new customer faster and simpler. Within it, you can add text/image service or new template


# Platform and Tools
Azure Devops- Repo, Build Pipline, Artifacts for packages

# Perquisites for development
IDE(vs code), git, npm

# Getting Started

1. Clone repo
2. run commands in Terminal
```
npm install
npm start

```
>Note: you should in path where package.json is located

# How is the process development for new changes in GSA website?

![process dev](https://appcustomizer.blob.core.windows.net/readme/processdevlopmentChanges.png)

# How is the new template created?

![Overview](https://appcustomizer.blob.core.windows.net/readme/overview.png)

1. The inputs from the user will be captured by the components where they are located under components/forms in src. for example src/components/forms/LoginForm.js. Each file has apart of configuration file which is stored inside it as form. for example in LoginForm.js will find the part fo config file as 
```
    //Form
    const [state, handleState, setValue] = useForm({
        image: '',
        supergraphic: '',
        password: '',
        loginButton: {
            width: '100',
            backgroundColor: '#1976d2',
            color: '#FFFFFF'
        }
    })
```
> please make sure that when you create new form that you do the same but of course with the new parameters!

After user submits the form: this function will be called:
```
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isValid()) return

        props.handleNext(FormName, processStateInput())

    };
```
>Inside it, function **isValid()** will valid user input, then **processStateInput()** will be called to process the input from user and return the config data. At the end **props.handleNext()** will be called to pass the formName and part of config data to FormControl.js

2. src/components/forms/FormControl.js will iterate over all forms to get all the parts of config data.

3. After FormControl.js has the big config data, it will send it to services/azureBlobController.js to process it for example to change paths.

4. azureBlobController.js will call api/ to send the data to azure.

# How to add new Form?
1. implement the new form under components/forms. Use the master template this one->
```
import { useState } from 'react'
import '../../style/App.css';
import loginHelp from '../../assets/help/home.png'
import { Modal, TextField, Typography, Grid, Button, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/styles';
import { useForm } from '../../hooks/useForm';
import { FormControlLabel, Switch } from '@material-ui/core';


export default function HomeForm(props) {

    const FormName = 'INSERT YOUR FORM NAME HERE! AS IN CONFIG FILE'

    //Handle Modal Show
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //validations
    
    //Form
    const [state, handleState, setValue] = useForm({})


    const isValid = () => {
    


        return true
    }

    //process state input before submit 
    const processStateInput = () => {
        let processedInput = state
		
        return processedInput
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isValid()) return

        props.handleNext(FormName, processStateInput())

    };

    return (
        <form onSubmit={handleSubmit}>
           
            <Box sx={{ mb: 2, mt: 6 }}>
                <div>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: 1, mr: 1 }}
                    >
                        {props.currentIndex === props.numSteps - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button sx={{ mt: 1, mr: 1 }} onClick={handleOpen}>Help</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <img src={loginHelp} className="img-fluid" />
                        </Box>
                    </Modal>
                    <Button
                        disabled={props.currentIndex === 0}
                        onClick={props.handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button>

                </div>
            </Box>
        </form>

    );
}

```
2. go to FormControl.js and add the name of your form inside this array but before AppName. AppName is always the last step!.
```
const steps = ['Login ', 'Home', 'Theme', 'Terms', 'Menu', 'Result',
    'Part details', 'List view', 'App name'
];
```
3. In FormControl.js : add your new component inside this:
             
```
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


```
>please make sure of where your form in steps(array) is located and according to it, put component in right place inside **ControlledOnBoardingFlow**
**ListViewForm get data from PartDetailsForm: So Don't change the order of these two!
** Last step is always CompanyForm, please insert your form before CompanyForm!

# How Text/Image services are implemented?
1. under src/component/admin, you will find the text/image services there. User will give the valid app name 
2. then user chooses the service that he wants after that the input will be captured, then azure function will be triggered to create service
3. There are there 3 services you will find it under azure function(**gsa-webapp-pipline**)
*text-service to create text search for customer
*image-service to create image search for customer
*pipline to trigger GSA web app to deploy app for customer.

# How to implement new Service?
1. implement your new service in a new Function under (**gsa-webapp-pipline**). Don't overwrite the old functions!!
2. implement interface with this function under src/api


# Problem with app?


## Uploading new Template Problem
* Check if connection strings in .env are still valid.

## Adding Text Service Problem
* Go to Function App in azure, then go to **gsa-webapp-pipline**, check if **text-service** is enabled
* check if connection strings in Configuration are still valid.

## Adding Image Service Problem
* Go to Function App in azure, then go to **gsa-webapp-pipline**, check if **image-service** is enabled
* check if connection strings in Configuration are still valid.

## Running pipline Problem
* Go to Function App in azure, then go to **gsa-webapp-pipline**, check if **runPipline** is enabled
* check if connection strings in Configuration are still valid.


# Useful VS Code Extensions
* Prettier - Code formatter
* Debugger for Chrome

import React from 'react'
import CheckAppNameForm from '../checkAppName/CheckAppNameForm'
import GsaSearchForm from '../textSearch/TextSearchForm'
import ImageSearchForm from '../imageSearch/ImageSearchForm'
import PiplineIDForm from '../piplineID/PiplineIDForm'
import SwitchService from './SwitchService'

export class AdminController extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            appName: '',
            validAppName: false,
            currentComponent: 'CheckAppNameForm'
        }
    }

    resetCurrentComponent = () => {
        this.setState((prevState) =>
        ({
            ...prevState,
            validAppName: false,
            currentComponent: 'CheckAppNameForm'
        }));
    }

    updateValidAppName = (bool) => {
        this.setState((prevState) =>
        ({
            ...prevState,
            validAppName: bool
        }));
    }

    updateCurrentComponent = (ComponentName) => {
        this.setState((prevState) =>
        ({
            ...prevState,
            currentComponent: ComponentName
        }));
    }

    handleChangeAppName = (name) => {
        this.setState((prevState) =>
        ({
            ...prevState,
            appName: name
        })
        )
    }


    render() {



        return <>

            {
                this.state.currentComponent === 'CheckAppNameForm' &&
                <CheckAppNameForm handleChangeAppName={this.handleChangeAppName}
                    updateCurrentComponent={this.updateCurrentComponent}
                    updateValidAppName={this.updateValidAppName} />

            }
            {/* add button in switch service to navigate to your component, and add the new component below! */}
            {this.state.validAppName &&
                this.state.currentComponent === 'CheckAppNameForm' &&
                <SwitchService updateCurrentComponent={this.updateCurrentComponent} />}

            {this.state.validAppName &&
                this.state.currentComponent === 'TextSearchForm' &&
                <GsaSearchForm handleChangeAppName={this.handleChangeAppName}
                    resetCurrentComponent={this.resetCurrentComponent}
                    appName={this.state.appName}
                />

            }

            {this.state.validAppName &&
                this.state.currentComponent === 'ImageSearchForm' &&
                <ImageSearchForm handleChangeAppName={this.handleChangeAppName}
                    resetCurrentComponent={this.resetCurrentComponent}
                    appName={this.state.appName} />

            }

            {this.state.validAppName &&
                this.state.currentComponent === 'PiplineIDForm' &&
                <PiplineIDForm handleChangeAppName={this.handleChangeAppName}
                    resetCurrentComponent={this.resetCurrentComponent}
                    appName={this.state.appName} />

            }


        </>
    }
}
import React from "react";

export const ControlledOnBoardingFlow = ({ children, currentIndex, handleNext, handleBack, numSteps }) => {

    const LengthStep = children.length
    const currentChild = React.Children.toArray(children)[currentIndex]
    if (React.isValidElement(currentChild)) {
        return React.cloneElement(currentChild, { handleNext, handleBack, currentIndex, numSteps })
    }
    else {
        return <></>
    }

};
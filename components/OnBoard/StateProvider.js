import React, { createContext, useState, useContext } from 'react';

const initialOnBoardingData = {
    type: '', // investor or operator
    investor: {
        need: '',
        needErrorObj: {
            messageType: '',
            message: ''
        },
        investmentAmountMin: '',
        investmentAmountMinErrorObj: {
            messageType: '',
            message: ''
        },
        investmentAmountMax: '',
        investmentAmountMaxErrorObj: {
            messageType: '',
            message: ''
        },
        investmentCategory: '',
        investmentCategoryErrorObj: {
            messageType: '',
            message: ''
        },
        preferredLocation: '',
        preferredLocationErrorObj: {
            messageType: '',
            message: ''
        },
        investmentType: '',
        investmentTypeErrorObj: {
            messageType: '',
            message: ''
        },
        investmentTimeframe: '',
        investmentTimeframeErrorObj: {
            messageType: '',
            message: ''
        },
        idealOperatorDescription: '',
        idealOperatorDescriptionErrorObj: {
            messageType: '',
            message: ''
        },
        socialMediaLinks: {
            facebook: '',
            linkedin: '',
            website: ''
        },
        investmentSelected: false,
        categorySelected: false,
        timeframeSelected: false
    },
    operator: {
        need: '',
        needErrorObj: {
            messageType: '',
            message: ''
        },
        capitalAmountMin: '',
        capitalAmountMinErrorObj: {
            messageType: '',
            message: ''
        },
        capitalAmountMax: '',
        capitalAmountMaxErrorObj: {
            messageType: '',
            message: ''
        },
        operatingCategory: '',
        operatingCategoryErrorObj: {
            messageType: '',
            message: ''
        },
        preferredLocation: '',
        preferredLocationErrorObj: {
            messageType: '',
            message: ''
        },
        investmentType: '',
        investmentTypeErrorObj: {
            messageType: '',
            message: ''
        },
        timeframe: '',
        timeframeErrorObj: {
            messageType: '',
            message: ''
        },
        idealInvestorDescription: '',
        idealInvestorDescriptionErrorObj: {
            messageType: '',
            message: ''
        },
        socialMediaLinks: {
            facebook: '',
            linkedin: '',
            website: '',
        },
        capitalSelected: false,
        categorySelected: false,
        timeframeSelected: false
    },
    step: 1,
    user: {},
    firstNameErrorObj: {
        messageType: '',
        message: ''
    },
    lastNameErrorObj: {
        messageType: '',
        message: ''
    }
}

export const OnBoardContext = createContext({
    ...initialOnBoardingData,
    updateInvestorState: () => {},
    updateOperatorState: () => {},
    updateOnBoardState: () => {}
})

export const OnBoardContextProvider = props => {
    const [state, setState] = useState(initialOnBoardingData);

    const updateInvestorState = newObj => {
        setState({
            ...state,
            investor: {
                ...state.investor,
                ...newObj
            }
        });
    }

    const updateOperatorState = newObj => {
        setState({
            ...state,
            operator: {
                ...state.operator,
                ...newObj
            }
        });
    }

    const updateOnBoardState = newObj => {
        setState({
            ...state,
            ...newObj
        });
    }

    const updateStateFunctions = {
        updateInvestorState,
        updateOperatorState,
        updateOnBoardState
    }

    return (
        <OnBoardContext.Provider value={{ ...state, ...updateStateFunctions }}>
            {props.children}
        </OnBoardContext.Provider>
    )
}

export const useInvestorState = () => {
    const state = useContext(OnBoardContext);

    return [state.investor, state.updateInvestorState];
}

export const useOperatorState = () => {
    const state = useContext(OnBoardContext);

    return [state.operator, state.updateOperatorState];
}

export const useOnBoardState = () => {
    const state = useContext(OnBoardContext);

    return [state, state.updateOnBoardState];
}

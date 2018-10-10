import * as newFormReducer from '../../redux/reducers/formReducer'
import reducer from '../../redux/reducers/formReducer'


const initialState = {
    patientName: '',
    patientPhone: '',
    patientAddress: '',
    patientLatitude: '',
    patientLongitude: '',
    patientAge: '',
    patientFamPlan: '',
    patientHIV: '',
    patientParity: '',
    patientDueDate: 'MockDate',
    patientAssignedHW: '',
    hcwName: '',
    hcwPhone: '',
    hcwAddress: '',
    hcwOutpost: '',
    hcwEmail: '',
    hcwLatitude: '',
    hcwLongitude: '',
    outpostName: '',
    outpostAddress: '',
    outpostLatitude: '',
    outpostLongitude: '',
    openModal: false,
    toggleMask: false,
    toggleGeocoder: false,
    patientAddressSelector: false,
    hcwAddressSelector: false,
    outpostAddressSelector: false,
}

let patientInputEvent = {
    target: {
        value: 'Forest'
    }
}

const latitude = 12.000000
const longitude = 11.00000

// Return a fixed timestamp as a mock for call to moment
jest.mock('moment', () => () => ('MockDate'));




describe('Form Reducer', () => {
    it('returns the initial state', () => {
        expect (reducer(undefined, {})).toEqual({
            ...initialState
        })
    })
})

describe('Input coordinates function', () => {
    it('Returns the expected value of the patient input coordinates to be truthy', () => {
        expect(newFormReducer.handlePTInputCoordinates(latitude, longitude)).toBeTruthy()
    })
    it ('Returns the correct action', () =>{
        expect(newFormReducer.handlePTInputCoordinates(latitude, longitude)).toEqual(
            {
                type: 'PT_INPUT_COORDINATES',
                payload: {
                    latitude,
                    longitude
                }
            }
        )
    })
})

describe('Input patient name', () => {
    it('Returns the patient name as the payload', () => {
        expect(newFormReducer.handlePTInputName(patientInputEvent).payload).toContain('Forest')
    })
    it('Returns the action object', () => {
        expect(newFormReducer.handlePTInputName(patientInputEvent)).toEqual(
            {
                type: 'PT_NAME_INPUT',
                payload: 'Forest'
            }
        )
    })
})


// 

describe('Input patient phone', () => {
    let event = {
        target: {
            value: 18312247565
        }
    }
    it('Returns the patient phone as the payload', () => {
        expect(newFormReducer.handlePTInputPhone(event).payload)
        .toBe(18312247565)
    })
    it('Returns the action object', () => {
        expect(newFormReducer.handlePTInputPhone(event)).toEqual(
            {
                type: 'PT_PHONE_INPUT',
                payload: 18312247565
            }
        )
    })
})

describe('Input patient address', () => {
    let event = {
        target: {
            value: 'duplicate.publications.workmanlike'
        }
    }
    it('Returns the patient three word address as payload', () => {
        expect(newFormReducer.handlePTInputAddress(event).payload)
        .toBe('duplicate.publications.workmanlike')
    })
    it('Returns action object', () => {
        expect(newFormReducer.handlePTInputAddress(event)).toEqual (
            {
                type: 'PT_ADDRESS_INPUT',
                payload: 'duplicate.publications.workmanlike'
            }
        )
    })
})

describe('Input coordinates function', () => {
    it('Returns the expected value of the healthworker input coordinates to be truthy', () => {
        expect(newFormReducer.handleHWInputCoordinates(latitude, longitude)).toBeTruthy()
    })
    it ('Returns the correct action', () =>{
        expect(newFormReducer.handleHWInputCoordinates(latitude, longitude)).toEqual(
            {
                type: 'HW_INPUT_COORDINATES',
                payload: {
                    latitude,
                    longitude
                }
            }
        )
    })
})
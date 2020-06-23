import {
    networkCallWithApisauceWithoutAccessToken,
    getUserDisplayableErrorMessage
 } from './APIUtils'
 
 describe('APIUtils Test cases', () => {
    
    it('should test getUserDisplayableErrorMessage empty error', () => {
       //console.log(getUserDisplayableErrorMessage())
 
       expect(getUserDisplayableErrorMessage()).toBe(
          "We're having some trouble completing your request. Please try again."
       )
    })
 
    it('should test getUserDisplayableErrorMessage with error request times out', async () => {
       const error = JSON.stringify({
          data: {
             message: 'Endpoint request timed out',
             response: null
          }
       })
       expect(getUserDisplayableErrorMessage(error)).toBe(
          "We're having some trouble completing your request. Please try again."
       )
    })
 
    it('should test getUserDisplayableErrorMessage with parsed error undefined', async () => {
       const error = JSON.stringify({})
       expect(getUserDisplayableErrorMessage(error)).toBe(
          "We're having some trouble completing your request. Please try again."
       )
    })
 
    it('should test getUserDisplayableErrorMessage with error description', async () => {
       const error = JSON.stringify({
          data: {
             message: 'Endpoint request timed out',
             response: {
                title: { errorTitle: 'Response Error' },
                description: {
                   errorDescription: 'not found'
                }
             }
          }
       })
       expect(getUserDisplayableErrorMessage(error)).toStrictEqual({
          description: {
             errorDescription: 'not found'
          },
          title: {
             errorTitle: 'Response Error'
          }
       })
    })
    it('should test getUserDisplayableErrorMessage with error http status code', async () => {
       const error = JSON.stringify({
          data: {
             http_status_code: 503
          }
       })
       expect(getUserDisplayableErrorMessage(error)).toStrictEqual(
          'Please check your internet connection'
       )
    })
    it('should test getUserDisplayableErrorMessage with error Response', async () => {
       const error = JSON.stringify({
          data: {
             message: 'Endpoint request timed out',
             response: JSON.stringify({
                title: 'Response Error',
                description: 'not found'
             })
          }
       })
       expect(getUserDisplayableErrorMessage(error)).toStrictEqual('not found')
    })
 })
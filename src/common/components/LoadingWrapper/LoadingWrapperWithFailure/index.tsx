import React from 'react'
import { observer } from 'mobx-react'

import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'

// import { getUserDisplayableErrorMessage } from '../../../utils/APIUtils'

import LoadingView from './LoadingView'
import FailureView from './FailureView'

type loadingWrapperWithFailureProps={
   apiStatus:Number
   renderSuccessUI:any
   onRetryClick:()=>void
   apiError:null|string
}

@observer
class LoadingWrapperWithFailure extends React.Component<loadingWrapperWithFailureProps> {
   render() {
      const {
         apiStatus,
         renderSuccessUI: RenderSuccessUI,
         onRetryClick,
         apiError
      } = this.props
      //const errorMessage = getUserDisplayableErrorMessage(apiError)
      const errorMessage="Network Error"

      switch (apiStatus) {
         case API_FETCHING:
            return <LoadingView />
         case API_SUCCESS:
            return <RenderSuccessUI />
         case API_FAILED:
            return (
               <FailureView
                  onRetryClick={onRetryClick}
                  errorMessage={errorMessage}
               />
            )
         default:
            return null
      }
   }
}

export default LoadingWrapperWithFailure

import React from 'react'
import { PrimaryButton } from '../../common/components/PrimaryButton/index.js'
import { SecondaryButton } from '../../common/components/SecondaryButton/index.js'
import { Input } from '../../common/components/Input/index.js'
import { Image } from '../../common/components/Image/index.js'
import LoadingWrapperWithFailure from '../../common/components/LoadingWrapper/LoadingWrapperWithFailure/index.js'
import NoDataView from '../../common/components/LoadingWrapper/NoDataView/index.js'
import { DesktopHeader } from '../../common/components/DesktopHeader/index.js'
import { ObservationCell } from '../../common/components/ObservationCell/index.js'
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants'
import LogInRoute from '../../Reporting_Portal/Authentication/route/LogInRoute/LogInRoute.js'
import SignUpRoute from '../../Reporting_Portal/Authentication/route/SignUpRoute/SignUpRoute.js'

function Page1() {
   return (
      <div>
         <LogInRoute />
         <SignUpRoute />
      </div>
   )
}

export default Page1
// <h1>Page 1</h1>
//                 <PrimaryButton>Submit</PrimaryButton>
//                 <SecondaryButton>Reset</SecondaryButton>
//                 <Image src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/16939af5-b23f-4244-8bc7-36e1f72013e8.svg'/>
//                 <Input value='vamsi'/>
//                 <Select options={['milk','bread']}/>
//                 <DesktopHeader/>
//                 <ObservationCell/>

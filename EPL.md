Reporting Potral
    Authentication
        Components
            SignIn
                index.js(Import and Export)
                SignIn.js(Presentational Component)
                    =>componentDidMount(for focus(ref))
            SignUp
                index.js(Import and Export)
                SignUp.js(Presentational Component)
                    =>componentDidMount(for focus(ref))
        Route
            SignInRoute
                index.js(import and export)
                SignInRoute.js
                    observable userName
                    observable password
                    
                    =>onChangeUserName
                    =>onChangePassword
                    =>onClickLogIn
            SignUpRoute
                index.js(import and export)
                SignUpRoute.js
                    observable userName
                    observable password
                    observable confirmPassword
                    
                    =>onChangeUserName
                    =>onChangePassword
                    =>onChangeComfirmPassword
        Stores
            AuthStore
                index.js
                    observable getUserSignInAPIStatus
                    observable getUserSignInAPIError
                    observable authAPIService
                    
                    =>userSignIn
                    =>setUserSignInAPIResponse
                    =>setUserSignInAPIError
                    =>setUserSignInAPIStatus
                    =>userSignOut
        Services
            AuthService
                index.js
            endPoint.js
        utils
            APIUtils.js
            StorageUtils.js
        constants
            routeConstants
                RouteConstants.js(SignIn and SignUp route paths)
        fixtures
            getUserSignInResponse.json
            getUserSignUpResponse.json
    User
        components
            userHeader
                index.js
                    =>onClickProfile
            ListOfUserObservations
                index.js
                    =>onChangeReportDataAndTimeFilter
                    =>onChangeDueData
                    =>onClickAddNewObservation
                    =>renderListOfObservations
            EachObservation
                index.js
                    =>onClickMessage
            observationReportedPage
                index.js
                    observable titleOfObservation
                    observable cateogaryState
                    observable subCateogaryState
                    observable severityState
                    observable descriptionValue
                    observable uploadedFile=[]
                    
                    =>onChangeTitleOfObservation
                    =>onChangeCateogary
                    =>onChangeSubCateogary
                    =>severity
                    =>description
                    =>onUploadFiles
                    =>onSubmit
        stores   
            userStore
                index.js
                    observable getObservationListAPIStatus
                    observable getObservationListAPIError
                    observable observationListAPIService
                    observable observationList
                    observable reportedOn
                    observable dueDate
                    
                    =>getObservationList
                    =>setObservationListAPIResponse
                    =>setObservationListAPIError
                    =>setObservationListAPIStatus
                    =>onChangeReportedOn
                    =>onChangeDueDate
                    
                    computed filteredObservationsList
            models
                userModel
                    index.js
                        =>constructor
    Rp
        components
            userHeader
                index.js
                    =>onClickProfile
            ListOfUserObservations
                index.js
                    =>onChangeReportDataAndTimeFilter
                    =>onChangeDueData
                    =>renderListOfObservations
            EachObservation
                index.js
                    =>onClickMessage
                    =>onClickObservation
            observationReportedPage
                index.js
                    observable titleOfObservation
                    observable cateogaryState
                    observable subCateogaryState
                    observable severityState
                    observable descriptionValue
                    observable uploadedFile=[]
                    
                    =>onChangeTitleOfObservation
                    =>onChangeCateogary
                    =>onChangeSubCateogary
                    =>severity
                    =>description
                    =>onUploadFiles
                    =>onSubmit
            
            
                        
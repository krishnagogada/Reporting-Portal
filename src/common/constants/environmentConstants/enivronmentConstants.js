const envVariables = process.env
const Config = {}

Object.keys(envVariables).forEach(variable => {
    if(variable.include('REACT_APP')){
        const envKey = variable.replace('REACT_APP_','LogIn_')
        Config[envKey] = envVariables[variable]
    }
});

export default Config
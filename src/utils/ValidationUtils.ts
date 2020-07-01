export function ValidateUsername(EnteredValue:string){
    const regx='^[a-z0-9_-]{3,16}$'
    if(EnteredValue.length===0){
        return {
            errorMessage:'Required',
            showError:true
        }
    }
    else if(EnteredValue.search(regx) === -1){
        return {
            errorMessage:'Enter Invalid Input',
            showError:true
        }
    }
    return {
        errorMessage:'',
        showError:false
    }
} 

export function ValidatePassword(EnteredValue:string){
    const regx='^[a-z0-9_-]{3,16}$'
    if(EnteredValue.length===0){
        return {
            errorMessage:'Required',
            showError:true
        }
    }
    else if(EnteredValue.search(regx) === -1){
        return {
            errorMessage:'Enter Invalid Input',
            showError:true
        }
    }
    return {
        errorMessage:'',
        showError:false
    }
} 
//   Form error handling

export const onChangeError = (name, value, form, error, setError) => {
    let keyObject = {}
    if(typeof(error[name]) === "object" ){
      keyObject[name] = {...error[name], text: ""}
    }
    else{
      if(name === "confirmPassword" && form.password !== value){
        keyObject = {...keyObject, [name] : "Password do not match"}
      }  
      else {
        keyObject[name] = ""
      }
    }
    setError({...error, ...keyObject})
}
  
  
   export const onSubmitError = (form, error, setError) => {
    let keyObject = {}
    let isError = false
  
    for (const key in form) {
      if (form.hasOwnProperty.call(form, key)) {
  
        if(typeof(error[key]) === "object" ){
          if (key === "images"){
            let isObjError = false

            if(error[key].min > form[key].length){
              isObjError = true
              keyObject[key] = {...error[key], text: `There must be at least ${error[key].min} image(s)`}
            }
            isError=isObjError
          }
        }
  
        else {
          if(typeof(form[key]) === "object" ){
            if(key === "phoneNumber" && !form[key].phone ){
              keyObject[key] = "This field must not be empty"
              isError = true
            }
          }

          else if(form[key] === "" && (typeof(error[key]) === "string") ){
            keyObject[key] = "This field must not be empty"
            isError = true
          }
          
          else if(error[key] ){
            isError = true
          }
        }
        
        
      }
    }
    setError({...error, ...keyObject})
    return isError
  }
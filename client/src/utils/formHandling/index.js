//   Form error handling

export const onChangeError = (name, value, form, error) => {
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
    return {...error, ...keyObject}
}
  
  
export const onSubmitError = (form, error, errorKeysInOrder, setActivateRef) => {
    let keyObject = {}
    let isError = false
  
    for (const key in form) {
      if (form.hasOwnProperty.call(form, key)) {
  
        if(typeof(error[key]) === "object" ){
          let isObjError = false

          if(error[key].min > form[key].length){
            isObjError = true
            keyObject[key] = {...error[key], text: `There must be at least ${error[key].min} image(s)`}
          }
          isError=isObjError
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
    for (let index = 0; index < errorKeysInOrder.length; index++) {
      const key = errorKeysInOrder[index];
      if(keyObject[key]){
        setActivateRef(key)
        break
      }
    }
    return {isError, errorObject: {...error, ...keyObject}}
}
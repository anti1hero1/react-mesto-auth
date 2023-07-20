import React from "react";

function useFormValidation() {
  const [isInputValid, setInputValid] = React.useState({})
  const [values, setValues] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [isValid, setValid] = React.useState(false)

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    const validationMessage = e.target.validationMessage
    const valid = e.target.validity.valid
    const form = e.target.form

    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage }
    })

    setInputValid((oldInputValid) => {
      return { ...oldInputValid, [name]: valid }
    })

    setValid(form.checkValidity())
  }

  function reset(data = {}) {
    setValues(data)
    setErrors({})
    setInputValid({})
    setValid(false)
  }

  const setValue = React.useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
  }, [])

  return { setValue, reset, values, errors, isValid, isInputValid, handleChange }
}

export default useFormValidation
export const FormValidate = (inputs) => {
  const inputsArray = Array.from(inputs);

  const validate = inputsArray.every(input => input.value.trim() !== "");
  return validate;
}


export const ValidatePassword = (data) => {
  const { password, confirmPassword } = data;
  return password === confirmPassword;
}
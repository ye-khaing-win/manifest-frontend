const useForm = (formGroups) => {
  let inputs = [];

  formGroups.forEach((formGroup) => {
    formGroup.inputs.forEach((input) => {
      if (!input.isSeparator) inputs.push(input);
    });
  });

  let isFormValid = false;
  inputs.forEach((input) => {
    isFormValid = isFormValid && input.isValid;
  });

  return { inputs };
};

export default useForm;

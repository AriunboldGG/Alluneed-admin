// named import
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

const useFormHook = (schema, defaultValues) => {
  const methods = useForm({
    // resolver: yupResolver(schema),
    defaultValues,
    mode: 'onChange',
  });
  const { reset, watch, setValue, control, handleSubmit, formState } = methods;
  const values = watch();

  return {
    form: {
      Controller,
      methods,
      values,
      reset,
      watch,
      setValue,
      control,
      handleSubmit,
      formState,
    },
  };
};
export default useFormHook;

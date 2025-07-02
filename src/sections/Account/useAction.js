// react
import { useEffect, useState, useCallback } from 'react';
// default import
import useForm from 'src/hooks/useForm';
import { defaultValues, passwordSchema, userUpdateSchema } from './schema';
// section
// import { userUpdateSchema, defaultValues, passwordSchema } from './schema';

export default function useActionAccount({
  dialogActionType,
  user,
  changeDialogStatus,
}) {
  const { form } = useForm(userUpdateSchema(), defaultValues, passwordSchema());
  const [dialogFormVisible, setDialogFormVisible] = useState(false);
  const [dialogLoader, setDialogLoader] = useState(false);

  useEffect(() => {
    if (dialogActionType === 'update') {
      return setDialogFormVisible(true);
    }
    if (dialogFormVisible) handleClose();
  }, [dialogActionType]);

  useEffect(() => {
    if (dialogActionType === 'update') {
      setDialogLoader(true);
      form.reset({
        ...user,
        id: user?.id,
      });
      setTimeout(() => {
        setDialogLoader(false);
      }, 1000);
    }
  }, [dialogActionType]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        form.setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [form.setValue]
  );

  const handleClose = () => {
    setDialogFormVisible(false);
    changeDialogStatus('');
    form.reset(defaultValues);
  };

  return {
    form,
    actionState: {
      dialogLoader,
      dialogFormVisible,
    },
    actionFunction: {
      handleDrop,
      handleClose,
    },
  };
}

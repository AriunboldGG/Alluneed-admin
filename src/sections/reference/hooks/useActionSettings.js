// react
import { useEffect, useState, useCallback } from 'react';
// default import
import useForm from 'src/hooks/useForm';
// section
import { SettingsSchema, settingsDefaultValues } from 'src/sections/reference/utils/schema';

const useActionSettings = (dialogActionType, row, changeDialogStatus) => {
    const { form } = useForm(SettingsSchema, settingsDefaultValues());
    const [dialogFormVisible, setDialogFormVisible] = useState(false);
    const [dialogLoader, setDialogLoader] = useState(false);

    useEffect(() => {
        if (dialogActionType === 'create' || dialogActionType === 'update') {
            return setDialogFormVisible(true);
        }
        if (dialogFormVisible) handleClose();
    }, [dialogActionType, row]);

    useEffect(() => {
        if (dialogActionType === 'update') {
            setDialogLoader(true);
            form.reset({
                ...row,
            });
            setTimeout(() => {
                setDialogLoader(false);
            }, 1000);
        }
    }, [dialogActionType]);

    const handleClose = () => {
        setDialogFormVisible(false);
        changeDialogStatus('');
        form.reset(settingsDefaultValues);
    };

    return {
        form,
        actionState: {
            dialogLoader,
            dialogFormVisible,
        },
        actionFunction: {
            handleClose,
        },
    };
};
export default useActionSettings;

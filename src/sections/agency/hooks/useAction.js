// react
import { useCallback, useEffect, useState } from 'react';
// default import
import useForm from 'src/hooks/useForm';
// section
import { OrganizationCreateSchema, OrganizationUpdateSchema, defaultValues } from 'src/sections/campaigns/utils/schema';

const useAction = (dialogActionType, row, changeDialogStatus) => {
    const { form } = useForm(OrganizationCreateSchema(dialogActionType), defaultValues, OrganizationUpdateSchema(dialogActionType));
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
                id: row?.id,
                roleId: row?.userRole?.id,
                aimagNiislelCode: 'Увс',
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
};
export default useAction;

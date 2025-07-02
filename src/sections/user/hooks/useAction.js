// react
import { useEffect, useState, useCallback } from 'react';
// default import
import useForm from 'src/hooks/useForm';
// section
import {
  UserCreateSchema,
  UserUpdateSchema,
  defaultValues,
} from 'src/sections/user/utils/schema';

const useAction = (dialogActionType, row, changeDialogStatus, id) => {
  const { form } = useForm(
    UserCreateSchema(dialogActionType, id),
    defaultValues
    // UserUpdateSchema()
  );
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
        roleId: Number(row.role?.role_id),
        phoneNumber: row.phone_number || '',
        prole: Number(row?.prole?.reference_id) || '',
        image:
          row?.photo?.file_name ||
          row?.photo1?.file_name ||
          row?.photo2?.file_name,

        audienceInterests: row?.audience_interests || '',
        averageLikes: row?.average_likes || '',
        averageComments: row?.average_comments || '',
        avgReelPlays: row?.avg_reel_plays || '',
        avgViews: row?.avg_views || '',
        engagementRate: row?.engagement_rate || '',
        genderSplit: row?.gender_split || '',
        igName: row?.influencer_ig_name || '',
        popularPosts: row?.popular_posts || '',
        totalPosts: row?.total_posts || '',
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

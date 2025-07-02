import { useEffect, useState } from 'react';
// mui
import { Button, Stack, MenuItem, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// named import
import { useSnackbar } from 'notistack';
// default import
import PropTypes from 'prop-types';
import useSWRMutation from 'swr/mutation';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
// components
import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
// section
import { fileFormat } from './utils/func';
import useAction from './utils/useAction';
import { ACCEPT_FILE_TYPES } from './utils/schema';

NewFileUpload.propTypes = {
    categoryList: PropTypes.array,
    categoryLoading: PropTypes.bool,
    onFiles: PropTypes.func,
    onRefresh: PropTypes.func,
    selectData: PropTypes.object,
};

export default function NewFileUpload({ categoryList = [], categoryLoading = false, onFiles, onRefresh, selectData }) {
    const { formFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const [fileData, setFileData] = useState({ title: '', description: '', caption: '', category_id: 0 });
    const { actionState, actionFunction } = useAction();
    let {
        removeButton = 'Устгах',
        uploadButton = 'Upload хийх',
        acceptType = ACCEPT_FILE_TYPES,
        viewOption = true,
        viewButton = true,
        maximumSize = 2097152,
        minimumSize = 0,
        maxNumber = 10,
        multiple = true,
    } = selectData;

    useEffect(() => {
        if (!viewButton) {
            onSubmit();
        }
    }, [actionState.files]);

    // swr
    const { trigger: singleTrigger, isMutating } = useSWRMutation('/web-admin/api/v1/attachment/create', formFetcher, {
        onSuccess: (newData) => {
            if (newData?.response_code) {
                enqueueSnackbar(newData?.response_msg);
                handleFiles([newData?.data]);
            } else {
                enqueueSnackbar(newData?.response_msg, {
                    variant: 'error',
                });
            }
            viewButton && actionFunction.handleClose();
        },
        onError: (err) => {
            err &&
                enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                    variant: 'warning',
                });
            viewButton && actionFunction.handleClose();
        },
    });

    const { trigger: multiTrigger } = useSWRMutation('/web-admin/api/v1/attachment/bulk/create', formFetcher, {
        onSuccess: (newData) => {
            if (newData?.response_code) {
                enqueueSnackbar(newData?.response_msg);
                handleFiles(newData?.data);
            } else {
                enqueueSnackbar(newData?.response_msg, {
                    variant: 'error',
                });
            }
            viewButton && actionFunction.handleClose();
        },
        onError: (err) => {
            err &&
                enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                    variant: 'warning',
                });
            viewButton && actionFunction.handleClose();
        },
    });

    // functions
    const onSubmit = async () => {
        try {
            let body = new FormData();
            if (actionState.files.length === 1) {
                body.append('title', fileData.title);
                body.append('description', fileData.description);
                body.append('file_url', actionState.files[0]);
                body.append('file_type_id', fileFormat(actionState.files[0].path));
                body.append('category_id', fileData.category_id);
                body.append('caption', fileData.caption);
                singleTrigger({ body, type: 'multipart/form-data' });
            } else {
                actionState.files.map((file) => body.append('file_urls', file));
                multiTrigger({ body, type: 'multipart/form-data' });
            }
        } catch (e) {
            return;
        }
    };

    const handleFiles = (array) => {
        try {
            if (!viewButton) {
                onFiles(array[0].file_url);
            } else {
                let urls = [];
                urls = array.map((file) => file.file_url);
                onFiles(urls);
            }
            viewButton && onRefresh();
        } catch (e) {
            return;
        }
    };

    const handleChange = (name, event) => {
        setFileData({ ...fileData, [name]: event });
    };

    return (
        <>
            <Stack spacing={3} sx={{ mt: 3 }}>
                <Upload
                    multiple={multiple}
                    files={actionState.files}
                    onDrop={actionFunction.handleDrop}
                    onRemove={actionFunction.handleRemoveFile}
                    acceptedFiles={{
                        acceptType: acceptType,
                        maximumSize: maximumSize,
                        minimumSize: minimumSize,
                        maxNumber: maxNumber,
                    }}
                />
                {actionState.files?.length === 1 && viewOption && (
                    <>
                        <TextField
                            fullWidth
                            multiline
                            size={'small'}
                            InputLabelProps={{ shrink: true }}
                            value={fileData.title}
                            placeholder='Файлын гарчиг'
                            onChange={(event) => handleChange('title', event.target.value)}
                        />
                        <TextField
                            fullWidth
                            multiline
                            size={'small'}
                            InputLabelProps={{ shrink: true }}
                            value={fileData.description}
                            placeholder='Файлын тайлбар'
                            onChange={(event) => handleChange('description', event.target.value)}
                        />
                        {!categoryLoading && (
                            <TextField
                                select
                                fullWidth
                                size={'small'}
                                InputLabelProps={{ shrink: true }}
                                value={fileData.category_id}
                                label='Position'
                                onChange={(event) => handleChange('category_id', event.target.value)}
                            >
                                <MenuItem
                                    sx={{
                                        mx: 1,
                                        my: 0.5,
                                        borderRadius: 0.75,
                                        typography: 'body2',
                                        textTransform: 'capitalize',
                                    }}
                                    value={0}
                                >
                                    Сонгох
                                </MenuItem>
                                {categoryList?.map((option, index) => (
                                    <MenuItem
                                        key={index}
                                        value={option.id}
                                        sx={{
                                            mx: 1,
                                            my: 0.5,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                        <TextField
                            fullWidth
                            multiline
                            size={'small'}
                            InputLabelProps={{ shrink: true }}
                            value={fileData.caption}
                            placeholder='Caption бичих'
                            onChange={(event) => handleChange('caption', event.target.value)}
                        />
                    </>
                )}
            </Stack>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
                {!!actionState.files.length && viewButton && (
                    <>
                        <Button
                            variant='outlined'
                            color='inherit'
                            size='small'
                            onClick={actionFunction.handleRemoveAllFiles}
                            startIcon={<Iconify icon={'eva:trash-2-outline'} />}
                        >
                            {removeButton}
                        </Button>
                        <LoadingButton
                            type='submit'
                            variant='contained'
                            // loading={isMutating}
                            onClick={onSubmit}
                            startIcon={<Iconify icon={'akar-icons:send'} />}
                            size='small'
                            disabled={actionState.files === null}
                        >
                            {uploadButton}
                        </LoadingButton>
                    </>
                )}
            </Box>
        </>
    );
}

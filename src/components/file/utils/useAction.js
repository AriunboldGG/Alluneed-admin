// react
import { useState, useCallback } from 'react';

const useAction = () => {
    const [files, setFiles] = useState([]);

    const handleDrop = useCallback(
        (acceptedFiles) => {
            setFiles([]);

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setFiles([...files, ...newFiles]);
        },
        [files]
    );

    const handleRemoveFile = (inputFile) => {
        const filtered = files.filter((file) => file !== inputFile);
        setFiles(filtered);
    };

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    const handleClose = () => {
        setFiles([]);
    };

    return {
        actionState: {
            files,
        },
        actionFunction: {
            handleDrop,
            handleRemoveFile,
            handleRemoveAllFiles,
            handleClose,
        },
    };
};
export default useAction;

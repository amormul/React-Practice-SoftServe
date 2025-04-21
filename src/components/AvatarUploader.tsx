import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface AvatarUploaderProps {
    onConfirm?: (file: File) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ onConfirm }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);

    const setFileAndPreview = (f: File) => {
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFileAndPreview(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileAndPreview(e.target.files[0]);
        }
    };

    const handleConfirm = () => {
        if (file && onConfirm) onConfirm(file);
    };

    const handleReset = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <Box>
            {!preview && (
                <Box
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{
                        border: '2px dashed',
                        borderColor: dragging ? 'primary.main' : 'text.disabled',
                        borderRadius: 2,
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <Typography sx={{ mb: 2 }}>
                        {dragging ? 'Drop image here' : 'Drag & drop image, or click to select'}
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        id="file-input"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-input">
                        <Button variant="contained" component="span">
                            Select Image
                        </Button>
                    </label>
                </Box>
            )}

            {preview && (
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                        <img
                            src={preview}
                            alt="preview"
                            style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 8 }}
                        />
                    </Box>
                    <Box>
                        <Button variant="contained" onClick={handleConfirm} sx={{ mr: 1 }}>
                            Confirm
                        </Button>
                        <Button variant="outlined" onClick={handleReset}>
                            Replace
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AvatarUploader;

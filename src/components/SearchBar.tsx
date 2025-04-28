import React, { FunctionComponent, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, FormControl, InputAdornment } from "@mui/material";

const TypeSearch: FunctionComponent = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [showClearIcon, setShowClearIcon] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setInputValue(value);
        setShowClearIcon(value !== "");
    };

    const handleClear = (): void => {
        setInputValue("");
        setShowClearIcon(false);
    };

    return (
        <div id="app" style={{ padding: '20px' }}>
            <FormControl>
                <TextField
                    size="small"
                    variant="outlined"
                    value={inputValue}
                    onChange={handleChange}
                    sx={{
                        margin: 0,
                        width: 300,
                        backgroundColor: "#fff",
                        borderRadius: '25px'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: showClearIcon && (
                            <InputAdornment
                                position="end"
                                onClick={handleClear}
                                sx={{ cursor: 'pointer' }}
                            >
                                <ClearIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </FormControl>
        </div>
    );
};

export default TypeSearch;

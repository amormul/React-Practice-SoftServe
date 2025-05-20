import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import AdminGenres from '../components/admin/AdminGenres';
import AdminActors from '../components/admin/AdminActors';
import AdminMovies from '../components/admin/AdminMovies';
import AdminHalls from "../components/admin/AdminHalls.tsx";
import AdminSessions from "../components/admin/AdminSessions.tsx";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `admin-tab-${index}`,
        'aria-controls': `admin-tabpanel-${index}`,
    };
}

export default function AdminPanel() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Paper elevation={3} sx={{ width: '100%', minHeight: '100vh', p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Адмін-панель
            </Typography>
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                aria-label="Admin panel tabs"
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label="Жанри" {...a11yProps(0)} />
                <Tab label="Актори" {...a11yProps(1)} />
                <Tab label="Фільми" {...a11yProps(2)} />
                <Tab label="Зали" {...a11yProps(3)} />
                <Tab label="Сесії" {...a11yProps(4)} />
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                <AdminGenres />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <AdminActors />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
                <AdminMovies />
            </TabPanel>
            <TabPanel value={tabIndex} index={3}>
                <AdminHalls />
            </TabPanel>
            <TabPanel value={tabIndex} index={4}>
                <AdminSessions />
            </TabPanel>
        </Paper>
    );
}

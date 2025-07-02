import { useState } from 'react';

export default function useTabs(defaultValues) {
    const [currentTab, setCurrentTab] = useState(defaultValues || '');

    return {
        currentTab,
        onChangeTab: (_, newValue) => {
            setCurrentTab(newValue);
        },
        setCurrentTab,
    };
}

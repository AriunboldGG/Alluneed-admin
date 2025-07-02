import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuthContext } from './useAuthContext';
import { PATH_AUTH } from 'src/routes/paths';

import PropTypes from 'prop-types';
import LoadingScreen from 'src/components/loading-screen';

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default function AuthGuard({ children }) {
    const [loading, setloading] = useState(true);
    const {
        state: { isLoggedIn },
    } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 300);
    }, [isLoggedIn]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (isLoggedIn) {
        return <> {children} </>;
    }
    router.replace(PATH_AUTH.login);
}

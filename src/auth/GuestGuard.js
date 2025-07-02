import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useAuthContext } from './useAuthContext';
import PropTypes from 'prop-types';
import LoadingScreen from 'src/components/loading-screen';

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default function GuestGuard({ children }) {
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

    if (!isLoggedIn) {
        return <> {children} </>;
    }
    router.replace(PATH_DASHBOARD.user.root);
}

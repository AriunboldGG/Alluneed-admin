import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function Index() {
    const { pathname, push } = useRouter();

    useEffect(() => {
        if (pathname === PATH_DASHBOARD.reference.root) {
            push(PATH_DASHBOARD.reference.table);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return null;
}

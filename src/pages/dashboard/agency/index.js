import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function Index() {
    const { pathname, push } = useRouter();

    useEffect(() => {
        if (pathname === PATH_DASHBOARD.agency.root) {
            push(PATH_DASHBOARD.agency.table);
        }
    }, [pathname]);

    return null;
}

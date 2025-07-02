import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function Index() {
    const { pathname, push } = useRouter();

    useEffect(() => {
        if (pathname === PATH_DASHBOARD.campaigns.root) {
            push(PATH_DASHBOARD.campaigns.table);
        }
    }, [pathname]);

    return null;
}

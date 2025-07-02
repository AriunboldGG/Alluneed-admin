import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === PATH_DASHBOARD.user.root) {
      push(PATH_DASHBOARD.user.table);
    }
  }, [pathname]);

  return null;
}

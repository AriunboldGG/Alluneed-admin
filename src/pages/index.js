import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      push(PATH_AUTH.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

import jwt_decode from 'jwt-decode';
import { paths } from './paths';

const checkRoles = (url, role) => {
    try {
        let permission = false,
            result;
        for (let i in paths) {
            if (paths[i].role.includes(role)) {
                result = paths[i];
                if (result?.path) {
                    let el = result.path;
                    el.forEach((i) => {
                        if (i.matchList && url.startsWith(i.name)) {
                            permission = true;
                        }
                        if (!i.matchList && i.name === url) {
                            permission = true;
                        }
                    });
                }
                if (permission) {
                    break;
                }
            }
        }
        return permission;
    } catch (e) {
        return false;
    }
};

export const checkToken = (req) => {
    try {
        // const cookie = req.cookies.get('accessToken')?.value
        //let decoded = jwt_decode(cookie);
        const accessToken = 'admin';
        const { pathname } = req.nextUrl;
        let role = checkRoles(pathname, accessToken);
        return { roleBased: role, token: accessToken };
    } catch (error) {
        return;
    }
};

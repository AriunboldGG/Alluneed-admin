export const HOST_API_KEY = process.env.HOST_API_KEY || '';
export const HOST_API_IMAGE_KEY = process.env.HOST_API_IMAGE_KEY || '';
export const HOST_IMAGE_UPLOAD_KEY = process.env.HOST_IMAGE_UPLOAD_KEY || '';
export const HOST_FILE_UPLOAD_KEY = process.env.HOST_FILE_UPLOAD_KEY || '';

export const LOGIN_URL = process.env.LOGIN_URL || '';
export const LOGIN_AUTH_USERNAME = process.env.LOGIN_AUTH_USERNAME || '';
export const LOGIN_AUTH_PASSWORD = process.env.LOGIN_AUTH_PASSWORD || '';

export const HEADER = {
    H_MOBILE: 64,
    H_MAIN_DESKTOP: 88,
    H_DASHBOARD_DESKTOP: 92,
    H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
    W_BASE: 260,
    W_DASHBOARD: 280,
    W_DASHBOARD_MINI: 88,
    H_DASHBOARD_ITEM: 48,
    H_DASHBOARD_ITEM_SUB: 36,
    H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
    NAV_ITEM: 24,
    NAV_ITEM_HORIZONTAL: 22,
    NAV_ITEM_MINI: 22,
};

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: false,
  env: {
    // HOST
    HOST_API_KEY: 'http://103.168.56.249:8080',
    //   HOST_API_IMAGE_KEY: 'https://test-khovd-mobileapp.digitalaimag.mn/api/files/',
    //   HOST_IMAGE_UPLOAD_KEY: 'https://test-khovd-mobileapp.digitalaimag.mn/api/upload/',
    //   HOST_FILE_UPLOAD_KEY: 'https://test-khovd-mobileapp.digitalaimag.mn/api/files/',
    LOGIN_URL: 'http://103.168.56.249:8080',
    LOGIN_AUTH_USERNAME: 's18ud1101039@nmit.edu.mn',
    LOGIN_AUTH_PASSWORD: 'Test123.',
    TABLE_ROW_PER_PAGE: '6',
  },
});

import 'src/locales/i18n';
import 'simplebar/src/simplebar.css';
/* eslint-disable import/no-unresolved */
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ThemeProvider from '../theme';
import ThemeLocalization from '../locales';
import { StyledChart } from 'src/components/chart';
import ProgressBar from 'src/components/progress-bar';
import SnackbarProvider from 'src/components/snackbar';
import { MotionLazyContainer } from 'src/components/animate';
import { AuthContext } from 'src/context/Auth/authContext';
import { Api } from 'src/auth/Api';
import { SWRConfig } from 'swr';
import { ToastContainer } from 'react-toastify';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'src/redux/store';
import 'react-toastify/dist/ReactToastify.css';

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

export default function MyApp(props) {
    const { handlers, state } = Api();
    const { Component, pageProps } = props;

    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <SWRConfig>
                <AuthContext.Provider
                    value={{
                        handlers,
                        state,
                    }}
                >
                    <ReduxProvider store={store}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MotionLazyContainer>
                                <ThemeProvider>
                                    <ThemeLocalization>
                                        <SnackbarProvider>
                                            <StyledChart />
                                            <ProgressBar />
                                            <ToastContainer />
                                            {getLayout(<Component {...pageProps} />)}
                                        </SnackbarProvider>
                                    </ThemeLocalization>
                                </ThemeProvider>
                            </MotionLazyContainer>
                        </LocalizationProvider>
                    </ReduxProvider>
                </AuthContext.Provider>
            </SWRConfig>
        </>
    );
}

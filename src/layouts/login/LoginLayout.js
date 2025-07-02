import PropTypes from 'prop-types';
import { Typography, Stack } from '@mui/material';
import Logo from 'src/components/logo';
import Image from 'src/components/image';
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

LoginLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration }) {
    return (
        <StyledRoot>
            <StyledSection>
                <Image
                    disabledEffect
                    visibleByDefault
                    alt="auth"
                    src={illustration || '/assets/illustrations/Project_67-03.png'}
                    sx={{ maxWidth: 820 }}
                />

                <StyledSectionBg />
            </StyledSection>

            <StyledContent>
                <Stack sx={{ width: 1 }}> {children} </Stack>
            </StyledContent>
        </StyledRoot>
    );
}

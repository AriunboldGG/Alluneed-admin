import { styled, alpha } from '@mui/material';
import { MotionContainer } from 'src/components/animate';
import Image from 'src/components/image';
import { HOST_API_IMAGE_KEY } from 'src/config-global';
import PropTypes from 'prop-types';

CarouselItem.propTypes = {
    item: PropTypes.object.isRequired,
    isActive: PropTypes.bool,
};
export default function CarouselItem({ item, isActive }) {
    const { imagePath, title } = item;
    const StyledOverlay = styled('div')(({ theme }) => ({
        top: 200,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 8,
        position: 'absolute',
        backgroundColor: alpha(theme.palette.grey[900], 0.64),
    }));

    return (
        <MotionContainer action animate={isActive} sx={{ position: 'relative' }}>
            <StyledOverlay />
            <Image
                alt={title}
                src={HOST_API_IMAGE_KEY + imagePath}
                sx={{
                    height: { xs: 280, xl: 320 },
                }}
            />
        </MotionContainer>
    );
}

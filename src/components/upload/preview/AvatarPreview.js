import PropTypes from 'prop-types';
//
import Image from '../../image';
import { HOST_API_KEY } from 'src/config-global';

// ----------------------------------------------------------------------

AvatarPreview.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default function AvatarPreview({ file }) {
  if (!file) {
    return null;
  }

  const imgUrl =
    typeof file === 'string' ? HOST_API_KEY + '/file/' + file : file.preview;

  return (
    <Image
      alt='avatar'
      src={imgUrl}
      sx={{
        zIndex: 8,
        overflow: 'hidden',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 16px)`,
        height: `calc(100% - 16px)`,
      }}
    />
  );
}

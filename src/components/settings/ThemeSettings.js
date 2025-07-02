import PropTypes from 'prop-types';
import ThemeContrast from './ThemeContrast';
import ThemeColorPresets from './ThemeColorPresets';
import SettingsDrawer from './drawer';

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
    children: PropTypes.node,
};

export default function ThemeSettings({ children }) {
    return (
        <ThemeColorPresets>
            <ThemeContrast>
                {children}
                <SettingsDrawer />
            </ThemeContrast>
        </ThemeColorPresets>
    );
}

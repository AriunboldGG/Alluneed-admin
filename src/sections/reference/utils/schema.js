import * as Yup from 'yup';
import { requiredMsg } from 'src/utils/regex';

export const SettingsSchema = Yup.object().shape({
    name: Yup.string().required(requiredMsg),
    field1: Yup.string(),
    field2: Yup.string(),
    field3: Yup.string(),
    description: Yup.string(),
});

export function settingsDefaultValues() {
    const Values = {
        description: '',
        name: '',
        field1: '',
        field2: '',
        field3: '',
        code: '',
    };
    return Values;
}

export const TABLE_HEAD_SETTINGS = [
    { id: 'number', label: '№', align: 'left' },
    { id: 'name', label: 'Нэр', align: 'left' },
    // { id: 'code', label: 'code', align: 'left' },
    // { id: 'description', label: 'Тайлбар', align: 'left' },
    // { id: 'field1', label: 'field1', align: 'left' },
    // { id: 'field2', label: 'field2', align: 'left' },
    // { id: 'field3', label: 'field3', align: 'left' },
    { id: 'action', label: 'Үйлдэл', align: 'center' },
];

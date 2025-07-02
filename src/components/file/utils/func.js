import { FORMAT_PDF, FORMAT_WORD, FORMAT_EXCEL, FORMAT_IMG, FORMAT_VIDEO, FORMAT_OTHER } from './schema';

export function fileTypeByUrl(fileUrl = '') {
    return (fileUrl && fileUrl.split('.').pop()) || '';
}

export function fileTypeName(type) {
    try {
        let file;
        if (type) {
            switch (type) {
                case 'image':
                    file = 1920;
                    break;
                case 'pdf':
                    file = 1923;
                    break;
                case 'doc':
                    file = 1924;
                    break;
                case 'excel':
                    file = 1925;
                    break;
                default:
                    file = 0;
            }
        }
        return file;
    } catch (e) {
        return;
    }
}

export function fileFormat(fileUrl) {
    try {
        let format;

        switch (fileUrl?.includes(fileTypeByUrl(fileUrl))) {
            case FORMAT_IMG.includes(fileTypeByUrl(fileUrl)):
                format = 1920;
                break;
            case FORMAT_PDF.includes(fileTypeByUrl(fileUrl)):
                format = 1923;
                break;
            case FORMAT_WORD.includes(fileTypeByUrl(fileUrl)):
                format = 1924;
                break;
            case FORMAT_EXCEL.includes(fileTypeByUrl(fileUrl)):
                format = 1925;
                break;
            case FORMAT_OTHER.includes(fileTypeByUrl(fileUrl)):
                format = 1926;
                break;
            default:
                format = 1926;
        }

        return format;
    } catch (e) {
        return;
    }
}

export function NumberToString(array) {
    try {
        let test = [];
        if (array) {
            test = array.join();
        }
        return test;
    } catch (e) {
        return;
    }
}

export function handleSort(name) {
    try {
        let sortName = '';

        switch (name) {
            case 'Үүссэн огноо':
                sortName = 'created_at';
                break;
            case 'Гарчиг':
                sortName = 'title';
                break;
            case 'ID':
                sortName = 'id';
                break;
            default:
                sortName = '';
        }

        return sortName;
    } catch (e) {
        return;
    }
}

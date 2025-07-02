export default function CommaHandle(price) {
    if (typeof price === 'number') {
        return price;
    } else {
        let noComma = price.replaceAll(',', '');
        return Number(noComma);
    }
}

export default {
    filters: {
        currency(value) {
            return '$' + value.toFixed(2).replace(/./g, (match, offset, string) => {
                return offset && match !== "." && (string.length - offset) % 3 === 0 ? "," + match : match;
            });
        }
    }
};
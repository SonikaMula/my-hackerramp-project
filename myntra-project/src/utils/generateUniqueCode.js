function generateUniqueCode() {
    return 'UNIQUE-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

module.exports = generateUniqueCode;

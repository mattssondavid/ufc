module.exports = {
    verbose: true,
    testMatch: [
        "**/__tests__/**/*.js?(x),**/?(*.)(spec|test).js?(x)", // Original
        "**/(*.)(spec|test).{m,}js" // Works for .mjs
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/dist/"
    ],
    moduleFileExtensions: [
        "js", "json", "jsx", "node", "mjs"
    ],
};
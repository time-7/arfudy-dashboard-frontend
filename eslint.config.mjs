// eslint.config.mjs
export default {
    root: true,
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:@next/next/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@tanstack/query/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        'react-hooks',
        'prettier',
        'import',
        '@next/eslint-plugin-next',
        '@typescript-eslint',
        '@tanstack/query'
    ],
    rules: {
        'react/prop-types': 'off', // Desabilitar verificação de prop-types
        'no-console': 'warn', // Aviso sobre uso de console
        'react/jsx-uses-react': 'off', // Desabilitar regra do React (não é mais necessário no React 17+)
        'react/react-in-jsx-scope': 'off', // Desabilitar regra do React (não é mais necessário no React 17+)
        'prettier/prettier': 'warn' // Aviso sobre regras do Prettier
    }
};

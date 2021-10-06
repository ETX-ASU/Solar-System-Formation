const packageJson = require('./package.json');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath:
    process.env.NEXT_PUBLIC_BASE_PATH != null
      ? process.env.NEXT_PUBLIC_BASE_PATH
      : process.env.NODE_ENV === 'production'
      ? `/${packageJson.name}`
      : '',
};

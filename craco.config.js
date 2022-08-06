// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@pages': resolvePath('./src/pages'),
      '@components': resolvePath('./src/components'),
    },
  },
};

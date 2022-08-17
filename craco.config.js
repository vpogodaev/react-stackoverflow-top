// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@pages': resolvePath('./src/pages'),
      '@components': resolvePath('./src/components'),
      '@entities': resolvePath('./src/entities'),
      '@shared': resolvePath('./src/shared'),
      '@services': resolvePath('./src/services'),
      '@store': resolvePath('./src/store'),
    },
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: '@import "src/styles/variables.scss";',
      },
    },
  },
};

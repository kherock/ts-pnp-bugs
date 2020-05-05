const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        options: PnpWebpackPlugin.tsLoaderOptions({
          transpileOnly: true,
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(
      PnpWebpackPlugin.forkTsCheckerOptions({
        memoryLimit: 4096,
        // incremental API breaks importing JSON with PnP
        // useTypescriptIncrementalApi: false,
      }),
    )
  ],
};

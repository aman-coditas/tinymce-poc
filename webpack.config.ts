import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import path from "path";
import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const webpackConfig = (): webpack.Configuration => ({
    entry: "./src/index.tsx",
    ...(process.env.production || !process.env.development
        ? {}
        : { devtool: "eval-source-map" }),

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
                exclude: /dist/,
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true,
    },
    plugins: [
        // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        // DefinePlugin allows you to create global constants which can be configured at compile time
        new DefinePlugin({
            "process.env": process.env.production || !process.env.development,
        }),
        // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
        new ForkTsCheckerWebpackPlugin(),
    ],
});

export default webpackConfig;
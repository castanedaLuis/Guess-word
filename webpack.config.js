import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve("dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i, // 👈 si usas CSS
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"], // 👈 permite importar sin escribir extensión
    },
    plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
    devServer: {
        static: "./dist",
        open: true,
    },
};

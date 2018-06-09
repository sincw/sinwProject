/* eslint-disable */
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');
var appPath=path.resolve(__dirname, './src/Main.js');
var  buildPath= path.resolve(__dirname, './build');
module.exports = {
    devtool: "eval-source-map",//调试模式，生成环境要去掉
    entry: appPath,//整个页面的入口文件
    output: {
        path: buildPath,//打包输出的地址
        filename: "bundle.js",//输出的文件名称
    },
    mode:'development',//表示是生成环境
    module: {
        rules: [
            // {
            //     //将ES6的文件使用babel处理
            //     test: path.join(__dirname, './src'),
            //     //test: /\.js$/,
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2015']
            //     }
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets=es2015'
            },
            {
                //css-loader使能够使用类似@import和url（...）的方法实现require,style-loader将所有的计算后的样式加入页面中
                //webpack肯定是先将所有css模块依赖解析完得到计算结果再创建style标签。因此应该把style-loader放在css-loader的前面

                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                //url-loader的主要功能是：将源文件转换成DataUrl(声明文件mimetype的base64编码)
                // 8192，就交给file-loader处理了
                //file-loader的主要功能是：把源文件迁移到指定的目录（可以简单理解为从源文件目录迁移到build目录
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader?limit=8192&name=asset/[hash:8].[name].[ext]'
            }

        ]
    },

    plugins: [
        //HMR模块热替换
        //功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面
         new webpack.HotModuleReplacementPlugin(),
        //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。与上面配合使用
         //new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            /*
            template 参数指定入口 html 文件路径，插件会把这个文件交给 webpack 去编译，
            webpack 按照正常流程，找到 loaders 中 test 条件匹配的 loader 来编译，那么这里 html-loader 就是匹配的 loader
            html-loader 编译后产生的字符串，会由 html-webpack-plugin 储存为 html 文件到输出目录，默认文件名为 index.html
            可以通过 filename 参数指定输出的文件名
            html-webpack-plugin 也可以不指定 template 参数，它会使用默认的 html 模板。
            */
            template: './src/index.html',

            /*
            因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
            https://github.com/jantimon/html-webpack-plugin/issues/870
            */
            chunksSortMode: 'none'
        }),
        new webpack.DefinePlugin({
            //require('./src/js/base/factories/BlockResources.js')
            BLOCK: JSON.stringify(require('./src/asset/block.json')),
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        })
    ],
    //以下是服务环境配置
    devServer: {
        port: 8082,//端口
        host: 'localhost',//地址
        //inline: true,//用来支持dev-server自动刷新
        //hot: true,
        open: true,//开启webpack-dev-server 时自动打开页面
        historyApiFallback: true,
        contentBase: path.resolve(__dirname),//用来指定index.html所在目录
        publicPath: '/build/',//用来指定上线时运行地址
        proxy: {
        },
        openPage:"build/index.html"//指定打开的页面
    }
}
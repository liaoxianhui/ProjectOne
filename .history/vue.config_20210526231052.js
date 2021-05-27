const isPro = process.env.NODE_ENV === 'production'

module.exports = {
    devServer: {
        proxy: { // 配置跨域
            "/api": {
                target: "http://localhost:3000",
                changOrigin: true, // 允许跨域
                pathRewrite: {
                    "^/api": "" // 请求的时候，用这个api就可以了
                }
            }
        }
    },

    // 打包配置
    publicPath: isPro ? "./" : '',

    // 第一种
    // chainWebpack: config => {
    //         config.when(process.env.NODE_ENV === "production", config => {
    //             config.set("externals", {
    //                 'vue': 'Vue',
    //                 'vuex': 'Vuex',
    //                 'vue-router': 'VueRouter',
    //                 'element-ui': 'ELEMENT',
    //                 "echarts": "echarts",
    //                 // axios: "axios",
    //                 // swiper: 'swiper'
    //             })
    //         })
    //     }

    // 第二种
    configureWebpack: config => {
        if (isPro) {
            config.externals = { // cdn引入
                // 键值对: 键是你要cdn引用的插件名, 值是固定的, 只能百度
                'vue': 'Vue',
                'vuex': 'Vuex',
                'vue-router': 'VueRouter',
                'element-ui': 'ELEMENT',
                "echarts": "echarts",
                axios: "axios",
            }
        }
    },

    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete("prefetch");
        // 移除 preload 插件
        config.plugins.delete('preload');
        // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        })
    },

}
<template>
<div>
    <div>
        <el-button type="primary" @click="Return">返回</el-button>
    </div>
    <div class="df ai_c jc_c fd_c">
        <h3>{{ this.title }}</h3>
        <br />
        <h4>摘要:{{ this.abstract }}</h4>
        <br />
        <div>发表于: {{ this.author }}</div>
    </div>
    <br />
    <el-col :span="8">
        <el-card shadow="never">
            <div>{{ this.text }}</div>
        </el-card>
    </el-col>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "",
    props: {},
    components: {},
    data() {
        return {
            id: "",
            title: "",
            abstract: "",
            author: "",
            text: "",
        };
    },
    methods: {
        Return() {
            this.$router.push("/published");
        },
    },
    mounted() {
        this.id = this.$route.query.id;
        axios
            .post("/api/article/article", {
                _id: this.id,
            })
            .then((res) => {
                if (res.data.code === 200) {
                    this.title = res.data.data.title;
                    this.abstract = res.data.data.abstract;
                    this.author = res.data.data.author;
                    this.text = res.data.data.text;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    watch: {},
    computed: {},
};
</script>

<style lang="scss" scoped>
.el-col {
    width: 100%;
}

h1 {
    font-size: 40px;
}
</style>
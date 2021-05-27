<template>
  <div>
    <el-card>
      <h3>支持拖拽</h3>
      <div style="background: #e7e7e6; padding: 10px 20px; margin: 20px 0">
        Element UI自带上传组件
      </div>
      <el-upload class="upload-demo" drag action="/api/upload" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <h3 style="margin: 20px 0">支持裁剪</h3>
      <div style="background: #e7e7e6; padding: 10px 20px; margin: 20px 0">
        vue-image-crop-upload
      </div>
      <el-button class="btn" type="primary" @click="toggleShow"
        >上传图片</el-button
      >
      <my-upload
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="200"
        :height="200"
        img-format="png"
        :size="size"
        langType="zh"
        :noRotate="false"
        field="file"
        url="/api/upload"
      ></my-upload>
      <!-- <img :src="imgDataUrl" /> -->
    </el-card>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload";

export default {
  name: "",
  props: {},
  data() {
    return {
      imgDataUrl: "",
      show: false,
      size: 2.1
    };
  },
  components: {
    "my-upload": myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      // console.log("-------- crop success imgDataUrl --------", imgDataUrl);
      // console.log("-------- crop success field --------", field);
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      // console.log("-------- upload success jsonData --------", jsonData);
      // console.log("-------- upload success field --------", field);
      // this.imgDataUrl = "../../../server/public/uploads/" + jsonData.filename;
      // console.log(this.imgDataUrl);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>
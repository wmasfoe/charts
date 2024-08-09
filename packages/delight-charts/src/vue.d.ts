// vue 模块声明，防止 ts 引入 vue 文件飘红，参考：https://www.cnblogs.com/lingern/p/16077216.html
declare module "*.vue" {
  import Vue from "@/vue";
  export default Vue;
}

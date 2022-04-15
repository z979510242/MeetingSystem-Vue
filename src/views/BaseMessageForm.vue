<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 信息添加
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加通知信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="150px">
                    <el-form-item label="标题" prop="title" >
                        <el-input v-model="form.title"   placeholder="请输入标题"></el-input>
                    </el-form-item>

                  <el-form-item label="正文" prop="message" >
                    <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入正文" v-model="form.message"></el-input>
                  </el-form-item>

                  <el-form-item>
                        <el-button type="primary" @click="onSubmit">消息发布</el-button>
                        <el-button @click="onReset">重置内容</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useStore } from "vuex";
export default {
    name: "baseMessageForm",
    setup() {
      const store = useStore();
      const rules = {
          title: [
                { required: true, message: "请输入标题", trigger: "blur" },
          ],
          message: [
            { required: true, message: "请输入正文", trigger: "blur" },
          ],
        };
        const formRef = ref(null);
        const form = reactive({
          id:"",
          title : "",
          userId :"",
          date :"",
          message: "",

        });
        const insertMessage = () => {
          const time = new Date().getTime();
          form.date = new Date(time);

          form.userId = store.state.user.id;

          return axios.post("/message/insert/", form).then(res => {

            ElMessage.success("添加成功！");
            onReset();
          }).catch(e => {
            ElMessage.error(e);
          })
        }
        // 提交
        const onSubmit = () => {
            // 表单校验
          formRef.value.validate(async (valid) => {
            if (valid ) {
              await insertMessage();
            } else {
              return false;
            }
          });

        };
        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };

        return {
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
        };
    },
};
</script>
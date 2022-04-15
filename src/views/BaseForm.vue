<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 信息添加
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加用户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="150px">
                    <el-form-item label="工号" prop="id">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item>
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password" >
                    <el-input type="password" v-model="form.password" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="再一次输入密码" prop="passwordAgain">
                    <el-input type="password" v-model="form.passwordAgain" show-password></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" prop="tel">
                    <el-input v-model="form.tel" style="width: 60%"></el-input>
                    <el-button style="margin-left: 2em" @click="getCaptcha()" >获取验证码</el-button>
                  </el-form-item>
                  <el-form-item label="验证码：">
                    <el-input v-model="form.captcha"  ></el-input>
                  </el-form-item>
                    <el-form-item label="权限" prop="post">
                        <el-select v-model="form.priority" placeholder="请选择" style="width: 100%">
                            <el-option key="admin" label="管理员" value="3"></el-option>
                            <el-option key="user" label="用户" value="2"></el-option>
<!--                            <el-option key="imoo" label="imoo" value="imoo"></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">添加用户</el-button>
                        <el-button @click="onReset">重置表单</el-button>
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
export default {
    name: "baseForm",
    setup() {

        const rules = {
          id: [
                { required: true, message: "请输入工号", trigger: "blur" },
          ],
          name: [
            { required: true, message: "请输入名称", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
          ],
          passwordAgain: [
            { required: true, message: "请再次输入密码", trigger: "blur" },
          ],
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
          ],
          tel: [
            { required: true, message: "请输入联系方式", trigger: "blur" },
          ],
          captcha: [
            { required: true, message: "请输入验证码", trigger: "blur" },
          ],
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            id:"",
            password : "",
            passwordAgain :"",
            email: "",
            tel: "",
            post: "",
            priority: "2"
        });
        const insertUser = () => {
          return axios.post("/user/", form).then(res => {

            ElMessage.success("注册成功！");
            onReset();
          }).catch(e => {
            ElMessage.error(e.response.data.message);
          })
        }
        // 提交
        const onSubmit = () => {
            // 表单校验
          if (form.password == form.passwordAgain &&form.captcha == form.captchaBackend  && form.tel.length == 11){
            formRef.value.validate(async (valid) => {
              if (valid ) {
                await insertUser();
                form.captcha = "";
              } else {
                return false;
              }
            });
          }else if (form.password != form.passwordAgain){
            ElMessage.error("两次密码不同！请重新输入密码");
            return false;
          }else if (form.captcha != form.captchaBackend){
            ElMessage.error("验证码错误！请重新输入验证码");
            form.captchaBackend = "";
            form.captcha = "";
            return false;
          }else if (form.tel.length != 11){
            ElMessage.error("填写联系方式错误！请重新输入联系方式");
            return false;
          }

        };
        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };
        const getCaptcha = async () =>{
          //获取验证码
          if (form.tel){
            ElMessage.success("已获取验证码！")

            const captcha = await getCaptchaByBackend(form.tel);

            form.captchaBackend = captcha;

          }else if (form.value.tel.length != 11) {
            ElMessage.error("联系方式不合法,请核对联系方式！")
          }
        };

      const getCaptchaByBackend =(tel) =>{
        return axios.post("/captcha/"+tel).then(res => {
          return res.data;
        }).catch(e => {
          ElMessage.error(e);
        })
      }

        return {
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
          getCaptcha,
        };
    },
};
</script>
<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content" >
                <el-form-item prop="username">
                    <el-input v-model="param.id" placeholder="工号" tabindex="1">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password" tabindex="2"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
              <div class="login-btn">
                <el-checkbox type="primary"  v-model="param.status" size="small" checked="checked">我已阅读并接受</el-checkbox>
                <a @click="showInfo()">
                  <font size="2">
                    中南大学计算机学院会议场地使用实施方案
                  </font></a>
              </div>
              <br>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>

          <el-dialog center v-model="isShowInfo" width="55%">
            <p align="center"
               style="color:black; margin: 0cm 0cm 0pt; text-align: center; line-height: 29pt; mso-line-height-rule: exactly;">
              <span style="font-size: 22pt;"><font face="宋体">中南大学计算机学院会议场地使用实施方案</font></span></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">为加强学院会议场地的规范化管理，确保会议场地合理有效使用，现结合学院实际情况，特制定本办法。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第一条 学院会议场地由综合办公室统一管理，负责使用登记与调度、设备维护等工作。会议涉及使用的设备设施由专人负责保管、管理与调试。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第二条 计算机学院会议场地原则上仅对计算机学院师生开放。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第三条 计算机学院会议场地实行预约制。借用人登录“中南大学计算机学院会议场地管理系统”提交预约申请。
        账号为学工号，初始密码为123456（行政管理人员会议场地管理系统密码同行政管理系统密码一致），学生使用需由指导老师预约申请。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;"> 第四条 填写会议场地借用申请时，需填写借用人信息、使用时间、参会人数，是否使用多媒体等会议相关事项。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第五条 会议场地使用遵循先登记先使用、先紧急后一般的原则；若会议时间冲突，借用人可本着重要、紧急优先的原则自行协商解决。
        如遇特殊情况、紧急会议可先通知学院办公室负责人，开启会议场地先行使用，事后补办有关登记。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第六条 会议场地钥匙管理。电子楼由电子楼楼物业管理员管理。
        借用人需提前联系相关管理员于工作时间领取钥匙。会议场地钥匙使用结束后，须当即归还。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第七条 借用人应在预约时间到达会议场地。若长时间未到达，该会议场地使用权则由院办另行安排。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第八条 如因特殊原因取消申请或更改，需在预约之前登录管理系统操作变更，再次使用时，需重新申请。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;"> 第九条 借用人应在会议期间倡导与会人员爱护公共设施，自觉维护会议场地环境卫生。会议结束，借用人须对会议场地进行及时整理，
        关闭投影仪、音响系统、空调、电灯，桌椅归位；确保各种电器断电、门窗关闭；地面、桌椅台面和桌椅内部干净整洁无杂物。
        如发现设备故障和公物损坏应及时告知学院办公室，以便及时修理。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第十条 任何单位与个人未经网上预约，不得擅自使用会议场地、不得擅自挪用会议场地多媒体设备和桌椅等物品。</span></font></p>
            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">第十一条 会议场地使用管理办法从发布即日起实施，解释权归计算机学院所有。</span></font></p>

            <p style="color:black; margin: 0cm 0cm 0pt; line-height: 29pt; mso-line-height-rule: exactly;" align="right">
              <font face="宋体"><span lang="EN-US" style="font-size: 16pt;"><span style="mso-spacerun: yes;">&nbsp;&nbsp;&nbsp; </span></span>
                <span style="font-size: 16pt;">2022年4月</span></font></p>
          </el-dialog>



        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
    setup() {
        const router = useRouter();
        const param = reactive({
            id: "",
            password: "",
        });

        const rules = {
            id: [
                {
                    required: true,
                    message: "请输入工号",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        };
        const login = ref(null);
        const token = ref(null);

        const submitForm = () => {
          if (param.status){
            login.value.validate(async (valid) => {
              if (valid) {
                axios.post("/user/login", param).then(res => {

                  ElMessage.success("登录成功");
                  localStorage.setItem("token", res.data.token);
                  if(param.password === "123456"){
                    localStorage.setItem("default", true);
                  }else {
                    localStorage.setItem("default", false);
                  }

                  router.push("/");
                }).catch(e => {
                  ElMessage.error("账号或密码错误")
                })
              } else {
                ElMessage.error("表单验证失败");
                return false;
              }
            });
          }else {
            ElMessage.error("请阅读并接受中南大学计算机学院会议场地使用实施方案")
          }

        };

        const store = useStore();
        store.commit("clearTags");
        const isShowInfo = ref(false);
        const showInfo =() => {
          isShowInfo.value = true;
        }

        return {
          param,
          rules,
          login,
          submitForm,
          showInfo,
          isShowInfo
        };
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
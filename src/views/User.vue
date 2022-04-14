<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>基础信息</span>
            </div>
          </template>
          <div class="info">
            <div class="info-image" >
              <img :src="avatarImg"/>
<!--              <span class="info-edit">-->
<!--                                <i class="el-icon-lx-camerafill"></i>-->
<!--                            </span>-->
            </div>
            <div class="info-name">{{ store.state.user.name }}</div>
            <div class="info-desc">欢迎使用软件工程系会议室管理系统！</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>用户信息</span>
            </div>
          </template>
          <el-form label-width="90px" @submit.prevent="onSubmit">
            <el-form-item label="工号："> {{ form.id }}</el-form-item>
            <el-form-item label="用户名：">
              {{ form.name }}
            </el-form-item>
            <el-form-item label="职位：">
              {{userTypeChinese[form.post]}}
            </el-form-item>
            <el-form-item label="Email：">
              {{form.email}}
            </el-form-item>

            <el-form-item label="联系方式：">
            {{(form.tel+"").substr(0,4)}}***{{(form.tel+"").substr(8,10)}}
            </el-form-item>
            <template v-if="form.default">
              <el-form-item  style="color:red;">
                请尽快修改密码！
              </el-form-item>
            </template>

            <el-form-item>
<!--              <el-button type="primary" @click="onSubmit">更新</el-button>-->
              <el-button type="primary" @click="handleEdit()">修改信息</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>


    <!-- 编辑弹出框 -->
<!--    <el-dialog title="编辑信息"  center v-model="editVisible" width="40%">-->
      <el-drawer v-model="editVisible" title="修改个人信息" size="40%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="工号："> {{ form.id }}</el-form-item>
        <el-form-item label="用户名：">
<!--          {{ form.name }}-->
         <el-input v-model="form.name" style="width: 25%" ></el-input>
<!--          <el-button  style="margin-left: 2em" @click="onSubmit">修改用户名</el-button>-->
        </el-form-item>
        <el-form-item label="职位：">
          {{userTypeChinese[form.post]}}
        </el-form-item>
        <el-form-item label="Email：">
          {{form.email}}
          <el-button style="margin-left: 2em" @click="innerChangeEmailDrawer = true" >修改邮箱</el-button>
        </el-form-item>

        <el-form-item label="联系方式：">
          {{(form.tel+"").substr(0,4)}}***{{(form.tel+"").substr(8,10)}}
          <el-button style="margin-left: 2em" @click="innerChangeTelDrawer = true" >修改联系方式</el-button>
        </el-form-item>

        <el-form-item></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button style="margin-left: 4em" type="primary" @click="innerChangePasswordDrawer = true">修改密码</el-button>
        </el-form-item>
      </el-form>

        <el-drawer
            v-model="innerChangeEmailDrawer"
            title="修改邮箱"
            :append-to-body="true">
<!--          <el-form :model="form" label-width="120px">-->
<!--            <el-form-item label="邮箱：">-->
<!--              {{form.email}}-->
<!--              <el-button style="margin-left: 2em" @click="getCaptchaByEmail()" >获取验证码</el-button>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="验证码：">-->
<!--              <el-input v-model="form.captchaEmail" ></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="新邮箱：">-->
<!--              <el-input v-model="form.newEmail" ></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item >-->
<!--              <el-button type="primary" @click="onSubmit">保存</el-button>-->
<!--            </el-form-item>-->
<!--          </el-form>-->

          <el-tabs :model="form" type="card" @tab-click="handleClick">
            <el-tab-pane label="通过邮箱验证" >
              <el-form :model="form" label-width="120px">
                <el-form-item label="邮箱：">
                  {{form.email}}
                  <el-button style="margin-left: 2em" @click="getCaptchaByEmail()" >获取验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码：">
                  <el-input v-model="form.captchaEmail" ></el-input>
                </el-form-item>
                <el-form-item label="新邮箱：">
                  <el-input v-model="form.newEmail" ></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="通过手机验证" >
              <el-form :model="form" label-width="120px">
                <el-form-item label="联系方式：">
                  {{(form.tel+"").substr(0,4)}}***{{(form.tel+"").substr(8,10)}}
                  <el-button style="margin-left: 2em" @click="getCaptcha()" >获取验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码：">
                  <el-input v-model="form.captcha" ></el-input>
                </el-form-item>
                <el-form-item label="新邮箱：">
                  <el-input v-model="form.newEmail"  ></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

        </el-drawer>



        <el-drawer
            v-model="innerChangeTelDrawer"
            title="修改联系方式"
            :append-to-body="true">
          <el-form :model="form" label-width="120px">
            <el-form-item label="联系方式：">
              {{(form.tel+"").substr(0,4)}}***{{(form.tel+"").substr(8,10)}}
              <el-button style="margin-left: 2em" @click="getCaptcha()" >获取验证码</el-button>
            </el-form-item>
            <el-form-item label="验证码：">
              <el-input v-model="form.captcha" ></el-input>
            </el-form-item>
            <el-form-item label="新联系方式：">
              <el-input v-model="form.newTel" ></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>

      </el-drawer>




        <el-drawer
            v-model="innerChangePasswordDrawer"
            title="修改密码"
            :append-to-body="true">
          <el-tabs :model="form" type="card" @tab-click="handleClick">
            <el-tab-pane label="通过旧密码" >
              <el-form :model="form" label-width="120px">
                <el-form-item label="旧密码：">
                  <el-input v-model="form.password" show-password ></el-input>
                </el-form-item>
                <el-form-item label="新密码：">
                  <el-input v-model="form.new"  show-password></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>

            </el-tab-pane>
            <el-tab-pane label="通过手机验证" >
              <el-form :model="form" label-width="120px">
              <el-form-item label="联系方式：">
                {{(form.tel+"").substr(0,4)}}***{{(form.tel+"").substr(8,10)}}
                <el-button style="margin-left: 2em" @click="getCaptcha()" >获取验证码</el-button>
              </el-form-item>
              <el-form-item label="验证码：">
                <el-input v-model="form.captcha" ></el-input>
              </el-form-item>
              <el-form-item label="新密码：">
                <el-input v-model="form.new"  show-password></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
            </el-tab-pane>
            <el-tab-pane label="通过邮箱验证" >
              <el-form :model="form" label-width="120px">
                <el-form-item label="邮箱：">
                  {{form.email}}
                  <el-button style="margin-left: 2em" @click="getCaptchaByEmail()" >获取验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码：">
                  <el-input v-model="form.captchaEmail" ></el-input>
                </el-form-item>
                <el-form-item label="新密码：">
                  <el-input v-model="form.new"  show-password></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

        </el-drawer>
      </el-drawer>

  </div>
</template>

<script>
import {reactive, ref, onMounted} from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import avatar from "../assets/img/img.jpg";
import axios from "axios";
import {ElMessage} from "element-plus";
import {useStore} from 'vuex'

export default {
  name: "user",
  components: {
    VueCropper,
  },
  setup() {

    const form = ref([]);
    const isDefault = ref(localStorage.getItem("default"));
    // console.log(localStorage.getItem("token"));
    const getUserData = async () => {
      await axios.get("/user/me").then(res => {
        // console.log(res.data);
        form.value = res.data
        form.default = isDefault;


      })
    }
    onMounted(async () => {
      getUserData()
    })

    const verifyUser = () => {
      return axios.post("/user/login", form.value).then(res => {
        // login success
        return true;
      }).catch(e => {
        return false;
      })
    }
    const userTypeChinese = reactive({
      "admin": "管理员",
      "user" :"用户"
    })


    const dialogVisible = ref(false);
    const regex = "\\w+@\\w+(\\.\\w{2,3})*\\.\\w{2,3}";
    const updateData = async () => {
      await axios.patch("/user/", form.value).then(res => {
        // console.log(res.data)
        ElMessage.success("修改成功");
        editVisible.value = false;
      }).catch(e => {
        ElMessage.error(e.response.status+": "+e.response.data)
      })
    }
    const onSubmit = async () => {
      // console.log(form.value)
      if (form.value.password) {
        if (form.value.new) {
          let login = await verifyUser();
          // console.log(login)
          if (login) {
            if (form.value.password === form.value.new){
              ElMessage.error("新旧密码相同！")
              return;
            }
            form.value.password = form.value.new;
            innerChangePasswordDrawer.value =false;
            updateData();
            if (form.value.new !== "123456"){
              form.value.default = false;
              localStorage.setItem("default", false);
            }else {
              form.value.default = true;
              localStorage.setItem("default", true);
            }
            // clean password fields
            form.value.password = form.value.new = ""
            return;
          } else {
            ElMessage.error("旧密码错误")
            return;
          }
        }
        else {
          ElMessage.error("请输入新密码")
          return;
        }
      }
      if (form.value.captchaEmail){
        // console.log(form.value.captchaEmail)
        // console.log(form.value.captchaEmailBackend)
        // console.log(parseInt(form.value.captchaEmail) === parseInt(form.value.captchaEmailBackend))
        if (parseInt(form.value.captchaEmail) === parseInt(form.value.captchaEmailBackend)){
          if (form.value.new){
            form.value.password = form.value.new;
            innerChangePasswordDrawer.value =false;
            form.value.captchaEmailBackend = "";
            form.value.captchaEmail = "";
            updateData();
            form.value.password = form.value.new = ""
            return;
          }

          // console.log(form.value.newEmail.match(regex))

          if (form.value.newEmail){
            if (form.value.newEmail.match(regex)){
              form.value.email = form.value.newEmail;
              innerChangeEmailDrawer.value =false;
              form.value.captchaEmailBackend = "";
              form.value.captchaEmail = "";
              updateData();
              return;
            }else {
              ElMessage.error("请输入正确的邮箱！")
              form.value.captchaEmailBackend = "";
              form.value.captchaEmail = "";
              form.value.newEmail = "";
              return;
            }

          }else {
            ElMessage.error("请填入新的邮箱,并重新获取验证码！")
            form.value.captchaEmailBackend = "";
            form.value.captchaEmail = "";
            return;
          }
        }else {
          ElMessage.error("验证码错误！请重新获取新的验证码！")
          form.value.captchaEmailBackend = "";
          form.value.captchaEmail = "";
          form.value.newEmail = "";
          return;
        }

      }


      if (form.value.captcha){
        if (parseInt(form.value.captcha )=== parseInt(form.value.captchaBackend)){
          if (form.value.new){
            form.value.password = form.value.new;
            innerChangePasswordDrawer.value =false;
            form.value.captchaBackend = "";
            form.value.captcha = "";
            updateData();
            form.value.password = form.value.new = ""
            return;
          }
          if (form.value.newEmail.match(regex)){
            form.value.email = form.value.newEmail;
            innerChangeEmailDrawer.value =false;
            form.value.captchaBackend = "";
            form.value.captcha = "";
            form.value.newEmail = "";
            updateData();
            return;
          }else {
            ElMessage.error("请输入正确的邮箱,并重新获取验证码！")
            form.value.captchaBackend = "";
            form.value.captcha = "";
            form.value.newEmail = "";
            return;
          }
          if (form.value.newTel.length === 11 && form.value.newTel !== form.value.tel){
            form.value.tel = form.value.newTel;
            innerChangeTelDrawer.value = false;
            form.value.captchaBackend = "";
            form.value.captcha = "";
            form.value.password = form.value.new = ""
            form.value.newTel = "";
            updateData();
            return;
          }else if (form.value.newTel.length !== 11){
            ElMessage.error("填入的联系方式格式错误，请重新操作！")
            form.value.captchaBackend = "";
            form.value.captcha = "";
            form.value.newTel ="";
            return;
          }else if (form.value.newTel !== form.value.tel){
            ElMessage.error("填入的联系方式格式错误，请重新操作！")
            form.value.captchaBackend = "";
            form.value.captcha = "";
            form.value.newTel ="";
            return;
          }
        }else {
          ElMessage.error("验证码错误！")
          form.value.captchaBackend = "";
          form.value.captcha = "";
          return;
        }
      }
      if (!form.value.password && form.value.new){
        ElMessage.error("请输入旧密码")
        return;
      }
      if (!form.value.captcha && !form.value.newTel &&!form.value.new && !form.value.newEmail &&!form.value.captchaEmail){
        updateData();
        store.commit("updateName", form.value.name);
      }

    };

    const avatarImg = ref(avatar);
    const imgSrc = ref("");
    const cropImg = ref("");

    const cropper = ref(null);

    const showDialog = () => {
      dialogVisible.value = true;
      imgSrc.value = avatarImg.value;
    };

    const setImage = (e) => {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        dialogVisible.value = true;
        imgSrc.value = event.target.result;
        cropper.value && cropper.value.replace(event.target.result);
      };
      reader.readAsDataURL(file);
    };

    const cropImage = () => {
      cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
    };

    const saveAvatar = () => {
      avatarImg.value = cropImg.value;
      dialogVisible.value = false;
    };
    const editVisible = ref(false);
    let form2 = ref({});

    const handleEdit = async () => {
      // form2.value = form.value;
      // console.log(form)
      // console.log(form2)
      // form.value.userId = "";
      editVisible.value = true;
    };
    const drawer = ref(false);
    const innerChangeTelDrawer = ref(false);
    const innerChangePasswordDrawer = ref(false);
    const innerChangeEmailDrawer = ref(false);

    const getCaptcha = async () =>{
      //获取验证码

      if (form.value.tel){
        ElMessage.success("已获取验证码！")
        const captcha =await getCaptchaByBackend(form.value.tel);
        // console.log(captcha)
        form.value.captchaBackend = captcha;
        // console.log(form.value.captchaBackend)
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
    };
    const getCaptchaByEmail = async () =>{
      //获取验证码

      if (form.value.email){
        ElMessage.success("已获取验证码！")
        const captcha =await getCaptchaEmailByBackend(form.value.name,form.value.email);
        // console.log(captcha)
        form.value.captchaEmailBackend = captcha;
        // console.log(form.value.captchaEmailBackend)
      }
      // else if (form.value.tel.length != 11) {
      //   ElMessage.error("联系方式不合法,请核对联系方式！")
      // }
    };
    const getCaptchaEmailByBackend =(tel) =>{
      return axios.get("/captcha/email/",{
          params:{
            name: form.value.name,
            email:form.value.email
          }
      }).then(res => {
        return res.data;
      }).catch(e => {
        ElMessage.error(e);
      })
    };

    const store = useStore();


    return {
      name,
      store,
      form,
      form2,
      handleEdit,
      onSubmit,
      updateData,
      cropper,
      editVisible,
      userTypeChinese,
      avatarImg,
      imgSrc,
      cropImg,
      showDialog,
      dialogVisible,
      setImage,
      cropImage,
      saveAvatar,
      drawer,
      innerChangeTelDrawer,
      innerChangeEmailDrawer,
      innerChangePasswordDrawer,
      isDefault,
      getCaptcha,
      getCaptchaByEmail
    };
  },
};
</script>

<style scoped>
.info {
  text-align: center;
  padding: 35px 0;
}

.info-image {
  position: relative;
  margin: auto;
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50px;
  overflow: hidden;
}

.info-image img {
  width: 100%;
  height: 100%;
}

.info-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-edit i {
  color: #eee;
  font-size: 25px;
}

.info-image:hover .info-edit {
  opacity: 1;
}

.info-name {
  margin: 15px 0 10px;
  font-size: 24px;
  font-weight: 500;
  color: #262626;
}

.crop-demo-btn {
  position: relative;
}

.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
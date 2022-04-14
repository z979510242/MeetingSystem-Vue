<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 信息管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="query.post" placeholder="权限" class="handle-select mr10">
          <el-option v-for="(item) in Object.keys(userPostType)" :label="userTypeChinese[item]" v-bind:value="item">{{userTypeChinese[item]}}</el-option>
        </el-select>


        <el-button type="primary" icon="el-icon-search" @click="cleanFilter">清空筛选条件</el-button>
      </div>
      <el-table :data="filterUsers" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="工号" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column label="联系方式" align="center">
          <template #default="scope">
            {{(scope.row.tel+"").substr(0,4)}}***{{(scope.row.tel+"").substr(8,10)}}
          </template>
        </el-table-column>
        <el-table-column label="权限" align="center">
          <template #default="scope">{{userTypeChinese[scope.row.post]}} </template>
        </el-table-column>

        <el-table-column label="操作" width="300" align="center">
          <template #default="scope" >
            <el-button type="text" icon="el-icon-edit"   @click="handleEdit(scope.$index, scope.row)"  >更新信息
            </el-button>
            <el-button type="text" icon="el-icon-delete"   @click="handleDelete(scope.$index, scope.row)" style="color: red" >删除用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                       :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="更新信息"  center v-model="editVisible" width="35%">
      <el-form :model="form" label-width="90px">

        <el-form-item label="工号：">{{form.id}}
        </el-form-item>
        <el-form-item label="姓名：">
<!--          {{form.name}}-->
          <el-input v-model="form.name"  style="width: 45%" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
<!--          {{form.email}}-->
          <el-input v-model="form.email"  style="width: 45%" ></el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
<!--          {{form.tel}}-->
          {{(form.tel+"").substr(0,4)}}***{{(form.tel+"").substr(8,10)}}
          <el-button style="margin-left: 9em" @click="getCaptcha()" >获取验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码：">
          <el-input v-model="form.captcha" style="width: 45%" placeholder="不重置密码，无需填写"></el-input>
          <el-button @click="clearPassword" style="margin-left: 2em"  >重置密码</el-button>
        </el-form-item>

<!--        <el-form-item label="密码：">-->
<!--          &lt;!&ndash;          {{form.email}}&ndash;&gt;-->
<!--          <el-input v-model="form.password" type="password" show-password ></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="权限：">
          <el-select v-model="form.post" placeholder="请选择" style="width: 45%">
            <el-option key="admin" label="管理员" value="admin"></el-option>
            <el-option key="user" label="用户" value="user"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
                <span class="dialog-footer">
                  <el-button type="primary"   @click="updateUser">更新信息</el-button>
                  <el-button @click="editVisible = false">取 消</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
import axios from "axios";
import {useStore} from "vuex";

export default {
  name: "basetable",
  setup() {
    const query = ref({});
    const query2 = ref({});
    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const users = ref([]);
    const getUsers = () => {
      return axios.get("/user/").then(res => {
        users.value = res.data;
      }).catch(e => {
        ElMessage.error(e);
      });
    }
    const userPostType = ref({});
    const userMap = ref({});
    const createTypes = () => {
      users.value.forEach(e => {
        // if(!roomType.value[e.type]) {
        userPostType.value[e.post] = []
        userMap.value[e.id] = ref(e);
      });
    }
    const userTypeChinese = reactive({
      "admin": "管理员",
      "user" :"用户"
    })
    const userResult = ref(users)
    const handleTypeChange = () => {
      // console.log(query.type)
      // console.log(users.value)
      userResult.value = users.value.filter(user => user.post === query.post)
    }
    onMounted(async ()=>{
      await getUsers();
      createTypes();
      // console.log(users.value)

    })
    // clean filter
    const cleanFilter = () => {
      query.value = {};
      query2.value={};
      isSearch.value = false;
      // console.log(query.value)
      // console.log(users.value);
    }

    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      // getData();
    };

    // 删除操作
    const handleDelete = (index,row) => {
      // 二次确认删除
      // console.log("here")
      // console.log(row.id)
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        // console.log("delete")
        return axios.delete("/user/" + row.id).then(async res =>{
          ElMessage.success("删除成功");
          filterUsers.value.splice(index, 1);
          await getUsers();
        }).catch(e =>{
          // console.log(e)
          ElMessage.error(e)
        })
      }).catch(() => {});
    };
    const updateUser = () => {
      return axios.patch("/user/", form.value).then(async res => {
        ElMessage.success("更新用户信息成功！");
        userMap.value[form.value.id].post = form.value.post;
        userMap.value[form.value.id].name = form.value.name;
        userMap.value[form.value.id].email = form.value.email;
        userMap.value[form.value.id].password = form.value.password;
        // userMap.value[form.value.id].capacity = form.value.capacity;
        editVisible.value = false;
      }).catch(e => {
        ElMessage.error(e);
      })
    }


    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    const isSearch = ref(false);
    let form = ref({});
    let idx = -1;

    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };

    // 查询操作
    const filterUsers = computed(() => {
      return users.value.filter((user) => {
        for (const key in query.value) {
          if (user[key] != query.value[key]) {
            return false;
          }
        }
        return true;
      })
    })

    const handleEdit = async (index, row) => {
      form.value.index = index;
      form.value = {...row};

      editVisible.value = true;
    };



    const clearPassword =()=>{
      //获取验证码
      // console.log(form.value.password === "123456")
      if (form.value.password === "123456"){
        ElMessage.error("密码已为重置密码，无需重置！")
      }else if (!form.value.captcha){
        ElMessage.error("请填写验证码！")
        form.value.captchaBackend = "";
        form.value.captcha = "";
      }
      else if (parseInt(form.value.captchaBackend) === parseInt(form.value.captcha)){
        ElMessage.success("已重置密码！")
        form.value.password = "123456";
        updateUser();
      }else if (parseInt(form.value.captchaBackend) !== parseInt(form.value.captcha)) {
        ElMessage.error("验证码错误！")
        form.value.captchaBackend = "";
        form.value.captcha = "";
      }
    };

    const getCaptcha = async () =>{
      //获取验证码
      // console.log()
      if (form.value.tel){
        ElMessage.success("已获取验证码！")
        const captcha = await getCaptchaByBackend(form.value.tel);
        // console.log(captcha)
        form.value.captchaBackend = captcha;
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
      query,
      query2,
      tableData,
      pageTotal,
      editVisible,
      form,
      // handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
      userPostType,
      // campusType,
      // storeyType,
      // floorType,
      userTypeChinese,
      users,
      userResult,
      handleTypeChange,
      cleanFilter,
      filterUsers,
      // store,
      updateUser,
      getCaptcha,
      clearPassword
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.gray{
  color: #777777;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

</style>

<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 信息管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>通知管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="query.date" placeholder="日期" class="handle-select mr10">
          <el-option v-for="(item) in Object.keys(messageDateType)" :label="new Date(parseInt(item)).toLocaleDateString()"  v-bind:value="item">
<!--            <span>{{ new Date(item).toLocaleDateString()}}</span>-->
            {{ new Date(parseInt(item)).toLocaleDateString() }}
          </el-option>
        </el-select>
        <el-select v-model="query.name" placeholder="发布人员" class="handle-select mr10">
          <el-option v-for="(item) in Object.keys(messageUserType)" :label="item"  v-bind:value="item">
            <!--            <span>{{ new Date(item).toLocaleDateString()}}</span>-->
<!--            {{ new Date(parseInt(item)).toLocaleDateString() }}-->
          </el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-search" @click="cleanFilter">清空筛选条件</el-button>
      </div>
      <el-table :data="filterMessages" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column type="expand">
          <template #default="scope">
            <el-form label-position="left" >
              <el-form-item label="正文：">
                <span v-html="scope.row.message"></span>
              </el-form-item>
              <el-form-item label="发布人员：">
                <span>{{scope.row.name}}</span>
              </el-form-item>
              <el-form-item label="发布时间：">
                <span>{{ new Date(scope.row.date).toLocaleDateString()}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
<!--        <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>-->

        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="name" label="发布人员" align="center"></el-table-column>
        <el-table-column prop="date" label="发布时间" align="center">
          <template #default="scope">
            <span>{{ new Date(scope.row.date).toLocaleDateString()}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #default="scope" >
            <el-button type="text" icon="el-icon-edit"   @click="handleEdit(scope.$index, scope.row)"  >更新信息
            </el-button>
            <el-button type="text" icon="el-icon-delete"   @click="handleDelete(scope.$index, scope.row)" style="color: red" >删除信息
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
    <el-dialog title="更新信息"  center v-model="editVisible" width="30%">
      <el-form :model="form" label-width="90px">
        <el-form-item label="序号：">{{form.id}}</el-form-item>
        <el-form-item label="标题：">{{form.title}}</el-form-item>
        <el-form-item label="日期：">
          {{ new Date(form.date).toLocaleDateString()}}
        </el-form-item>
        <el-form-item label="正文：">
<!--          <el-input v-model="form.message" ></el-input>-->
          <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 10}" v-model="form.message2"></el-input>
        </el-form-item>
        <el-form-item label="发布人员：">{{form.name}}</el-form-item>

      </el-form>
      <template #footer>
                <span class="dialog-footer">
                  <el-button type="primary"   @click="updateMessage">更新信息</el-button>
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
    const messages = ref([]);

    const getMessages =  () => {
      console.log("getMessage")
      return axios.get("/message/" ).then(res => {
        messages.value = res.data;
      }).catch(e => {

        ElMessage.error(e);
      })
    };
    const selectUser = (userId) =>{
      return axios.get("/user/"+userId).then(res => {

        if (res.data.length !== 0) {
          return res.data;
        }
      }).catch(e =>{
        ElMessage.error(e);
      })
    };

    // const MessageTypeChinese = reactive({
    //   : "管理员"
    // })
    const messageDateType = ref({});
    const messageUserType = ref({});
    const messageMap = ref({});
    const createDates = () => {
      messages.value.forEach(async (e, index)=> {
        const user = await selectUser(e.userId);

        const matchReg = /.+?(?=<br>)/g;
        const temp =  e.message.match(matchReg);
        if (temp){
          e.message2 = temp[0]
        }else {
          e.message2 = e.message;
        }
        e.name = user.name;

        messageDateType.value[e.date] = []
        messageUserType.value[e.name] = []
        // messageDateType.value[new Date(e.date).toLocaleDateString()] = []
        // console.log(e.date)
        // console.log()
        messageMap.value[e.id] = ref(e);
      });
    }

    const messageResult = ref(messages)
    const handleDateChange = () => {

      messageResult.value = messages.value.filter(message => message.date === query.date)
    }
    onMounted(async ()=>{
      await getMessages();
      createDates();


    })
    // clean filter
    const cleanFilter = () => {
      query.value = {};
      query2.value={};
      isSearch.value = false;

    }

    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      // getData();
    };

    // 删除操作
    const handleDelete = (index,row) => {
      // 二次确认删除

      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {

        return axios.delete("/message/" + row.id).then(async res =>{
          ElMessage.success("删除成功");
          filterMessages.value.splice(index, 1);
          await getMessages();
          createDates();
        }).catch(e =>{
          ElMessage.error(e)
        })
      }).catch(() => {});
    };
    const updateMessage = () => {
      form.value.message = form.value.message2;
      form.value.date = new Date().getTime();
      console.log("update")
      return axios.patch("/message/update/", form.value).then(async res => {
        ElMessage.success("更新通知信息成功！");
        messageMap.value[form.value.id].message = form.value.message;
        messageMap.value[form.value.id].message2 = form.value.message;
        messageMap.value[form.value.id].date = form.value.date;
        editVisible.value = false;
        await getMessages();
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
    const filterMessages = computed(() => {
      return messages.value.filter((message) => {
        for (const key in query.value) {
          if (message[key] != query.value[key]) {
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

    return {
      query,
      query2,
      tableData,
      pageTotal,
      editVisible,
      form,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
      messages,
      messageResult,
      handleDateChange,
      cleanFilter,
      filterMessages,
      updateMessage,
      messageDateType,
      messageUserType
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

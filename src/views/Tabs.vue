<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 通知显示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`共有消息：${messages.length}条`" >
                    <el-table :data="messages" :show-header="true" style="width: 100%"   >
<!--                      <el-table-column type="expand">-->
<!--                        <template slot-scope="props" label-position="left" >-->
<!--                            <span class="message">{{scope.row.message}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->

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

                        <el-table-column label="标题"  style="width: 60%">
                            <template #default="scope">
                                <div class="message-title">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                      <el-table-column label="发布人员" style="width: 20%" >
                        <template #default="scope">
                          <div class="message-title">{{scope.row.name}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column  label="发布时间"  style="width: 20%">
                          <template #default="scope">
                            <div class="message-date">{{ new Date(scope.row.date).toLocaleDateString()}}</div>
                          </template>
                      </el-table-column>
<!--                      <el-table-column width="180"  label="正文" >-->
<!--                        <template #default="scope" slot-scope="props">-->
<!--                        </template>-->
<!--                      </el-table-column>-->

                    </el-table>

                </el-tab-pane>

            </el-tabs>
        </div>
    </div>
</template>

<script>
import {ref,onMounted} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";


export default {
    name: "tabs",
    setup() {
      const messages = ref([]);
      const getMessages =  () => {
        return axios.get("/message/" ).then(res => {
          messages.value = res.data;

          messages.value.forEach(async message => {
            const user = await selectUser(message.userId);

            message["name"] = user.name;

          })

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

      onMounted(async () => {
        await getMessages();
      });

      return {
        messages
      };
    },
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>


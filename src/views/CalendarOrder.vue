<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 根据日历预约
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-calendar v-model="value" @click="handleEdit(value)" >
              <template #dateCell="{ data }" >
                <el-tag v-for="item in dateMap[data.day]" :key="item.id"
                    type="info" class="mx-1" effect="dark">{{item.roomId}}: {{ item.log }}</el-tag>
              </template>
              </el-calendar>
            </div>
        </div>


        <el-dialog title="查看"  center v-model="editVisible" width="30%">
            <el-form :model="form" label-width="90px">

                <el-form-item label="房间号：">{{form.room}}
<!--                    <el-input v-model=""></el-input>-->
                </el-form-item>
                <el-button type="primary" @click="pushDateAndTime">预 约</el-button>


            </el-form>

        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
import axios from "axios";
import {useStore} from "vuex";
import router from "../router";
const value = ref(new Date())

export default {
    name: "basetable",
    setup() {

    let form = ref({});
    const data = ref({});
    const editVisible = ref(false);
    const getLogs = () => {
      return axios.get("/log/").then(res => {
        data.value = res.data;
      }).catch(e => {
        ElMessage.error(e.response.data);
      })
    }
    onMounted(async ()=>{
      await getLogs();
      createMap();
    })

    // let date;
    // let time;

    const handleEdit = (data)=>{

      form.value.room = data;
      editVisible.value = true;

    }
    function formatDate(date) {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
    const dateMap = ref({})
    const createMap = () => {
      for (let i = 0 ;i <data.value.length ; i++){
        const date = formatDate(data.value[i].date)
        if (!dateMap.value[date])
          dateMap.value[date] = []
        dateMap.value[date].push(data.value[i]);
      }
    }
    const pushDateAndTime =(date,time) => {
      router.push({
        name: "basetable",
        params: {
          date: date,
          time: time
        }
      })
    }
    return {
      editVisible,
      form,
      handleEdit,
      value,
      dateMap,
      pushDateAndTime
    };
  },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

</style>

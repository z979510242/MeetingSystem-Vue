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
              <el-calendar v-model="value"  @click="handleEdit(value)" >
                <template #dateCell="{ data }">
                  <el-tag v-for="item in dateMap[data.day]" :key="item.id"
                      type="info" class="mx-1" effect="dark">{{item.roomId}}: {{ item.log }}</el-tag>
                </template>
              </el-calendar>
            </div>
        </div>

        <el-dialog title="查看"  center v-model="editVisible" width="40%">
            <el-form :model="form" label-width="90px">
              <el-form-item>
<!--                {{ form.date }}-->
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushDateAndTime(form.date,8)">查看{{ form.date }}  08:00-09:40的预约情况</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushDateAndTime(form.date,10)">查看{{ form.date }}  10:00-11:40的预约情况</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushDateAndTime(form.date,12)">查看{{ form.date }}  12:00-13:40的预约情况</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushDateAndTime(form.date,14)">查看{{ form.date }}  14:00-15:40的预约情况</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushDateAndTime(form.date,16)">查看{{ form.date }}  16:00-17:40的预约情况</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushDateAndTime(form.date,18)">查看{{ form.date }}  18:00-19:40的预约情况</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushDateAndTime(form.date,20)">查看{{ form.date }}  20:00-21:40的预约情况</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="pushDateAndTime(form.date,22)">查看{{ form.date }}  22:00-23:40的预约情况</el-button>
              </el-form-item>
<!--              <el-form-item label="房间号：">{{form.date}}</el-form-item>-->
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

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

      const format = (time, format)=> {
        let t = new Date(time);
        let tf = function (i) { return (i < 10 ? '0' : '') + i };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
          switch (a) {
            case 'yyyy':
              return tf(t.getFullYear());
              break;
            case 'MM':
              return tf(t.getMonth() + 1);
              break;
            case 'mm':
              return tf(t.getMinutes());
              break;
            case 'dd':
              return tf(t.getDate());
              break;
            case 'HH':
              return tf(t.getHours());
              break;
            case 'ss':
              return tf(t.getSeconds());
              break;
          }
        })
      }
    const handleEdit = (date)=>{
      date = format(date,'yyyy-MM-dd')
      form.value.date = date;

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

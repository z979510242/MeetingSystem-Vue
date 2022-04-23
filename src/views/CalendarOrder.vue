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
              <el-calendar v-model="value"  @click="handleEdit(value)"   >
                <template #dateCell="{ data }" >
                  <div class="cell" v-if="dateMap[data.day]"><p  style="color: #fff">{{ data.day.split('-').slice(1).join('/') }}</p></div>
                  <div class="cell2" v-else><p  style="color: #409eff">{{ data.day.split('-').slice(1).join('/') }}</p></div>
<!--                  <el-tag size="small"  v-for="item in dateMap[data.day]" :key="item.id"-->
<!--                      type="info" class="mx-1" effect="dark">-->
<!--                    {{item.roomInfo}}:{{item.log+":00-"+(parseInt(item.log)+1)+":40"}}-->
<!--                  </el-tag>-->
                </template>
              </el-calendar>
            </div>
        </div>

        <el-dialog title="查看预约情况"  center v-model="editVisible" width="30%">
            <el-form :model="form" label-width="20%" >
              <el-form-item v-for="item in form.data">
                    {{ item.room+"["+item.campus+item.storey+"]"+"    "+item.log+":00 -"+(parseInt(item.log)+1)+":40"}}
                    <el-button type="primary"  style="margin-right: 2em; float: right"  @click="cancelReserve(item.id,form.date,item.log)">取消预约</el-button>
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
import { ref, reactive, onMounted, computed ,onActivated } from "vue";
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
      const store = useStore();
    const getLogs = () => {
      return axios.get("/log/"+store.state.user.id).then(res => {
        data.value = res.data;
      }).catch(e => {
        ElMessage.error(e.response.data);
      })
    }
      const getRoomById = (id) => {
        return axios.get("/room/", {
          params: {
            id: id
          }
        }).then(res => {

          return res.data[0];
        }).catch(e => {
          // console.log(e)
        })
      }
      onActivated(async () =>  {
        await getLogs();
        createMap();
      });
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
    const getLogsByUserAndDate = (date) => {
        return axios.get("/log/UserIdAndDate/" ,{
          params:{
            userId : store.state.user.id,
            date : date
          }
        }).then(res => {
          return res.data;
        }).catch(e => {
          ElMessage.error(e.response.data);
        })
      }
    const handleEdit = async (date)=>{
      date = format(date,'yyyy-MM-dd')
      const date1 = new Date(date).getTime();
      const array = await getLogsByUserAndDate(date1);

      form.value.data = []
      for (let i = 0; i < array.length; i++) {
        const roomInfo = await getRoomById (array[i].roomId);
        // form.value.data[i] = roomInfo.room+"["+roomInfo.campus+roomInfo.storey+"]"+"    "+array[i].log+":00 -"+(parseInt(array[i].log)+1)+":40";
        roomInfo.log = array[i].log
        form.value.data.push(roomInfo)
      }
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
        if (date != null){
          dateMap.value[date] = true;
        }else {
          dateMap.value[date] = false;
        }
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
    };
    const classChecker = (status)=> {
        // const str = row.row[row.column.property]
      // console.log(status)
        let cellBackground = {};
        if ( status == true ) {
          cellBackground.background = "pink";
          return cellBackground;
        }
      };
      const cancelReserve = (roomId,date,log) => {
        const longDate = new Date(date).getTime();
        return axios.delete("/log/", {
          params: {
            roomId: roomId,
            date: longDate,
            log: log
          }
        }).then(async res =>{
          ElMessage.success("取消预约成功！");
          await getLogs();
          await handleEdit(date);
          createMap();
          // form.value.status = false;
          // form.value.userId = null;
        }).catch(e => {
          ElMessage.error(e.response.data.message);
        });
      };

    return {
      editVisible,
      form,
      handleEdit,
      value,
      dateMap,
      pushDateAndTime,
      classChecker,
      cancelReserve,

    };
  },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.cell {
  background: #409eff;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
}
.cell2 {

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
}
</style>

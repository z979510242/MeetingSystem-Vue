<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card shadow="hover" class="mgb20" style="height:152px;" >
          <div class="user-info">
            <img src="../assets/img/img.jpg" class="user-avator" alt/>
            <div class="user-info-cont">
              <div class="user-info-name">{{ store.state.user.name }}</div>
              <div class="user-info-name">账号：{{ store.state.user.id }}</div>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:452px;">
          <template #header>
            <div class="clearfix">
              <span>教室详情</span>
<!--              <router-link to="/table" custom v-slot="{ navigate }">-->
<!--                <el-button @click="navigate" @keypress.enter="navigate" style="float: right; padding: 3px 0" type="text" >预约教室</el-button>-->
<!--              </router-link>-->
            </div>
          </template>
          <router-link to="/calendar" custom v-slot="{ navigate }">
            <el-button @click="navigate" @keypress.enter="navigate" style="float: right; padding: 3px 0; position: relative; z-index: 999" type="text" >预约教室</el-button>
          </router-link>
            <el-tabs type="card">

              <el-tab-pane v-for="(item, index) in Object.keys(roomType)" :label="roomTypeChinese[item]">

                <el-table
                    :data="roomType[item]"
                    stripe
                    height="280"
                    style="width: 100%">

                  <el-table-column
                      prop="room"
                      label="房间">
                  </el-table-column>
                  <el-table-column
                      prop="storey"
                      label="建筑">
                  </el-table-column>
                  <el-table-column
                      prop="campus"
                      label="校区">
                  </el-table-column>
                  <el-table-column
                      prop="record"
                      label="备注">
                  </el-table-column>
                  <el-table-column
                      prop="capacity"
                      label="容量">
                  </el-table-column>
                </el-table>
              </el-tab-pane>

            </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <router-link to="/user" custom v-slot="{ navigate }">
                    <div  @click="navigate" @keypress.enter="navigate" class="grid-num">{{ role }}</div>
                    <div  @click="navigate" @keypress.enter="navigate">权限</div>
                  </router-link>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-message-solid grid-con-icon"></i>
                <div class="grid-cont-right">

                  <router-link to="/tabs" custom v-slot="{ navigate }">
                    <div  @click="navigate" @keypress.enter="navigate" class="grid-num">{{ messageTimes }}</div>
                    <div  @click="navigate" @keypress.enter="navigate">系统消息</div>
                  </router-link>

                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <router-link to="/orders" custom v-slot="{ navigate }">
                    <div @click="navigate" @keypress.enter="navigate" class="grid-num">{{times}}</div>
                    <div @click="navigate" @keypress.enter="navigate" style=" padding: 3px 0" type="text" >预约次数</div>
                  </router-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:503px;">
          <template #header>
            <div class="clearfix">
              <span>预约情况</span>

              <router-link to="/calendar" custom v-slot="{ navigate }">
                <el-button @click="navigate" @keypress.enter="navigate" style="float: right; padding: 3px 0" type="text" >预约教室</el-button>
              </router-link>
            </div>
          </template>

          <el-table :show-header="true" :data="logs" height="420" style="width:100%;">
            <el-table-column width="40">
              <template #default="scope">
              </template>
            </el-table-column>
            <el-table-column label="教室">
              <template #default="scope">
                <div class="todo-item" :class="{'todo-item-del': scope.row.status,
                'red': scope.row.color}" @click="handleLogClick(scope.row.roomId)">{{ scope.row.room }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="日期">
              <template #default="scope">
                <div class="todo-item" :class="{'todo-item-del': scope.row.status,
                'red': scope.row.color}"  @click="handleLogClick(scope.row.roomId)">{{ new Date(scope.row.date).toLocaleDateString() }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="时间">
              <template #default="scope">
                <div class="todo-item" :class="{'todo-item-del': scope.row.status,
                'red': scope.row.color}"  @click="handleLogClick(scope.row.roomId)">{{ scope.row.log }}:00  -   {{ parseInt(scope.row.log) + 1 }}:40
                </div>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
              title="会议室详细信息"
              v-model="dialogVisible"
              width="30%">
            <el-form :model="dialogRoom">
<!--              <el-form-item label="RoomId: " prop="pass">-->
<!--                {{dialogRoom.id}}-->
<!--              </el-form-item>-->
              <el-form-item label="建筑: " prop="pass">
                {{dialogRoom.storey}}
              </el-form-item>
              <el-form-item label="房间: " prop="pass">
                {{dialogRoom.room}}
              </el-form-item>
              <el-form-item label="校区: " prop="pass">
                {{dialogRoom.campus}}
              </el-form-item>
              <el-form-item label="类别: " prop="pass">
                {{roomTypeChinese[dialogRoom.type]}}
              </el-form-item>
              <el-form-item label="容量: " prop="pass">
                {{dialogRoom.capacity}}
              </el-form-item>
              <el-form-item label="备注: " prop="pass">
                {{dialogRoom.record}}
              </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
        >确定</el-button
        >
      </span>
            </template>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
    </el-row>

  </div>
</template>

<script>
import Schart from "vue-schart";
import {reactive, ref, onMounted} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";

export default {
  name: "dashboard",
  components: {Schart},

  setup() {
    const store = useStore();

    const role = store.state.user.priority === 3 ? "管理员" : "普通用户";


    let logs = ref([])
    const getLogs = () => {
      return axios.get("/log/" + store.state.user.id).then( async res => {
        logs.value = res.data;
        for (let i = 0; i < logs.value.length; i++) {

          const roomInfo = await getRoomById(logs.value[i].roomId);
          let temp  = roomInfo.room+"["+roomInfo.campus+roomInfo.storey+"]"

          logs.value[i].room = temp;


        }
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
    const dialogVisible = ref(false);
    const dialogRoom = ref({})
    const handleLogClick = async (id) => {
      dialogRoom.value = await getRoomById(id);

      dialogVisible.value = true;
    }

    const today = new Date();
    const ifExpired = () => {
      logs.value.forEach(e => {
        const eDate = new Date(e.date);

        if (eDate.getFullYear() < today.getFullYear()){
          e["status"] = true;
          return ;
        }
        if (eDate.getMonth() < today.getMonth()){
          e["status"] = true;
          return ;
        }
        if (eDate.getDate() <= today.getDate() && eDate.getMonth() == today.getMonth() && eDate.getFullYear() == today.getFullYear()) {

          if (parseInt(e.log) + 2 > parseInt(today.getHours()) && parseInt(e.log) <= parseInt(today.getHours()) && eDate.getDate() == today.getDate()) {
            //字变个色
            e["color"] = true;
            e["status"] = false;
            return ;
          }else if (parseInt(e.log) > parseInt(today.getHours()) && eDate.getDate() == today.getDate()){
            e["status"] = false;
            return ;
          }else {
            e["status"] = true;
            return ;
          }
        }
      })
    }
    onMounted(async () => {
      await getLogs();
      ifExpired();
    });

    const rooms = ref([]);
    const getRooms = () => {
      return axios.get("/room/").then(res => {
        rooms.value = res.data;
      }).catch(e => {
        ElMessage.error(e);
      });
    }
    const roomType = ref({});
    const createRoomType = () => {
      rooms.value.forEach(e => {
        if(!roomType.value[e.type]) {
          roomType.value[e.type] = []
        }
        roomType.value[e.type].push(e)
      });
    }
    const roomTypeChinese = reactive({
      "meeting": "会议室",
      "lab" :"实验室"
    })
    onMounted(async ()=>{
      await getRooms();
      createRoomType();

    })
    const times = ref({});
    const countTimes = (id) =>{
      return axios.get("/log/count/"+id).then(res => {
        return res.data;
      }).catch(e => {
        // console.log(e.response.data)
      })
    }
    onMounted(async ()=> {
      times.value = await countTimes(store.state.user.id);
    })
    const messageTimes = ref({});
    const countMessageTimes = () =>{
      return axios.get("/message/count/").then(res => {
        return res.data;
      }).catch(e => {
        // console.log(e.response.data)
      })
    }
    onMounted(async ()=> {
      messageTimes.value = await countMessageTimes();
    })


    return {
      store,
      times,
      messageTimes,
      role,
      logs,
      handleLogClick,
      dialogVisible,
      dialogRoom,
      roomType,
      roomTypeChinese
    };
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 25px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

.red {
  color: red;
}
</style>

<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 所有会议室预约情况查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-date-picker v-model="query2.date" placeholder="日期(必选）"  model="value1" type="date" class="handle-select mr10"></el-date-picker>
              <el-button type="primary" icon="el-icon-search" :disabled="!(query2.date)" @click="handleSearch">搜索</el-button>

                <br><br>
                <el-select v-model="query.type" placeholder="类型" class="handle-select mr10">
                  <el-option v-for="(item) in Object.keys(roomType)" :label="roomTypeChinese[item]" v-bind:value="item">{{roomTypeChinese[item]}}</el-option>
                </el-select>

                <el-select v-model="query.campus" placeholder="校区" class="handle-select mr10">
                  <el-option v-for="(item) in Object.keys(campusType)" :label="item" v-bind:value="item">{{item}}</el-option>
                </el-select>

                <el-select v-model="query.storey" placeholder="建筑" class="handle-select mr10">
                  <el-option v-for="(item) in Object.keys(storeyType)" :label="item" v-bind:value="item">{{item}}</el-option>
                </el-select>

                <el-select v-model="query.floor" placeholder="楼层" class="handle-select mr10">
                  <el-option v-for="(item) in Object.keys(floorType)" :label="item" v-bind:value="item">{{item}}</el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="cleanFilter">清空筛选条件</el-button>

            </div>
            <el-table :data="filterRooms" border class="table" ref="multipleTable" v-if="!isSearch" header-cell-class-name="table-header">
<!--                <el-table-column label="ID" width="70" align="center">-->
<!--                  <template #default="scope">-->
<!--&lt;!&ndash;                    <el-radio v-model="selectRoom" :label="scope.row.id" size="large">&ndash;&gt;-->
<!--                    {{scope.row.id}}-->
<!--&lt;!&ndash;                  </el-radio>&ndash;&gt;-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="room" label="房间号" align="center"></el-table-column>
                <el-table-column prop="storey" label="建筑" align="center"></el-table-column>
                <el-table-column prop="campus" label="校区" align="center"></el-table-column>
                <el-table-column label="类别" align="center">
                  <template #default="scope">{{roomTypeChinese[scope.row.type]}} </template>
                </el-table-column>
                <el-table-column prop="capacity" label="容量" align="center"></el-table-column>
            </el-table>


          <el-table :data="filterLogRooms" border class="table" ref="multipleTable" v-else header-cell-class-name="table-header"
                    :cell-style="classChecker"
                    >
            <el-table-column label="房间" width="220" align="center">
              <template #default="scope">{{scope.row.room}}[{{scope.row.campus}}{{scope.row.storey}}]</template>
            </el-table-column>
            <el-table-column prop="8" label="8:00-9:40" align="center">
              <template #default="scope" >
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`当前预约人员：${scope.row[8]}`"
                    placement="top" v-if="scope.row[8] !== -1"
                >
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[8])"
                           :class="{red : true}"
                           >被预约</el-button>
<!--                  style="color:red"-->
                </el-tooltip>
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[8])" v-else >未预约</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="10" label="10:00-11:40" align="center">
              <template #default="scope" >
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`当前预约人员：${scope.row[10]}`"
                    placement="top" v-if="scope.row[10] !== -1"
                >
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[10])" v-if="scope.row[10] !== -1" :class="{
                  red : true}" >被预约</el-button>
                </el-tooltip>
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[10])" v-else >未预约</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="12" label="12:00-13:40" align="center">
              <template #default="scope" >
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`当前预约人员：${scope.row[12]}`"
                    placement="top" v-if="scope.row[12] !== -1"
                >
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[12])" v-if="scope.row[12] !== -1" :class="{
                  red : true}" >被预约</el-button>
                </el-tooltip>
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[12])" v-else >未预约</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="14" label="14:00-15:40" align="center">
              <template #default="scope" >
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`当前预约人员：${scope.row[14]}`"
                    placement="top" v-if="scope.row[14] !== -1"
                >
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[14])" v-if="scope.row[14] !== -1" :class="{
                  red : true}" >被预约</el-button>
                </el-tooltip>
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[14])" v-else >未预约</el-button>
              </template>
            </el-table-column>
            <el-table-column prop=16 label="16:00-17:40" align="center">
              <template #default="scope" >
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`当前预约人员：${scope.row[16]}`"
                    placement="top" v-if="scope.row[16] !== -1"
                >
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[16])" v-if="scope.row[16] !== -1" :class="{
                  red : true}" >被预约</el-button>
                </el-tooltip>
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[16])" v-else>未预约</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="18" label="18:00-19:40" align="center">
              <template #default="scope" >
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`当前预约人员：${scope.row[18]}`"
                    placement="top" v-if="scope.row[18] !== -1"
                >
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[18])" v-if="scope.row[18] !== -1" :class="{
                  red : true}" >被预约</el-button>
                </el-tooltip>
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[18])" v-else>未预约</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="20" label="20:00-21:40" align="center">
              <template #default="scope" >
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`当前预约人员：${scope.row[20]}`"
                    placement="top" v-if="scope.row[20] !== -1"
                >
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[20])" v-if="scope.row[20] !== -1" :class="{
                  red : true}" >被预约</el-button>
                </el-tooltip>
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row,scope.row[20])" v-else >未预约</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="22" label="22:00-23:40" align="center">
              <template #default="scope" >
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="`当前预约人员：${scope.row[22]}`"
                    placement="top" v-if="scope.row[22] !== -1"
                >
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row ,scope.row[22])" v-if="scope.row[22] !== -1" :class="{
                  red : true}" >被预约</el-button>
                </el-tooltip>
                <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.column.property, scope.row, scope.row[22])" v-else >未预约</el-button>
              </template>
            </el-table-column>
          </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="查看"  center v-model="editVisible" width="30%">
            <el-form :model="form" label-width="90px">
              <el-form-item label="房间号：">{{form.room}}</el-form-item>
              <el-form-item label="建筑：">{{form.storey}}</el-form-item>
              <el-form-item label="校区：">{{form.campus}}</el-form-item>
              <el-form-item label="类型：">{{roomTypeChinese[form.type]}}</el-form-item>
              <el-form-item label="容量：">{{form.capacity}}</el-form-item>
              <template  v-if="form.status">
                <el-form-item label="预约人员：">{{form.name}}
                </el-form-item>
                <el-form-item label="工号：">{{form.userId}}
                </el-form-item>
                <el-form-item label="联系方式：">
                  {{(form.tel+"").substr(0,4)}}***{{(form.tel+"").substr(8,10)}}
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item label="未被预约"></el-form-item>
              </template>
            </el-form>
            <template #footer>
                <span class="dialog-footer">

                  <el-button type="primary" v-show="!form.userId" :disabled="!form.statusDate"  @click="reserve(form.log)">预 约</el-button>
                  <el-button type="primary" v-show="form.status && form.userId === store.state.user.id" :disabled="!form.statusDate"  @click="cancelReserve(form.log)">取消预约</el-button>
                  <el-button type="danger" v-show="form.status && form.userId !== store.state.user.id" :disabled="!form.statusDate"  @click="powerReserve(form.log)" >强行预约</el-button>
                  <el-button @click="editVisible = false">取 消</el-button>

<!--                    <el-button type="primary" @click="saveEdit">确 定</el-button>-->
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
        const selectRoom = ref(null);
      const rooms = ref([]);
      const getRooms = () => {
        return axios.get("/room/").then(res => {
          rooms.value = res.data;
        }).catch(e => {
          ElMessage.error(e);
        });
      }
      const roomType = ref({}), campusType = ref({}),storeyType = ref({}),floorType = ref({});
      const roomMap = ref({});
      const createTypes = () => {
        rooms.value.forEach(e => {
            roomType.value[e.type] = []
            campusType.value[e.campus] = []
          storeyType.value[e.storey] = []
          floorType.value[e.floor] = []
          roomMap.value[e.id] = ref(e);
        });
      }
      const roomTypeChinese = reactive({
        "meeting": "会议室",
        "lab" :"实验室"
      })
      const roomResult = ref(rooms)
      const handleTypeChange = () => {

        roomResult.value = rooms.value.filter(room => room.type === query.type)
      }
      onMounted(async ()=>{
        await getRooms();
        createTypes();
      })
        // clean filter
      const cleanFilter = () => {
        query.value = {};
        // selectRoom.value = null;
        // query2.value={};
        // isSearch.value = false;
        // roomLogs.value = [];

      }

        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
        };

        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    ElMessage.success("删除成功");
                    tableData.value.splice(index, 1);
                })
                .catch(() => {});
        };
      const judgeTime = (roomId, date, log) => {
        return axios.get("/room/judge/", {
          params: {
            roomId: roomId,
            date: date,
            log: log
          }
        }).then(res => {

          if (res.data.length === 0) {
            return true;
          }
          return false;
        }).catch(e => {
          return false;
        });
      }

      // const judgeUser = ref([]);
      // const orderUser = ref([]);
      const store = useStore();


      const selectUser = (userId) =>{
        return axios.get("/user/"+userId).then(res => {

          if (res.data.length !== 0) {
            return res.data;
          }
        }).catch(e =>{
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
      const filterRooms = computed(() => {
        return rooms.value.filter((room) => {
          for (const key in query.value) {
            if (room[key] !== query.value[key]) {
              return false;
            }
          }
          return true;
        })
      })
      const filterLogRooms = computed(() => {
        return roomLogs.value.filter((room) => {
          for (const key in query.value) {
            if (room[key] !== query.value[key]) {
              return false;
            }
          }
          return true;
        })
      })
      const updateFilterStatus = (sec, today) => {
        filterRooms.value.forEach(async (room, index) => {
          const status = await judgeTime(room.id, sec.getTime(), query2.value.time);

          // await judgeRoomsUser(room.id, sec.getTime(), query2.value.time);
          let statusDate = true;
          // const find = rooms.value.find(r => r.id === room.id);

          if (sec<today){
            statusDate=false;
          }

          roomMap.value[room.id].status = status;
          roomMap.value[room.id].statusDate = statusDate;


        })
      }
      const roomLogs = ref([])
      const handleSearch = async () => {
        roomLogs.value = [];
        for (const room of rooms.value) {
          const findRoomLogs = await findLogByRoomIdAndDate(room.id,query2.value.date.getTime())
          let roomMap2 = {};
          if (findRoomLogs) {
            findRoomLogs.forEach(roomLog => {
              roomMap2[roomLog.log] = roomLog.userId;
            })
          }
          let item = room;
          for (let i = 8; i <= 22; i+=2) {
            // item[i] = !!roomMap2[i];
            if (roomMap2[i]){
              let user =await selectUser(roomMap2[i]);

              item[i] = user.name+"["+user.id+"]"
              // item[i] = roomMap2[i];
            }else {
              item[i] = -1;
            }

          }

          const today = new Date();
          const sec = new Date(query2.value.date);
          // sec.setHours(sec.getHours()+i);
          let statusDate = true;
          if ( sec<today) {
            statusDate = false;
          }
          item["statusDate"] = statusDate;

          roomLogs.value.push(item);
        }


        isSearch.value = true;
      };

      const findLogByRoomIdAndDate = (roomId, date) => {
        return axios.get("/log/RoomIdAndDate/", {
          params: {
            roomId: roomId,
            date: date,
          }
        }).then(res => {
          if (res.data.length !== 0) {
            return res.data
          }
        }).catch(e => {
          ElMessage.error(e);
        });
      }


      const handleEdit = async (col, row,userId) => {

        form.value = reactive(row);
        form.value.log = col;

        if (userId !== -1){
          form.value.status = true;

          // let userId2 = userId.substr(userId.length-2 ,1)

          //TEST[1]  [ ]
          const regex =/\[([^)]+)\]/;

          let userId2 = regex.exec(userId)[1]

          let user = await selectUser(userId2);
          form.value.name = user.name;
          form.value.tel = user.tel;
          form.value.userId = user.id;
        }else {
          form.value.status = false;
        }
        editVisible.value = true;
      };

      // reserve
      const reserve = (log) => {
        const time = new Date(query2.value.date);
        return axios.post("/log/insert/", {
          userId: store.state.user.id,
          date: time.getTime(),
          roomId: form.value.id,
          log: log
        }).then(res => {

          ElMessage.success("预约成功！");
          form.value.userId = store.state.user.id;
          form.value.tel = store.state.user.tel;
          form.value.name = store.state.user.name;
          form.value[log] = store.state.user.name+"["+store.state.user.id+"]";
          form.value.status = true;

        }).catch(e => {
          ElMessage.error(e.response.data.message);
        })
      };
      const cancelReserve = (log) => {
        const time = new Date(query2.value.date);
        return axios.delete("/log/", {
          params: {
            roomId: form.value.id,
            date: time.getTime(),
            log: log
          }
        }).then(res => {

          ElMessage.success("取消预约成功！");
          form.value.status = false;
          form.value.userId = null;
          form.value[log] = -1;
        }).catch(e => {
          ElMessage.error(e.response.data.message);
        });
      };
      const powerReserve = (log)=>{
        const time = new Date(query2.value.date);
        return axios.patch("/log/", {
            userId: store.state.user.id,
          roomId: form.value.id,
          date: time.getTime(),
          log: log
        }).then(res => {

          ElMessage.success("强行预约成功！");
          form.value.userId = store.state.user.id
          form.value.tel = store.state.user.tel;
          form.value.name = store.state.user.name;
          form.value[log] = store.state.user.name+"["+store.state.user.id+"]";
          form.value.status = true;

          handleSearch();
        }).catch(e => {
          ElMessage.error(e.response.data.message);
        });
      };
      const classChecker = ( row, column )=> {
        // const str = row.row[row.column.property]
        // let cellBackground = {};
        //   if ( row.column.property && str!== -1 ) {
        //     cellBackground.background = "pink";
        //     return cellBackground;
        //   }
      };
        return {
            query,
            query2,
            tableData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
          roomType,
          campusType,
          storeyType,
          floorType,
          roomTypeChinese,
          rooms,
          roomResult,
          handleTypeChange,
          cleanFilter,
          filterRooms,
          filterLogRooms,
          store,
          isSearch,
          reserve,
          cancelReserve,
          powerReserve,
          selectRoom,
          roomLogs,
          classChecker
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
.greenClass {
  background: green;
}
.redClass {
  background: red;
}

</style>

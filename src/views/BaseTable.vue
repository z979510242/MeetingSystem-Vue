<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 教室预约
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

              <el-date-picker v-model="query2.date" placeholder="日期(必选）"  model="value1" type="date" class="handle-select mr10"></el-date-picker>
              <el-select v-model="query2.time" placeholder="时间(必选）" class="handle-select mr10">
                <el-option key="1" label="8:00-9:40" value="8"></el-option>
                <el-option key="2" label="10:00-11:40" value="10"></el-option>
                <el-option key="3" label="12:00-13:40" value="12"></el-option>
                <el-option key="4" label="14:00-15:40" value="14"></el-option>
                <el-option key="5" label="16:00-17:40" value="16"></el-option>
                <el-option key="6" label="18:00-19:40" value="18"></el-option>
                <el-option key="7" label="20:00-21:40" value="20"></el-option>
                <el-option key="8" label="22:00-23:00" value="22"></el-option>
              </el-select>
              <el-button id="search" type="primary" icon="el-icon-search" :disabled="!(query2.date && query2.time)" @click="handleSearch">搜索</el-button>
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
            <el-table-column prop="room" label="房间号" align="center"></el-table-column>
            <el-table-column prop="storey" label="建筑" align="center"></el-table-column>
            <el-table-column prop="campus" label="校区" align="center"></el-table-column>
            <el-table-column label="类别" align="center">
              <template #default="scope">{{roomTypeChinese[scope.row.type]}} </template>
            </el-table-column>
            <el-table-column prop="record" label="备注" align="center"></el-table-column>
            <el-table-column prop="capacity" label="容量" align="center"></el-table-column>
          </el-table>

          <el-table :data="filterRooms" border class="table" ref="multipleTable"  v-if="isSearch"  header-cell-class-name="table-header">
              <el-table-column prop="room" label="房间号" align="center"></el-table-column>
              <el-table-column prop="storey" label="建筑" align="center"></el-table-column>
              <el-table-column prop="campus" label="校区" align="center"></el-table-column>
              <el-table-column label="类别" align="center">
                <template #default="scope">{{roomTypeChinese[scope.row.type]}} </template>
              </el-table-column>
              <el-table-column prop="record" label="备注" align="center"></el-table-column>
              <el-table-column prop="capacity" label="容量" align="center"></el-table-column>
              <el-table-column label="时间" align="center" width="300"  >
                <template #default="scope">
                  <span v-if="query2.time && query2.date"  v-show="isSearch">{{new Date(query2.date).toLocaleDateString()+" "+query2.time+":00-"+(parseInt(query2.time)+1)+":40"}}</span>
                  <span v-else></span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180" align="center">
                  <template #default="scope" >
                      <el-button type="text" icon="el-icon-edit" v-show="isSearch" @click="handleEdit(scope.$index, scope.row)" v-if="!scope.row.statusDate"  :class="{
                        gray: !scope.row.statusDate}">查看
                      </el-button>
                    <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.statusDate && !scope.row.status" :class="{red : true}" >已被预约
                    </el-button>
                    <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.statusDate && scope.row.status" >预约
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
        <el-dialog title="查看"  center v-model="editVisible" width="30%">
            <el-form :model="form" label-width="90px">
              <el-form-item label="房间号：">{{form.room}}
              </el-form-item>
              <el-form-item label="建筑：">{{form.storey}}
              </el-form-item>
              <el-form-item label="校区：">{{form.campus}}
              </el-form-item>
              <el-form-item label="类型：">{{roomTypeChinese[form.type]}}
              </el-form-item>
              <el-form-item label="容量：">{{form.capacity}}
              </el-form-item>
              <template  v-if="!form.status">
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
                  <el-button type="primary" v-show="!form.userId" :disabled="!form.statusDate"  @click="reserve">预 约</el-button>
                  <el-button type="primary" v-show="!form.status && form.userId === store.state.user.id" :disabled="!form.statusDate"  @click="cancelReserve">取消预约</el-button>
                  <el-button type="danger" v-show="!form.status && form.userId !== store.state.user.id" :disabled="!form.statusDate"  @click="powerReserve" >强行预约</el-button>
                  <el-button @click="editVisible = false">取 消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed, onActivated } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
import {useStore} from "vuex";

export default {
    name: "basetable",
    props: ["date", "time"],
    setup(props) {


      const query = ref({});
      const query2 = ref({});
      query2.value.time = props.time;
      query2.value.date = props.date;

      const tableData = ref([]);
      const pageTotal = ref(0);
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
      onActivated(() =>  {
        if (props.time){
          query2.value.time = props.time;
          query2.value.date = props.date;
          // handleSearch();
          setTimeout(() => {
            document.getElementById("search").click();
          }, 200);

        }
      });
      onMounted(async ()=>{
        await getRooms();
        createTypes();
      })

      const cleanFilter = () => {
        query.value = {};
        query2.value={};
        isSearch.value = false;
      }
      const handlePageChange = (val) => {
          query.pageIndex = val;
      };
      const handleDelete = (index) => {
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
      const store = useStore();
      const judgeRoomsUser = (roomId, date, log) => {
        return axios.get("/room/judge/", {
          params: {
            roomId: roomId,
            date: date,
            log: log
          }
        }).then(res => {
          if (res.data.length !== 0) {
            return res.data
          }
        }).catch(e => {
          ElMessage.error(e);
        });
      }
      const selectUser = (userId) =>{
        return axios.get("/user/"+userId).then(res => {

          if (res.data.length !== 0) {
            return res.data;
          }
        }).catch(e =>{
          ElMessage.error(e);
        })
      }
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
      const updateFilterStatus = (sec, today) => {

        filterRooms.value.forEach(async (room, index) => {
          const status = await judgeTime(room.id, sec.getTime(), query2.value.time);

          let statusDate = true;
          if (sec<today){
            statusDate=false;
          }
          roomMap.value[room.id].status = status;
          roomMap.value[room.id].statusDate = statusDate;


        })
      }
      const handleSearch = () => {

        const sec = new Date(query2.value.date);
        const time = query2.value.time;
        const today = new Date();
        sec.setHours(sec.getHours()+parseInt(time));
        updateFilterStatus(sec, today);
        isSearch.value = true;
      };
      const handleEdit = async (index, row) => {
        const sec = new Date(query2.value.date);
        const judge = await judgeRoomsUser(row.id, sec.getTime(), query2.value.time);
        let user;
        if (judge != null){
           user = await selectUser(judge.userId);
        }

        form.value = reactive(row);
        if (!form.value.status){
          form.value.userId = judge.userId;
          form.value.name = user.name;
          form.value.tel = user.tel;
        }
        editVisible.value = true;
      };
      const reserve = () => {
        return axios.post("/log/insert/", {
          userId: store.state.user.id,
          date: new Date(query2.value.date).getTime(),
          roomId: form.value.id,
          log: query2.value.time
        }).then(res => {

          ElMessage.success("预约成功！");
          form.value.userId = res.data.userId
          form.value.tel = store.state.user.tel;
          form.value.name = store.state.user.name;
          form.value.status = false;

        }).catch(e => {
          ElMessage.error(e.response.data.message);
        })
      };
      const cancelReserve = () => {
        return axios.delete("/log/", {
          params: {
            roomId: form.value.id,
            date: new Date(query2.value.date).getTime(),
            log: query2.value.time
          }
        }).then(res => {

          ElMessage.success("取消预约成功！");
          form.value.status = true;
          form.value.userId = null;
        }).catch(e => {
          ElMessage.error(e.response.data.message);
        });
      };
      const powerReserve = ()=>{
        return axios.patch("/log/", {
            userId: store.state.user.id,
            roomId: form.value.id,
            date: new Date(query2.value.date).getTime(),
            log: query2.value.time
        }).then(res => {

          ElMessage.success("强行预约成功！");
          form.value.userId = res.data.userId
          form.value.tel = store.state.user.tel;
          form.value.name = store.state.user.name;
          form.value.status = false;

          handleSearch();
        }).catch(e => {
          ElMessage.error(e.response.data.message);
        });
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
          store,
          isSearch,
          reserve,
          cancelReserve,
          powerReserve
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

.table {
    width: 100%;
    font-size: 14px;
}

.mr10 {
    margin-right: 10px;
}
.red {
  color: red;
}
.gray {
  color: #777777;
}

</style>

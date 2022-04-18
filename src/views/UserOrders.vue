<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户预约清单
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
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

              <el-select v-model="query.date" placeholder="日期" class="handle-select mr10">
                <el-option v-for="(item) in Object.keys(dateType)" :label="new Date(parseInt(item)).toLocaleDateString()"  v-bind:value="item">
                  <!--            <span>{{ new Date(item).toLocaleDateString()}}</span>-->
                  {{ new Date(parseInt(item)).toLocaleDateString() }}
                </el-option>
              </el-select>
              <el-select v-model="query.log" placeholder="时间" class="handle-select mr10">
                <el-option v-for="(item) in Object.keys(logType)" :label="`${item}:00~${parseInt(item)+1}:40`" v-bind:value='item'>
                  {{`${item}:00~${parseInt(item)+1}:40`}}
                </el-option>
              </el-select>

              <el-button type="primary" icon="el-icon-search" @click="cleanFilter">清空筛选条件</el-button>
            </div>


            <el-table :data="filterLogs" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column label="时间" align="center" width="300">
                  <template #default="scope">
                    <span>{{new Date(scope.row.date).toLocaleDateString()+" "+scope.row.log+":00-"+(parseInt(scope.row.log)+1)+":40"}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="room" label="房间号" align="center"></el-table-column>
                <el-table-column prop="storey" label="建筑" align="center"></el-table-column>
                <el-table-column prop="campus" label="校区" align="center"></el-table-column>
                <el-table-column label="类别" align="center">
                  <template #default="scope">{{roomTypeChinese[scope.row.type]}} </template>
                </el-table-column>
                <el-table-column prop="record" label="备注" align="center"></el-table-column>
                <el-table-column prop="capacity" label="容量" align="center"></el-table-column>


                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope" >
                        <el-button type="text" icon="el-icon-edit" :disabled="true" v-if="!scope.row.statusDate"  :class="{
                          gray: !scope.row.statusDate
                        }">已过期
                        </el-button>
                      <el-button type="text" icon="el-icon-edit"    @click="cancelReserve(scope.row)" v-if="scope.row.statusDate && !scope.row.status && scope.row.userId == store.state.user.id" :class="{red : true}" >取消预约
                      </el-button>

                    </template>
                </el-table-column>
            </el-table>


            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";
import {useStore} from "vuex";

export default {
    name: "basetable",
    setup() {
      const query = ref({});
      const tableData = ref([]);
      const pageTotal = ref(0);
      const rooms = ref([]);
      const logs = ref([]);


      const getRooms = (roomId) => {
        return axios.get("/room/", {
          params: {
            id: roomId
          }
        }).then(res => {
          return res.data;
        }).catch(e => {
          ElMessage.error(e);
        });
      }

      const getLogs = () => {
        return axios.get("/log/" + store.state.user.id).then(res => {
          logs.value = res.data;
        }).catch(e => {
          ElMessage.error(e.response.data);
        })
      }
      const roomType = ref({}), campusType = ref({}),storeyType = ref({}),floorType = ref({}),dateType = ref({}),logType = ref({});
      const logMap = ref({});
      const createTypes = () => {
        logs.value.forEach(async e => {
          updateFilterStatus(e,e.date,new Date().getTime())
          const roomArray = await getRooms(e.roomId);
          e.room = roomArray[0].room;
          e.campus = roomArray[0].campus;
          e.capacity = roomArray[0].capacity;
          e.storey = roomArray[0].storey;
          e.floor = roomArray[0].floor;
          e.type = roomArray[0].type;
          e.record = roomArray[0].record;
          roomType.value[e.type] = []
          campusType.value[e.campus] = []
          storeyType.value[e.storey] = []
          floorType.value[e.floor] = []
          dateType.value[e.date] = []

          logMap.value[e.id] = ref(e);
        });
      }
      const roomTypeChinese = reactive({
        "meeting": "会议室",
        "lab" :"实验室"
      })
      const logResult = ref(rooms)
      onMounted(async ()=>{
        await getLogs();
        createTypes();
        for (let i = 8; i < 22; i+=2) {
          logType.value[i] = [];
        }

      })
        // clean filter
      const cleanFilter = () => {
        query.value = {};
        isSearch.value = false;
      }

        // 分页导航
        const handlePageChange = (val) => {
            query.value.pageIndex = val;
        };

      const store = useStore();

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
      const filterLogs = computed(() => {
        return logs.value.filter((log) => {
          for (const key in query.value) {
            if (log[key] != query.value[key]) {
              return false;
            }
          }
          return true;
        })
      })
      const updateFilterStatus = (log, sec, today) => {
        let statusDate = true;
        // const find = rooms.value.find(r => r.id === room.id);

        if (sec<today){
          statusDate=false;
        }
        log.statusDate = statusDate;

      }

      const handleEdit = async (index, row) => {
        form.value = reactive(row);
        editVisible.value = true;
      };


      const cancelReserve = (log) => {

        return axios.delete("/log/", {
          params: {
            roomId: log.roomId,
            date: new Date(log.date).getTime(),
            log: log.log
          }
        }).then(async res => {

          ElMessage.success("取消预约成功！");
          await getLogs();
          createTypes();
          for (let i = 8; i < 22; i+=2) {
            logType.value[i] = [];
          }
        }).catch(e => {
          ElMessage.error(e.response.data.message);
        });
      };

        return {
          query,
          tableData,
          pageTotal,
          editVisible,
          form,
          handlePageChange,
          handleEdit,
          saveEdit,
          roomType,
          campusType,
          storeyType,
          floorType,
          dateType,
          logType,
          roomTypeChinese,
          rooms,
          logResult,
          cleanFilter,
          filterLogs,
          store,
          isSearch,
          cancelReserve,
          logs,
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

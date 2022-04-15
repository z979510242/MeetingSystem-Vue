<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 信息管理
                </el-breadcrumb-item>
              <el-breadcrumb-item>会议室管理</el-breadcrumb-item>
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

              <el-button type="primary" icon="el-icon-search" @click="cleanFilter">清空筛选条件</el-button>
            </div>
            <el-table :data="filterRooms" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="room" label="房间号" align="center"></el-table-column>
                <el-table-column prop="storey" label="建筑" align="center"></el-table-column>
                <el-table-column prop="campus" label="校区" align="center"></el-table-column>
                <el-table-column label="类别" align="center">
                  <template #default="scope">{{roomTypeChinese[scope.row.type]}} </template>
                </el-table-column>
                <el-table-column prop="capacity" label="容量" align="center"></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                  <template #default="scope" >
                    <el-button type="text" icon="el-icon-edit"   @click="handleEdit(scope.$index, scope.row)"  >更新信息
                    </el-button>
                    <el-button type="text" icon="el-icon-delete"   @click="handleDelete(scope.$index, scope.row)" style="color: red" >删除房间
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

                <el-form-item label="房间号：">{{form.room}}
<!--                    <el-input v-model=""></el-input>-->
                </el-form-item>
              <el-form-item label="建筑：">{{form.storey}}
<!--                <el-input v-model="form.storey"></el-input>-->
              </el-form-item>
              <el-form-item label="校区：">{{form.campus}}
<!--                <el-input v-model="form.campus"></el-input>-->
              </el-form-item>
              <el-form-item label="类型：">
<!--                {{roomTypeChinese[form.type]}}-->
                <el-select v-model="form.type" placeholder="请选择" style="width: 100%">
                  <el-option key="meeting" label="会议室" value="meeting"></el-option>
                  <el-option key="lab" label="实验室" value="lab"></el-option>
                </el-select>
<!--                <el-input v-model="form.type"></el-input>-->
              </el-form-item>
              <el-form-item label="容量：">
<!--                {{form.capacity}}-->
                <el-input v-model="form.capacity" type="number" min="10"  step="10"></el-input>
<!--                <el-input v-model="form.capacity" ></el-input>-->
              </el-form-item>


            </el-form>
            <template #footer>
                <span class="dialog-footer">
<!--                  {{store.state.user.id}}-->
                  <el-button type="primary"   @click="updateRoom">更新信息</el-button>

<!--                  <el-button type="primary" v-show="!form.status && form.userId === store.state.user.id" :disabled="!form.statusDate"  @click="cancelReserve">取消预约</el-button>-->
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
        // 获取表格数据
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
          // if(!roomType.value[e.type]) {
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

              return axios.delete("/room/" + row.id).then(async res =>{
                ElMessage.success("删除成功");
                filterRooms.value.splice(index, 1);
                await getRooms();
              }).catch(e =>{

                ElMessage.error(e)
              })
            }).catch(() => {});
        };
        const updateRoom = () => {
          return axios.patch("/room/", form.value).then(async res => {
            ElMessage.success("更新教室信息成功！");
            roomMap.value[form.value.id].type = form.value.type;
            roomMap.value[form.value.id].capacity = form.value.capacity;
            editVisible.value = false;
          }).catch(e => {
            ElMessage.error(e);
          })
        }
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

      /**
       *
       * @type {ToRef<*[]>}
       */
      const judgeUser = ref([]);
      const orderUser = ref([]);
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
            judgeUser.value = res.data
          }

        }).catch(e => {
          ElMessage.error(e);
        });
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
            if (room[key] != query.value[key]) {
              return false;
            }
          }
          return true;
        })
      })
      const handleSearch = () => {
        const sec = new Date(query2.value.date);
        const time = query2.value.time;
        const today = new Date();
        sec.setHours(sec.getHours()+parseInt(time));

        filterRooms.value.forEach(async (room, index) => {
          const status = await judgeTime(room.id, sec.getTime(), query2.value.time);
          await judgeRoomsUser(room.id, sec.getTime(), query2.value.time);
          let statusDate = true;
          const find = rooms.value.find(r => r.id === room.id);
          if (sec<today){
            statusDate=false;
          }
          form.value.status = status;
          form.value.statusDate = statusDate;
          roomMap.value[room.id].status = status;
          roomMap.value[room.id].statusDate = statusDate;
        })
        isSearch.value = true;
      };
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
          updateRoom
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

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
<!--                <p :class="data.isSelected ? 'is-selected' : ''">-->
<!--                  {{ data.day.split('-').slice(1).join('-') }}-->
<!--                  {{ data.isSelected ? '✔️' : '' }}-->
<!--                </p>-->
                <el-tag v-for="item in dateMap[data.day]" :key="item.id"
                    type="info" class="mx-1" effect="dark">{{item.roomId}}: {{ item.log }}</el-tag>
              </template>
              </el-calendar>
            </div>
        </div>


<!--        <div class="container">-->
<!--            <div class="handle-box">-->

<!--              <el-date-picker v-model="query2.date" placeholder="日期(必选）"  model="value1" type="date" class="handle-select mr10"></el-date-picker>-->
<!--              <el-select v-model="query2.time" placeholder="时间(必选）" class="handle-select mr10">-->
<!--                <el-option key="1" label="8:00-9:40" value="8"></el-option>-->
<!--                <el-option key="2" label="10:00-11:40" value="10"></el-option>-->
<!--                <el-option key="3" label="12:00-13:40" value="12"></el-option>-->
<!--                <el-option key="4" label="14:00-15:40" value="14"></el-option>-->
<!--                <el-option key="5" label="16:00-17:40" value="16"></el-option>-->
<!--                <el-option key="6" label="18:00-19:40" value="18"></el-option>-->
<!--                <el-option key="7" label="20:00-21:40" value="20"></el-option>-->
<!--                <el-option key="8" label="22:00-23:00" value="22"></el-option>-->
<!--              </el-select>-->
<!--              <el-button type="primary" icon="el-icon-search" :disabled="!(query2.date && query2.time)" @click="handleSearch">搜索</el-button>-->
<!--              <br><br>-->
<!--              <el-select v-model="query.type" placeholder="类型" class="handle-select mr10">-->
<!--                    <el-option v-for="(item) in Object.keys(roomType)" :label="roomTypeChinese[item]" v-bind:value="item">{{roomTypeChinese[item]}}</el-option>-->
<!--              </el-select>-->

<!--              <el-select v-model="query.campus" placeholder="校区" class="handle-select mr10">-->
<!--                <el-option v-for="(item) in Object.keys(campusType)" :label="item" v-bind:value="item">{{item}}</el-option>-->
<!--              </el-select>-->

<!--              <el-select v-model="query.storey" placeholder="建筑" class="handle-select mr10">-->
<!--                <el-option v-for="(item) in Object.keys(storeyType)" :label="item" v-bind:value="item">{{item}}</el-option>-->
<!--              </el-select>-->

<!--              <el-select v-model="query.floor" placeholder="楼层" class="handle-select mr10">-->
<!--                <el-option v-for="(item) in Object.keys(floorType)" :label="item" v-bind:value="item">{{item}}</el-option>-->
<!--              </el-select>-->



<!--              <el-button type="primary" icon="el-icon-search" @click="cleanFilter">清空筛选条件</el-button>-->
<!--            </div>-->


<!--          <el-table :data="filterRooms" border class="table" ref="multipleTable" v-if="!isSearch" header-cell-class-name="table-header">-->
<!--            <el-table-column label="ID" width="70" align="center">-->
<!--              <template #default="scope"> {{scope.row.id}}</template>-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="room" label="房间号" align="center"></el-table-column>-->
<!--            <el-table-column prop="storey" label="建筑" align="center"></el-table-column>-->
<!--            <el-table-column prop="campus" label="校区" align="center"></el-table-column>-->
<!--            <el-table-column label="类别" align="center">-->
<!--              <template #default="scope">{{roomTypeChinese[scope.row.type]}} </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="capacity" label="容量" align="center"></el-table-column>-->
<!--          </el-table>-->


<!--            <el-table :data="filterRooms" border class="table" ref="multipleTable"  v-if="isSearch"  header-cell-class-name="table-header">-->
<!--                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>-->
<!--                <el-table-column prop="room" label="房间号" align="center"></el-table-column>-->
<!--                <el-table-column prop="storey" label="建筑" align="center"></el-table-column>-->
<!--                <el-table-column prop="campus" label="校区" align="center"></el-table-column>-->
<!--                <el-table-column label="类别" align="center">-->
<!--                  <template #default="scope">{{roomTypeChinese[scope.row.type]}} </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="capacity" label="容量" align="center"></el-table-column>-->
<!--                <el-table-column label="时间" align="center" width="300"  >-->
<!--                  <template #default="scope">-->
<!--                    <span v-if="query2.time && query2.date"  v-show="isSearch">{{new Date(query2.date).toLocaleDateString()+" "+query2.time+":00-"+(parseInt(query2.time)+1)+":40"}}</span>-->
<!--                    <span v-else></span>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column label="操作" width="180" align="center">-->
<!--                    <template #default="scope" >-->
<!--                        <el-button type="text" icon="el-icon-edit" v-show="isSearch" @click="handleEdit(scope.$index, scope.row)" v-if="!scope.row.statusDate"  :class="{-->
<!--                          gray: !scope.row.statusDate-->
<!--                        }">查看-->
<!--                        </el-button>-->
<!--                      <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.statusDate && !scope.row.status" :class="{red : true}" >已被预约-->
<!--                      </el-button>-->
<!--                      <el-button type="text" icon="el-icon-edit"  v-show="isSearch"  @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.statusDate && scope.row.status" >预约-->
<!--                      </el-button>-->
<!--&lt;!&ndash;                        <el-button type="text" icon="el-icon-delete" class="red"&ndash;&gt;-->
<!--&lt;!&ndash;                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>&ndash;&gt;-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--            <div class="pagination">-->
<!--                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"-->
<!--                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>-->
<!--            </div>-->
<!--        </div>-->

         编辑弹出框
        <el-dialog title="查看"  center v-model="editVisible" width="30%">
            <el-form :model="form" label-width="90px">

                <el-form-item label="房间号：">{{form.room}}
<!--                    <el-input v-model=""></el-input>-->
                </el-form-item>
<!--              <el-form-item label="建筑：">{{form.storey}}-->
<!--&lt;!&ndash;                <el-input v-model="form.storey"></el-input>&ndash;&gt;-->
<!--              </el-form-item>-->
<!--              <el-form-item label="校区：">{{form.campus}}-->
<!--&lt;!&ndash;                <el-input v-model="form.campus"></el-input>&ndash;&gt;-->
<!--              </el-form-item>-->
<!--              <el-form-item label="类型：">{{roomTypeChinese[form.type]}}-->
<!--&lt;!&ndash;                <el-input v-model="form.type"></el-input>&ndash;&gt;-->
<!--              </el-form-item>-->
<!--              <el-form-item label="容量：">{{form.capacity}}-->
<!--&lt;!&ndash;                <el-input v-model="form.capacity"></el-input>&ndash;&gt;-->
<!--              </el-form-item>-->

            </el-form>
<!--            <template #footer>-->
<!--                <span class="dialog-footer">-->
<!--&lt;!&ndash;                  {{store.state.user.id}}&ndash;&gt;-->
<!--                  <el-button type="primary" v-show="!form.userId" :disabled="!form.statusDate"  @click="reserve">预 约</el-button>-->
<!--                  <el-button type="primary" v-show="!form.status && form.userId === store.state.user.id" :disabled="!form.statusDate"  @click="cancelReserve">取消预约</el-button>-->
<!--                  <el-button type="danger" v-show="!form.status && form.userId !== store.state.user.id" :disabled="!form.statusDate"  @click="powerReserve" >强行预约</el-button>-->
<!--                  <el-button @click="editVisible = false">取 消</el-button>-->

<!--&lt;!&ndash;                    <el-button type="primary" @click="saveEdit">确 定</el-button>&ndash;&gt;-->
<!--                </span>-->
<!--            </template>-->
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
import axios from "axios";
import {useStore} from "vuex";
const value = ref(new Date())

export default {
    name: "basetable",
    setup() {
      //   const query = ref({});
      //   const query2 = ref({});
      //   const tableData = ref([]);
      //   const pageTotal = ref(0);
      // const rooms = ref([]);
      // const getRooms = () => {
      //   return axios.get("/room/").then(res => {
      //     rooms.value = res.data;
      //   }).catch(e => {
      //     ElMessage.error(e);
      //   });
      // }
      // const roomType = ref({}), campusType = ref({}),storeyType = ref({}),floorType = ref({});
      // const roomMap = ref({});
      // const createTypes = () => {
      //   rooms.value.forEach(e => {
      //       roomType.value[e.type] = []
      //       campusType.value[e.campus] = []
      //     storeyType.value[e.storey] = []
      //     floorType.value[e.floor] = []
      //     roomMap.value[e.id] = ref(e);
      //
      //   });
      // }
      // const roomTypeChinese = reactive({
      //   "meeting": "会议室",
      //   "lab" :"实验室"
      // })
      // const roomResult = ref(rooms)
      // const handleTypeChange = () => {
      //   console.log(query.type)
      //   console.log(rooms.value)
      //   roomResult.value = rooms.value.filter(room => room.type === query.type)
      // }
      // onMounted(async ()=>{
      //   await getRooms();
      //   createTypes();
      // })
      //   // clean filter
      // const cleanFilter = () => {
      //   query.value = {};
      //   query2.value={};
      //   isSearch.value = false;
      //   console.log(query.value)
      //   console.log(rooms.value);
      // }
      //
      //   // 分页导航
      //   const handlePageChange = (val) => {
      //       query.pageIndex = val;
      //   };
      //
      //   // 删除操作
      //   const handleDelete = (index) => {
      //       // 二次确认删除
      //       ElMessageBox.confirm("确定要删除吗？", "提示", {
      //           type: "warning",
      //       })
      //           .then(() => {
      //               ElMessage.success("删除成功");
      //               tableData.value.splice(index, 1);
      //           })
      //           .catch(() => {});
      //   };
      // const judgeTime = (roomId, date, log) => {
      //   return axios.get("/room/judge/", {
      //     params: {
      //       roomId: roomId,
      //       date: date,
      //       log: log
      //     }
      //   }).then(res => {
      //     console.log(res.data);
      //     if (res.data.length === 0) {
      //       return true;
      //     }
      //     return false;
      //   }).catch(e => {
      //     return false;
      //   });
      // }
      //
      // const judgeUser = ref([]);
      // const orderUser = ref([]);
      // const store = useStore();
      //
      // const judgeRoomsUser = (roomId, date, log) => {
      //   return axios.get("/room/judge/", {
      //     params: {
      //       roomId: roomId,
      //       date: date,
      //       log: log
      //     }
      //   }).then(res => {
      //     if (res.data.length !== 0) {
      //       return res.data
      //     }
      //   }).catch(e => {
      //     ElMessage.error(e);
      //   });
      // }
      // const selectUser = (userId) =>{
      //   return axios.get("/user/"+userId).then(res => {
      //     console.log(res.data);
      //     if (res.data.length !== 0) {
      //       return res.data;
      //     }
      //   }).catch(e =>{
      //     ElMessage.error(e);
      //   })
      // }
      //
      //   // 表格编辑时弹窗和保存

      //   const isSearch = ref(false);

      //   let idx = -1;
      //
      //   const saveEdit = () => {
      //       editVisible.value = false;
      //       ElMessage.success(`修改第 ${idx + 1} 行成功`);
      //       Object.keys(form).forEach((item) => {
      //           tableData.value[idx][item] = form[item];
      //       });
      //   };
      //
      // // 查询操作
      // const filterRooms = computed(() => {
      //   return rooms.value.filter((room) => {
      //     for (const key in query.value) {
      //       if (room[key] != query.value[key]) {
      //         return false;
      //       }
      //     }
      //     return true;
      //   })
      // })
      // const updateFilterStatus = (sec, today) => {
      //   filterRooms.value.forEach(async (room, index) => {
      //     const status = await judgeTime(room.id, sec.getTime(), query2.value.time);
      //     console.log(room.id+" status:")
      //     console.log(status);
      //     // await judgeRoomsUser(room.id, sec.getTime(), query2.value.time);
      //     let statusDate = true;
      //     // const find = rooms.value.find(r => r.id === room.id);
      //
      //     if (sec<today){
      //       statusDate=false;
      //     }
      //     // form.value.status = status;
      //     // form.value.statusDate = statusDate;
      //     roomMap.value[room.id].status = status;
      //     roomMap.value[room.id].statusDate = statusDate;
      //     console.log(roomMap.value[room.id])
      //
      //   })
      // }
      // const handleSearch = () => {
      //   const sec = new Date(query2.value.date);
      //   const time = query2.value.time;
      //   const today = new Date();
      //   sec.setHours(sec.getHours()+parseInt(time));
      //
      //   updateFilterStatus(sec, today);
      //   isSearch.value = true;
      // };

      // const handleEdit = async (index, row) => {
      //   const sec = new Date(query2.value.date);
      //   const judge = await judgeRoomsUser(row.id, sec.getTime(), query2.value.time);
      //   let user;
      //   if (judge != null){
      //      user = await selectUser(judge.userId);
      //   }
      //   console.log(judge)
      //   form.value = reactive(row);
      //   if (!form.value.status){
      //     form.value.userId = judge.userId;
      //     form.value.name = user.name;
      //     form.value.tel = user.tel;
      //   }
      //   editVisible.value = true;
      // };

      // reserve
      // const reserve = () => {
      //   return axios.post("/log/insert/", {
      //     userId: store.state.user.id,
      //     date: new Date(query2.value.date).getTime(),
      //     roomId: form.value.id,
      //     log: query2.value.time
      //   }).then(res => {
      //     console.log(res.data)
      //     ElMessage.success("预约成功！");
      //     form.value.userId = res.data.userId
      //     form.value.tel = store.state.user.tel;
      //     form.value.name = store.state.user.name;
      //     form.value.status = false;
      //     console.log(form);
      //   }).catch(e => {
      //     ElMessage.error(e.response.data.message);
      //   })
      // };
      // const cancelReserve = () => {
      //   return axios.delete("/log/", {
      //     params: {
      //       roomId: form.value.id,
      //       date: new Date(query2.value.date).getTime(),
      //       log: query2.value.time
      //     }
      //   }).then(res => {
      //     console.log(res.data)
      //     ElMessage.success("取消预约成功！");
      //     form.value.status = true;
      //     form.value.userId = null;
      //   }).catch(e => {
      //     ElMessage.error(e.response.data.message);
      //   });
      // };
      // const powerReserve = ()=>{
      //   return axios.patch("/log/", {
      //       userId: store.state.user.id,
      //       roomId: form.value.id,
      //       date: new Date(query2.value.date).getTime(),
      //       log: query2.value.time
      //   }).then(res => {
      //     // console.log(res.data)
      //     ElMessage.success("强行预约成功！");
      //     form.value.userId = res.data.userId
      //     form.value.tel = store.state.user.tel;
      //     form.value.name = store.state.user.name;
      //     form.value.status = false;
      //     console.log("here")
      //     console.log(form.value)
      //     handleSearch();
      //   }).catch(e => {
      //     ElMessage.error(e.response.data.message);
      //   });
      // };
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

      const handleEdit = (data)=>{
        console.log(data)
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
      // createMap();
        return {
            // query,
          // query2,
          //   tableData,
          //   pageTotal,
            editVisible,
            form,
            // handleSearch,
            // handlePageChange,
            // handleDelete,
            handleEdit,
            // saveEdit,
          // roomType,
          // campusType,
          // storeyType,
          // floorType,
          // roomTypeChinese,
          // rooms,
          // roomResult,
          // handleTypeChange,
          // cleanFilter,
          // filterRooms,
          // store,
          // isSearch,
          // reserve,
          // cancelReserve,
          // powerReserve,
          value,
          dateMap,

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

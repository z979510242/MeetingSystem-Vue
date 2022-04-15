<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 信息添加
        </el-breadcrumb-item>
        <el-breadcrumb-item>添加会议室信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row>
        <el-col :span="8">
          <div>
            <el-form ref="formRef" :rules="rules" :model="form" label-width="150px">
              <el-form-item label="房间号" prop="room">
                <el-input v-model="form.room" placeholder="例如：401" ></el-input>
              </el-form-item>

              <el-form-item label="建筑" prop="storey">
                <el-cascader style="width: 100%" :props="{expandTrigger: 'hover'}" v-model="form.storey2" :options="options" @change="handleChange"/>
              </el-form-item>

              <el-form-item label="楼层" prop="floor">
                <el-select v-model="form.floor" placeholder="请选择" style="width: 100%">
                  <el-option key="1" label="1楼" value="1"></el-option>
                  <el-option key="2" label="2楼" value="2"></el-option>
                  <el-option key="3" label="3楼" value="3"></el-option>
                  <el-option key="4" label="4楼" value="4"></el-option>
                  <el-option key="5" label="5楼" value="5"></el-option>
                  <el-option key="6" label="6楼" value="6"></el-option>
                  <el-option key="7" label="7楼" value="7"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="类别" prop="type">
                <el-select v-model="form.type" placeholder="请选择" style="width: 100%">
                  <el-option key="meeting" label="会议室" value="meeting"></el-option>
                  <el-option key="lab" label="实验室" value="lab"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="容量" prop="capacity">
                <el-input v-model="form.capacity" type="number" min="10" :value="10" step="10"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">添加房间</el-button>
                <el-button @click="onReset">重置表单</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-col>
        <el-col :span="16"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
  name: "baseRoomForm",
  setup() {
    const storeys = {
      "铁道学院": ["电子楼", "第一综合楼", "第二综合楼"],
      "新校区": ["信息楼"],
      "校本部": ["本部计算机楼"]

    };
    const options = ref([])
    Object.keys(storeys).forEach(e => {
      let item = {
        label: e,
        value: e,
        children: []
      };
      storeys[e].forEach(storey => {
        item.children.push({
          label: storey,
          value: storey
        });
      });
      options.value.push(item);
    });
    const value = ref([])
    const handleChange = (value) => {
     form.storey = form.storey2[1];
     form.campus = form.storey2[0];
    }
    const rules = {
      room: [
        {required: true, message: "请输入房间号", trigger: "blur"},
      ],
      storey: [
        {required: true, message: "请输入建筑", trigger: "blur"},
      ],
      floor: [
        {required: true, message: "请输入楼层", trigger: "blur"},
      ],
      // campus: [
      //   {required: true, message: "请输入校区", trigger: "blur"},
      // ],
      type: [
        {required: true, message: "请选择类别", trigger: "blur"},
      ],
      capacity: [
        {required: true, message: "请输入容量", trigger: "blur"},
      ],
    };
    const formRef = ref(null);
    const form = reactive({
      room: "",
      storey: "",
      storey2: [],
      floor: "",
      campus: "",
      type: "",
      capacity: "10"
    });
    const insertRoom = () => {
      return axios.post("/room/", form).then(res => {

        ElMessage.success("添加成功！");
        onReset();
      }).catch(e => {
        ElMessage.error(e.response.data.message);
      })
    }
    // 提交
    const onSubmit = () => {
      // 表单校验
      formRef.value.validate(async (valid) => {
        if (valid) {
          await insertRoom();
        } else {
          return false;
        }
      });
    };
    // 重置
    const onReset = () => {
      formRef.value.resetFields();
      form.storey2 = []
    };

    return {
      rules,
      formRef,
      form,
      onSubmit,
      onReset,
      options,
      value,
      handleChange
    };
  },
};
</script>
<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.priority <= store.state.user.priority">
                  <template v-if="item.subs">
                        <el-submenu :index="item.index" :key="item.index">
                          <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                          </template>
                          <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                              <template #title>{{ subItem.title }}</template>
                              <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                          </template>
                        </el-submenu>
                  </template>
                  <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                      <i :class="item.icon"></i>
                      <template #title>{{ item.title }}</template>
                    </el-menu-item>
                  </template>
                </template>
                <template v-else>

                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/dashboard",
                title: "系统首页",
              priority: 2
            },
            {
                icon: "el-icon-lx-cascades",
                index: "/table",
                title: "教室预约",
              priority: 2
            },
          // {
          //   icon: "el-icon-lx-comment",
          //   index: "/rooms",
          //   title: "教室使用情况",
          //   priority: 2
          // },
          {
            icon: "el-icon-lx-comment",
            index: "/AllRooms",
            title: "所有教室使用查询",
            priority: 2
          },
          {
            icon: "el-icon-lx-calendar",
            index: "/calendar",
            title: "通过日历查询",
            priority: 2
          },
          {
            icon: "el-icon-lx-edit",
            index: "/orders",
            title: "用户预约情况",
            priority: 2
          },
            {
                icon: "el-icon-lx-copy",
                index: "/tabs",
                title: "通知显示",
              priority: 2
            },
            {
                icon: "el-icon-lx-time",
                index: "2",
                title: "管理员模块",
              priority: 3,
                subs: [
                    {
                      title: "信息添加",
                      index: "3",
                      subs: [
                        {
                          index:"/roomForm",
                          title: "会议室添加",
                        },
                        {
                          index: "/form",
                          title: "用户添加",
                        },
                        {
                          index: "/baseMessageForm",
                          title: "通知添加",
                        }

                      ]
                    },
                  {
                    // index: "/",
                    title: "信息管理",
                    index: "4",
                    subs: [
                      {
                        index:"/roomManage",
                        title: "会议室管理",
                      },
                      {
                        index: "/userManage",
                        title: "用户信息管理",
                      },
                      {
                        index: "/userOrderManage",
                        title: "用户预约管理",
                      },
                      {
                        index: "/messageManage",
                        title: "通知管理",
                      }

                    ]
                  },
                    // {
                    //     index: "/messageManage",
                    //     title: "通知管理",
                    // },

                ],
            },
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
          store
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>

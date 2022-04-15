import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import axios from "axios";
import store from '../store'


const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '教室预约'
                },
                props: true,
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            },{
                path: "/rooms",
                name: "roomsOrder",
                meta: {
                    title: '教室使用情况'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/RoomsOrder.vue")
            },{
                path: "/AllRooms",
                name: "allRoomsOrder",
                meta: {
                    title: '教室预约查询'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/AllRoomsOrder.vue")
            }
            ,{
                path: "/calendar",
                name: "calendarOrder",
                meta: {
                    title: '通过日历查询'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/CalendarOrder.vue")
            }
            ,{
                path: "/orders",
                name: "userOrders",
                meta: {
                    title: '用户预约情况'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/UserOrders.vue")
            },{
                path: "/roomForm",
                name: "baseRoomForm",
                meta: {
                    title: '会议室添加'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseRoomForm.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '用户添加'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            },{
                path: "/roomManage",
                name: "roomManage",
                meta: {
                    title: '会议室管理'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/RoomManage.vue")
            },{
                path: "/userManage",
                name: "userManage",
                meta: {
                    title: '用户信息管理'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/UserManage.vue")
            },{
                path: "/userOrderManage",
                name: "userOrderManage",
                meta: {
                    title: '用户预约管理'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/UserOrderManage.vue")
            },{
                path: "/messageManage",
                name: "messageManage",
                meta: {
                    title: '通知管理'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/MessageManage.vue")
            },
            {
                path: "/messageManage",
                name: "messageManage",
                meta: {
                    title: '通知管理'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/MessageManage.vue")
            },{
                path: "/baseMessageForm",
                name: "baseMessageForm",
                meta: {
                    title: '通知添加'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseMessageForm.vue")
            },{
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '通知显示'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                props: true,
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title} | 会议室管理系统`;
    const token = localStorage.getItem('token');
    const isValid = () => {
        return axios.get("/user/me", {
            headers: {
                "Authorization": token
            }
        }).then(res => {
            axios.defaults.headers.common['Authorization'] = token;
            store.commit("setUser", res.data);
            return true;
        }).catch(e => {
            // console.log("error: ", e)
            return false;
        });
    }
    const status = await isValid();
    if ((!token || !status) && to.path !== '/login') {
        console.log("token not valid")
        next('/login');
    }
    else {
        console.log("else")
        next();
    }
});

export default router;
import { guest } from "@middlewares/authAdmin.js";

export default [
  {
    path: "/admin/dashboard",
    component: () => import("@layouts/admin/DashboardLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard-main",
        component: () => import("@pages/admin/Home.vue"),
        beforeEnter: [guest]
      }
    ]
  }
];

import BasicLayout from "@/components/main/main.vue";
const frameIn = [
  {
    path: "/admin/",
    component: BasicLayout,
  },
];
const frameOut = [
  {
    path: "/admin/login",
    name: "login",
    component: () => import("@/views/Login/Login"),
  },
  {
    path: "/",
    redirect: "/admin/login",
  },
];
export default [...frameIn, ...frameOut];

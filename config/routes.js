export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/tiep-nhan-hoc-sinh',
    name: 'Tiếp nhận học sinh',
    icon: 'form',
    component: './InputStudent/InputStudent',
  },
  {
    path: '/danh-sach-hoc-sinh',
    name: 'Danh sách học sinh',
    icon: 'audit',
    component: './StudentList/StudentList',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      // {
      //   path: '/admin/sub-page',
      //   name: 'sub-page',
      //   icon: 'smile',
      //   component: './Welcome',
      // },
      // {
      //   component: './404',
      // },
    ],
  },
  {
    name: 'Search',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];

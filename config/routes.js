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
            component: './user/Login'
          }
        ]
      },
      {
        component: './404'
      }
    ]
  },
  {
    path: '/hoc-sinh',
    name: 'Học sinh',
    icon: 'schedule',
    routes: [
      {
        path: '/hoc-sinh/danh-sach-hoc-sinh',
        name: 'Danh sách học sinh',
        icon: 'audit',
        component: './StudentList/StudentList'
      },
      {
        path: '/hoc-sinh/tiep-nhan-hoc-sinh',
        name: 'Tiếp nhận học sinh',
        icon: 'form',
        component: './InputStudent/InputStudent'
      },
    ]
  },
  {
    path: '/lap-danh-sach-lop',
    name: 'Lập danh sách lớp',
    icon: 'diff',
    component: './InputClass/InputClass'
  },
  {
    path: '/nhap-bang-diem-mon',
    name: 'Nhập bảng điểm môn',
    icon: 'appstore',
    component: './InputScore/InputScore'
  },
  {
    path: '/bao-cao-tong-ket',
    name: 'Báo cáo tổng kết',
    icon: 'copy',
    routes: [
      {
        path: '/bao-cao-tong-ket/tong-ket-mon',
        name: 'Tổng kết môn',
        icon: 'audit',
        component: './CloseSubject/CloseSubject'
      },
      {
        path: '/bao-cao-tong-ket/tong-ket-hoc-ky',
        name: 'Tổng kết học kỳ',
        icon: 'form',
        component: './CloseSemester/CloseSemester'
      },
    ]
  },
  {
    path: '/quy-dinh',
    name: 'Thay đổi quy định',
    icon: 'setting',
    component: './Policy/Policy'
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
    ]
  },
  {
    path: '/',
    redirect: '/hoc-sinh/danh-sach-hoc-sinh'
  },
  {
    component: './404'
  }
];

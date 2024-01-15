import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () =>
          import('../modules/authen/components/LoginComponent.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () =>
          import('../modules/authen/components/RegisterComponent.vue'),
      },
      {
        name: 'forum',
        path: '',
        component: () => import('../modules/discuss/views/ForumView.vue'),
      },
      {
        name: 'groups',
        path: 'groups',
        component: () => import('../modules/groups/views/GroupView.vue'),
      },
      {
        name: 'exam',
        path: 'exam/:id',
        component: () => import('../modules/exam/components/ExamComponent.vue'),
        props: (route) => ({ editMode: route.query.editMode }),
      },
      {
        name: 'class',
        path: 'class',
        redirect: 'class/',
        children: [
          {
            path: '',
            name: 'classess',
            component: () => import('../modules/class/views/Classrooms.vue'),
          },
          {
            path: ':classID',
            name: 'detailClassroom',
            component: () =>
              import('../modules/class/views/DetailClassroom.vue'),
          },
          {
            path: ':classID/report',
            name: 'reportClassroom',
            component: () =>
              import('../modules/class/views/ReportClassroom.vue'),
          },
        ],
      },
      {
        name: 'bank',
        path: 'bank',
        component: () => import('../modules/bank/views/BankQuestion.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

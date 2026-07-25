interface Course {
  c_id: string
  name: string
  redit: number
  hours: number
  classList: string
  t_id?: string
}
export default [
  {
    c_id: 'CST_3827',
    name: 'javaweb开发框架实验',
    classList: '',
    redit: 1,
    hours: 32,
  },
  {
    c_id: 'CST_3814',
    name: '操作系统实验',
    classList: '',
    redit: 1,
    hours: 32,
  },
  {
    c_id: 'CST_3221',
    name: 'javaweb开发框架',
    classList: '',
    redit: 2,
    hours: 32,
  },
  {
    c_id: 'CST_3210',
    name: '操作系统',
    classList: '',
    redit: 3,
    hours: 32,
  },
  {
    c_id: 'CST_2813',
    name: '电子技术与数字电路实验',
    classList: '',
    redit: 1,
    hours: 32,
  },
  {
    c_id: 'CST_2218',
    name: '电子技术与数字电路',
    classList: '',
    redit: 3,
    hours: 48,
  }
] as Course[]
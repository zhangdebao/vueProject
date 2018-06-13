const NEConfigMenus = () => import('../componments/tableDemo/levelMenuConfigMenus/src/index.vue')
const Slot = () => import('../componments/tableDemo/levelMenuConfigMenus/slotList/src/index.vue')
const FormDemo = () => import('../componments/form/src/index.vue')
exports.default = {
  path: 'NEConfigMenus',
  name: 'NEConfigMenus',
  component: NEConfigMenus,
  redirect: {name: 'Slot'},
  children: [
    {
      path: 'Slot',
      name: 'Slot',
      component: Slot
    },
    {
      path: 'form',
      name: 'Form',
      component: FormDemo
    }
  ]
}

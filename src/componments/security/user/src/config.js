import CommonConfig from '../../../../assets/js/language/config'
const LabelConfig = new CommonConfig()
if (!Object.is(LabelConfig.language, 'zh')) {
  LabelConfig.setLabelJson(require('./en-US').default)
} else {
  LabelConfig.setLabelJson(require('./zh-CN').default)
}
const json = {
  nav: [
    {
      router: {
        path: '/dashBoard'
      },
      label: LabelConfig.setLabelValue('Device List')
    }
  ],
  title: 'IGMP组播全局配置',
  labelWidth: 150 + 'px',
  labelPosition: 'left',
  showMessage: true,
  statusIcon: true,
  size: 'mini',
  ref: 'param',
  buttonGroup: {
    cancel: {
      color: '',
      label: '取消'
    },
    confirm: {
      color: '',
      label: '确认'
    }
  },
  operation: {
    add: {
      show: true,
      disabled: false,
      label: '',
      defaultLabel: '',
      type: 'primary',
      icon: 'icon-plus',
      color: '#4d8ff3',
      event: 'addTableRow'
    }
  },
  tableOperation: {
    label: '操作',
    edit: {
      show: true,
      disabled: false,
      label: '修改',
      icon: '',
      event: 'editTableRow'
    },
    editPassword: {
      show: true,
      disabled: false,
      label: '修改密码',
      icon: '',
      event: 'editTableRow'
    },
    delete: {
      show: true,
      disabled: false,
      label: '删除',
      icon: '',
      event: 'deleteRow'
    },
    router: {
      show: true,
      disabled: false,
      label: '分配',
      icon: '',
      event: 'goRouter'
    },
    query: {
      show: true,
      disabled: false,
      label: '查看',
      icon: '',
      event: 'goRouter'
    }
  },
  params: {
    selection: true,
    checkboxProp: false,
    saveTableInfo: false,
    userName: {
      label: '用户',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '用户',
      value: 'zhangsan',
      defalutValue: 'zhangsan',
      span: 24
    },
    mobilePhone: {
      label: '移动电话',
      show: true,
      propShow: true,
      triggerProp: false,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '移动电话',
      value: '',
      defalutValue: '',
      span: 24
    },
    emailAddress: {
      label: '邮箱地址',
      show: true,
      propShow: true,
      triggerProp: false,
      disabled: false,
      filter: true,
      type: 'input',
      valueType: 'string',
      placeholder: '邮箱地址',
      value: '',
      defalutValue: ''
    },
    groupNames: {
      label: '组',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '组',
      value: '',
      defalutValue: '',
      offset: 2
    },
    isEnable: {
      label: '状态',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '状态',
      value: '',
      defalutValue: ''
    }
  }
}
// exports.json = json
export { json }

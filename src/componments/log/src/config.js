import CommonConfig from '../../../assets/js/language/config'
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
      label: LabelConfig.setLabelValue('Log')
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
    batchDelete: {
      show: true,
      disabled: true,
      label: '(0)',
      defaultLabel: '',
      color: '#ff79a2',
      icon: 'icon-delete',
      event: 'batchDelete'
    }
  },
  tableOperation: {
    label: '操作',
    delete: {
      show: true,
      disabled: false,
      label: '删除',
      icon: '',
      event: 'deleteRow'
    }
  },
  params: {
    selection: true,
    checkboxProp: false,
    saveTableInfo: false,
    id: {
      label: 'ID',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'number',
      placeholder: 'IPAddress',
      value: 0,
      defalutValue: 0,
      span: 24
    },
    type: {
      label: '操作类型',
      show: true,
      propShow: true,
      triggerProp: false,
      disabled: false,
      type: 'input',
      valueType: 'string',
      rules: [],
      placeholder: '请选择',
      value: '',
      defalutValue: '',
      span: 24
    },
    result: {
      label: '操作结果',
      show: true,
      propShow: true,
      triggerProp: false,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '请选择',
      value: '',
      defalutValue: ''
    },
    displayName: {
      label: '操作属性',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '',
      value: '',
      defalutValue: ''
    },
    ip: {
      label: '操作终端',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '',
      value: '1',
      defalutValue: '1',
      offset: 2
    },
    creator: {
      label: '操作用户',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '',
      value: '',
      defalutValue: ''
    },
    createTime: {
      label: '操作时间',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '',
      value: '1',
      defalutValue: '1',
      offset: 2
    },
    details: {
      label: '详细信息',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: '',
      value: '',
      defalutValue: ''
    }
  }
}
// exports.json = json
export { json }

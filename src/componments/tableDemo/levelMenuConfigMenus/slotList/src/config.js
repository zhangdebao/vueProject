import CommonConfig from '../../../../../assets/js/language/config'
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
        path: '/NE'
      },
      label: LabelConfig.setLabelValue('NE')
    },
    {
      router: {
        path: '/Slot'
      },
      label: LabelConfig.setLabelValue('Slot')
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
    },
    batchDelete: {
      show: true,
      disabled: true,
      label: '(0)',
      defaultLabel: '',
      color: '#ff79a2',
      icon: 'icon-delete',
      event: 'batchDelete'
    },
    filter: {
      show: true,
      disabled: false,
      label: '后端筛选',
      type: 'primary',
      icon: 'icon-filter',
      event: ''
    }
  },
  tableOperation: {
    label: '操作',
    edit: {
      show: true,
      disabled: false,
      label: '修改',
      icon: 'icon-edit',
      event: 'editTableRow'
    },
    delete: {
      show: true,
      disabled: false,
      label: '删除',
      icon: 'icon-delete',
      event: 'deleteRow'
    }
  },
  params: {
    selection: true,
    checkboxProp: false,
    saveTableInfo: false,
    cardId: {
      label: '板卡ID',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'integer',
      placeholder: '板卡ID',
      value: '',
      defalutValue: '',
      span: 24
    },
    type: {
      label: '类型',
      show: true,
      propShow: true,
      triggerProp: false,
      disabled: false,
      filter: true,
      type: 'input',
      valueType: 'string',
      rules: [
        {
          required: true,
          message: '不能为空!'
        }
      ],
      defalutOptions: [],
      options: [
      ],
      placeholder: '请选择',
      value: '',
      defalutValue: ''
    },
    sn: {
      label: 'SN',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      rules: [
        {
          required: true,
          message: '不能为空'
        }
      ],
      placeholder: '',
      value: '',
      defalutValue: '',
      offset: 2
    },
    pn: {
      label: 'PN',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'select',
      valueType: 'string',
      placeholder: '',
      value: '',
      defalutValue: ''
    },
    hardVersion: {
      label: '硬件版本',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      filter: true,
      type: 'input',
      valueType: 'string',
      rules: [
        {
          required: true,
          message: '不能为空!'
        }
      ],
      placeholder: '硬件版本',
      value: '',
      defalutValue: '',
      offset: 2
    },
    softVersion: {
      label: '软件版本',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'select',
      valueType: 'string',
      rules: [
        {
          required: true,
          message: '不能为空!'
        }
      ],
      placeholder: '软件版本',
      value: 1,
      defalutValue: 2
    },
    sdCardOnLine: {
      label: 'Sd卡在位信息',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'number',
      rules: [
        {
          required: true,
          message: '不能为空!'
        }
      ],
      placeholder: 'Sd卡在位信息',
      value: '',
      defalutValue: '',
      offset: 2
    },
    cardCPU: {
      label: '板卡CPU占用率',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      rules: [],
      placeholder: '请选择',
      value: '',
      defalutValue: ''
    },
    cardMemory: {
      label: '板卡内存占用率',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      rules: [],
      placeholder: '板卡内存占用率',
      value: '',
      defalutValue: '',
      offset: 2
    },
    cardPhysicalMemory: {
      label: '板卡物理内存(M)',
      show: true,
      propShow: false,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'textarea',
      rules: [
        {
          required: true,
          'message': '不能为空'
        }
      ],
      placeholder: '请输入文本',
      value: '',
      defalutValue: '',
      span: 24
    },
    cpuTemperature: {
      label: 'CPU温度',
      show: true,
      propShow: false,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: 'CPU温度',
      value: '',
      defalutValue: '',
      span: 24
    },
    inletPlateTemperature: {
      label: '入风口温度/板卡温度',
      show: true,
      propShow: false,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      rules: [
        {
          required: true,
          'message': '不能为空'
        }
      ],
      placeholder: '入风口温度/板卡温度',
      value: '',
      defalutValue: ''
    },
    outTemperature: {
      label: '出口温度',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      rules: [
        {
          required: true,
          'message': '不能为空'
        }
      ],
      placeholder: '出口温度',
      value: '',
      defalutValue: ''
    }
  }
}
// exports.json = json
export { json }

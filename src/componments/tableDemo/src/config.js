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
    exportsEXCL: {
      show: true,
      disabled: false,
      label: '导出表格',
      event: 'exportsEXCL'
    },
    exportsSelctionEXCL: {
      show: true,
      disabled: true,
      label: '导出选中',
      type: 'primary',
      event: 'exportsSelctionEXCL'
    },
    add: {
      show: true,
      disabled: false,
      label: '添加',
      defaultLabel: '',
      type: 'primary',
      icon: 'icon-plus',
      color: '',
      event: 'addTableRow'
    },
    batchDelete: {
      show: true,
      disabled: true,
      label: '删除(0)',
      defaultLabel: '',
      color: '',
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
    },
    router: {
      show: true,
      disabled: false,
      label: '路由',
      icon: 'icon-router',
      event: 'goRouter'
    }
  },
  params: {
    selection: true,
    checkboxProp: false,
    saveTableInfo: false,
    ipAddress: {
      label: 'IPAddress',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'string',
      placeholder: 'IPAddress',
      value: '192.168.18.248',
      defalutValue: '192.168.18.248',
      span: 24
    },
    filter_integer: {
      label: '筛选表格',
      show: true,
      propShow: true,
      triggerProp: false,
      disabled: false,
      filter: true,
      'filter-method': function (value, row, column) {
        return row[column.property] === value
      },
      filters: [
        {
          text: 'Major',
          value: 'Major',
          color: '#ff7e7e'
        },
        {
          text: 'Minor',
          value: 'Minor',
          color: '#4d8ff3'
        },
        {
          text: 'Critical',
          'value': 'Critical',
          color: '#48d5b2'
        },
        {
          text: 'Normal',
          value: 'Normal',
          color: '#59c7f9'
        }
      ],
      type: 'select',
      valueType: 'integer',
      rules: [],
      defalutOptions: [],
      options: [
        {
          label: 'Major',
          disabled: false,
          value: 1
        },
        {
          label: 'Minor',
          disabled: false,
          value: 2
        },
        {
          label: 'Critical',
          disabled: false,
          'value': 3
        },
        {
          value: 4,
          disabled: false,
          label: 'Normal'
        }
      ],
      placeholder: '请选择',
      value: 1,
      defalutValue: 1,
      span: 24
    },
    select_integer_valid: {
      label: '验证数字下拉框',
      show: true,
      propShow: true,
      triggerProp: false,
      disabled: false,
      filter: true,
      type: 'select',
      valueType: 'integer',
      rules: [
        {
          required: true,
          message: '不能为空!'
        },
        {
          type: 'integer',
          message: '必须是integer类型'
        }
      ],
      defalutOptions: [],
      options: [
        {
          label: LabelConfig.setLabelValue('Enable'),
          disabled: false,
          value: 1
        },
        {
          label: LabelConfig.setLabelValue('Disabled'),
          disabled: false,
          value: 2
        }
      ],
      placeholder: '请选择',
      value: 1,
      defalutValue: 1
    },
    input_integer_valid: {
      label: '验证数字输入框',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'integer',
      rules: [
        {
          required: true,
          message: '不能为空'
        },
        {
          type: 'integer',
          min: 30,
          max: 30000,
          message: `范围[100, 10000],必须是integer类型`
        }
      ],
      placeholder: '请输入',
      value: 300,
      defalutValue: 300,
      offset: 2
    },
    select_str_valid: {
      label: '验证字符串下拉框',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'select',
      valueType: 'string',
      rules: [
        {
          type: 'string',
          required: true,
          message: '不能为空'
        }
      ],
      defalutOptions: [],
      options: [
        {
          label: 'str1',
          disabled: false,
          value: 'str1'
        },
        {
          label: 'str2',
          value: 'str2'
        }
      ],
      placeholder: '请选择',
      value: '',
      defalutValue: ''
    },
    input_str_valid: {
      label: '验证字符串输入框',
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
      placeholder: '验证字符串输入框',
      value: '1',
      defalutValue: '1',
      offset: 2
    },
    select_number_valid: {
      label: '验证数字下拉框',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'select',
      valueType: 'number',
      rules: [
        {
          required: true,
          message: '不能为空!'
        },
        {
          type: 'number',
          message: '必须是number类型'
        }
      ],
      defalutOptions: [],
      options: [
        {
          label: '使能',
          disabled: false,
          value: 1
        },
        {
          label: '禁止',
          value: 2
        }
      ],
      placeholder: '请选择',
      value: 1,
      defalutValue: 2
    },
    input_number_valid: {
      label: '验证数字输入框',
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
        },
        {
          type: 'number',
          min: 10,
          max: 1000,
          message: '范围[10, 1000],必须是number类型'
        }
      ],
      placeholder: '验证数字输入框',
      value: '1',
      defalutValue: '1',
      offset: 2
    },
    select_str: {
      label: '下拉字符串',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'select',
      valueType: 'string',
      rules: [],
      defalutOptions: [],
      options: [
        {
          label: '使能',
          disabled: false,
          value: '1'
        },
        {
          label: '禁止',
          value: '2'
        }
      ],
      placeholder: '请选择',
      value: '',
      defalutValue: ''
    },
    input_number: {
      label: '数字输入框',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'number',
      rules: [],
      placeholder: '数字输入框',
      value: '',
      defalutValue: '',
      offset: 2
    },
    textArea_valid: {
      label: '文本域验证',
      show: true,
      propShow: true,
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
    textArea: {
      label: '文本域',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'textarea',
      rules: [],
      placeholder: '请输入文本',
      value: '',
      defalutValue: '',
      span: 24
    },
    password_valid: {
      label: '密码验证',
      show: true,
      propShow: true,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'password',
      rules: [
        {
          required: true,
          'message': '不能为空'
        }
      ],
      placeholder: '请输入密码验证',
      value: '',
      defalutValue: ''
    },
    password: {
      label: '密码',
      show: true,
      propShow: false,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'password',
      rules: [],
      placeholder: '请输入密码',
      value: '',
      defalutValue: '',
      offset: 2
    },
    startDateTime_valid: {
      label: '日期时间',
      show: true,
      propShow: false,
      disabled: false,
      filter: true,
      type: 'input',
      valueType: 'datetime',
      rules: [
        {
          required: true,
          message: '不能为空'
        }
      ],
      format: 'yyyy-MM-dd HH:mm:ss',
      placeholder: '日期时间',
      value: '',
      defaultValue: ''
    },
    endDateTime_valid: {
      label: '终止日期时间',
      show: true,
      propShow: false,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'datetime',
      rules: [],
      format: 'yyyy-MM-dd HH:mm:ss',
      placeholder: '终止日期时间',
      value: '',
      defaultValue: '',
      offset: 2
    },
    createTime: {
      label: '创建时间',
      show: true,
      propShow: false,
      triggerProp: true,
      disabled: false,
      filter: true,
      type: 'input',
      valueType: 'time',
      rules: [
        {
          required: true,
          message: '不能为空'
        }
      ],
      format: 'HH:mm:ss',
      placeholder: '请输入创建时间',
      value: '',
      defaultValue: ''
    },
    endTime: {
      label: '终止时间',
      show: true,
      propShow: false,
      triggerProp: true,
      disabled: false,
      type: 'input',
      valueType: 'time',
      rules: [],
      format: 'HH:mm:ss',
      placeholder: '请输入终止时间',
      value: '',
      defaultValue: '',
      offset: 2
    }
  }
}
// exports.json = json
export { json }

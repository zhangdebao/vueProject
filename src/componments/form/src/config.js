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
      label: LabelConfig.setLabelValue('Demo Set')
    },
    {
      router: {
        path: '/table'
      },
      label: LabelConfig.setLabelValue('Table')
    },
    {
      router: {
        paht: '/form'
      },
      label: LabelConfig.setLabelValue('Form')
    }
  ],
  title: 'IGMP组播全局配置',
  labelWidth: 200 + 'px',
  labelPosition: 'left',
  showMessage: true,
  statusIcon: true,
  size: 'mini',
  ref: 'param',
  params: {
    selection: true,
    globalEnable: {
      label: 'IGMP全局',
      show: true,
      propShow: false,
      disabled: false,
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
    snoopingAgeTime: {
      label: 'Snooping老化时间(秒)',
      show: true,
      propShow: false,
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
          min: 100,
          max: 10000,
          message: `范围[100, 10000],必须是integer类型`
        }
      ],
      placeholder: '请输入Snooping老化时间',
      value: 300,
      defalutValue: 300,
      offset: 2
    },
    mode: {
      label: '工作模式',
      show: true,
      propShow: false,
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
          label: 'Proxy',
          disabled: false,
          value: 'Proxy'
        },
        {
          label: 'Snooping',
          value: 'Snooping'
        }
      ],
      placeholder: '请选择',
      value: '',
      defalutValue: ''
    },
    robustnss: {
      label: '健壮性参数',
      show: true,
      propShow: false,
      disabled: false,
      type: 'input',
      valueType: 'string',
      rules: [
        {
          required: true,
          message: '不能为空!'
        }
      ],
      placeholder: '请输入健壮性参数',
      value: '1',
      defalutValue: '1',
      offset: 2
    },
    spanVlanEnable: {
      label: '跨VLAN',
      show: true,
      propShow: false,
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
    maxRespTime: {
      label: '最大响应时间(0.1秒)',
      show: true,
      propShow: false,
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
      placeholder: '请输入最大响应时间',
      value: '1',
      defalutValue: '1',
      offset: 2
    },
    cdrEnable: {
      label: '频道播放记录(CDR)',
      show: true,
      propShow: false,
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
    lastMemberQueryCount: {
      label: '最后成员查询个数',
      show: true,
      propShow: false,
      disabled: false,
      type: 'input',
      valueType: 'number',
      rules: [],
      placeholder: '请输入最后成员查询个数',
      value: '',
      defalutValue: '',
      offset: 2
    },
    ruletextArea: {
      label: '文本域验证',
      show: true,
      propShow: false,
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
      propShow: false,
      disabled: false,
      type: 'input',
      valueType: 'textarea',
      rules: [],
      placeholder: '请输入文本',
      value: '',
      defalutValue: '',
      span: 24
    },
    rulePassword: {
      label: '密码验证',
      show: true,
      propShow: false,
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
      disabled: false,
      type: 'input',
      valueType: 'password',
      rules: [],
      placeholder: '请输入密码',
      value: '',
      defalutValue: '',
      offset: 2
    },
    createDateTime: {
      label: '创建日期时间',
      show: true,
      propShow: false,
      disabled: false,
      type: 'input',
      valueType: 'datetime',
      rules: [
        {
          required: true,
          message: '不能为空'
        }
      ],
      format: 'yyyy-MM-dd HH:mm:ss',
      placeholder: '请输入创建日期时间',
      value: '',
      defaultValue: ''
    },
    endDateTime: {
      label: '终止日期时间',
      show: true,
      propShow: false,
      disabled: false,
      type: 'input',
      valueType: 'datetime',
      rules: [],
      format: 'yyyy-MM-dd HH:mm:ss',
      placeholder: '请输入终止日期时间',
      value: '',
      defaultValue: '',
      offset: 2
    },
    createTime: {
      label: '创建时间',
      show: true,
      propShow: false,
      disabled: false,
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

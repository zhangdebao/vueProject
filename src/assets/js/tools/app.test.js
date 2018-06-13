const assert = require('assert')
const { App } = require('./app')
/* eslint-disable */
describe('transformArraytoSelectArray fun test', function () {
  it('转换数组', function (){
    const transArray = App.transformArraytoSelectArray(['test']).toString()
    const testArray = [{label: 'test', value: 'test'}].toString()
    assert.equal(transArray, testArray)
  })
})

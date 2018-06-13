<template lang="html">
  <div class="scroll">
    <div :style="{height: getTableMaxHeight, 'overflow': 'auto', 'padding-right': '10px'}">
      <el-table
        :data="getCommonTableData"
        stripe
       @selection-change="handleSelectionChange"
       size="mini":fit="true" style="width: 100%">
        <el-table-column
          v-if="params.selection ? true : false"
          type="selection" width="55"
            fixed="left"
        ></el-table-column>
        <!--过滤-->
        <el-table-column
          v-for="item of Object.entries(params)"
          v-if="(Object.is(typeof item[1], 'object')) && (item[1].filters) && (item[1].propShow ? true : false)"
          :fixed="item[1].fixed"
          :prop="item[0]"
          :label="item[1].label"
          :filters="item[1].filters"
          :filter-method="item[1]['filter-method']"
          :show-overflow-tooltip="true"
          :min-width="getPropMinWidth(item)"
        >
          <template slot-scope="scope" v-if="item[1].filters">
            <span class="filterProp" v-bind:style="{color: getTagColor(item, scope.row), border: `1px solid ${getTagColor(item, scope.row)}`}">
              {{scope.row[item[0]]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item of Object.entries(params)"
          v-if="(Object.is(typeof item[1], 'object')) && (!item[1].filters) && (item[1].propShow ? true : false)"
          :fixed="item[1].fixed"
          :prop="item[0]"
          :label="item[1].label"
          :show-overflow-tooltip="true"
          :min-width="getPropMinWidth(item)"
        >
        </el-table-column>
        <el-table-column
          fixed
          :label="tableOperation.label"
          :min-width="getTableOperationMinWidth"
        >
          <template slot-scope="scope">
            <el-button
              v-for="item in tableOperation"
              size="small"
              type="text"
              v-if="item.show"
              :disabled="item.disabled"
              @click="operationTableRow(scope.row, item.event)">
              <!-- <i class="mini-button iconfont" :class="item.icon"></i> -->
              {{item.label}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 1000]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="commonData.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    commonData : {
      required: true,
      type: Array
    },
    params: {
      required: true,
      type: Object
    },
    tableOperation: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    getPropMinWidth(item = []) {
      const items = Object.entries(this.params);
      if (item[1].filters) {
        return item[1].label.trim().length * 14 + 40 + "px";
      } else {
        return item[1].label.trim().length * 14 + 20 + "px";
      }
    },
    /**
     * [handleSelectionChange 切换选中的数据]
     * @return {[type]} [description]
     */
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", {
        selection: val
      });
    },
    operationTableRow(row, event) {
      this.$emit(event, row);
    },
    getTagColor(item = [], row = {}) {
      const filters = item[1].filters;
      for (let filter of filters) {
        if (Object.is(filter.value, row[item[0]])) {
          return filter.color;
        }
      }
      return "00fff00";
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("serverSide", {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    }
  },
  computed: {
    getTableOperationMinWidth() {
      const values = Object.values(this.tableOperation);
      let width = 0;
      for (let value of values) {
        if (value.label) {
          width = width + value.label.length * 12 + 10;
        }
      }
      return width + 20;
    },
    getCommonTableData() {
      const data = this.commonData.filter((item, index) => {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = this.currentPage * this.pageSize;
        if (index >= start && end > index) {
          return true;
        } else {
          return false;
        }
      });
      return data;
    },
    getTableMaxHeight () {
      return this.$store.getters.getContentHeight - 150 + 'px'
    }
  }
};
</script>

<style lang="css" scoped>
.filterProp {
  padding: 1px 15px;
  /* border-radius: 4px; */
  font-weight: bold;
}
.scroll{
  margin-top: 10px;
}

</style>

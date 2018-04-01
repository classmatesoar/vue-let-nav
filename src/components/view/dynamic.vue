<template>
  <div class="template-box">
    <el-button v-for="item in patterns" :key="item.pattern" @click="intoPattern(item.pattern)">{{item.title}}</el-button>
    <el-table border
    max-height="520"
     :data="tableData" 
     :row-class-name="tableRowClassName"
     :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column sortable prop="id" label="序号"></el-table-column>
      <el-table-column sortable prop="name" label="姓名"></el-table-column>
      <el-table-column sortable prop="personId" label="人员编号"></el-table-column>
      <el-table-column sortable prop="country" label="阵营"></el-table-column>
      <el-table-column sortable prop="statu" label="状态">
        <template slot-scope="scope">
          {{allStatus[scope.row.statu]}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="statu" label="操作">
        <template slot-scope="scope">
          <el-button @click="operate('look',scope.row)" plain size="mini" type="primary">查看</el-button>
          <el-button @click="operate('del',scope.$index)" plain v-if="(scope.row.statu==1)||(scope.row.statu==2)" size="mini" type="danger">删除</el-button>
          <el-button @click="operate('cancel',scope.$index)" plain v-else-if="scope.row.statu==3" size="mini" type="warning">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin:10px;float:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5 , 10 , 15 , 20 , 30 , 50 , 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import viewInit from "../../public/viewInit";
export default {
  ...viewInit
};
</script>
<style lang="less">
.el-table {
  * {
    text-align: center;
  }
  th,td{
    padding: 5px 0;
  }
  .row-default {
    background: oldlace;
  }
  .row-info {
    //background: #409eff;
  }
  .row-success {
    background: rgb(219, 250, 173);
  }
  .row-cancle {
    background: #aaa;
  }
}
</style>

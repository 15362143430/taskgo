<template>
  <div class="fillcontain">
    <!-- <head-top></head-top> -->
    <div class="table_container">
      <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="标题" prop="title" width="600"></el-table-column>
        <el-table-column label="标签" prop="tagName">
          <template slot-scope="scope">
            <el-tag type="danger">{{ scope.row.tagName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="来源" prop="source">
          <template slot-scope="scope">
            <el-tag type="warning">{{ scope.row.source}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评论数" prop="commentCount"></el-table-column>
        <el-table-column label="点赞数" prop="likeCount"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="200">
          <template slot-scope="scope">{{ scope.row.createTime | dateTimeFormat }}</template>
        </el-table-column>
        <el-table-column label="操作" width="500">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button> -->
            <el-button size="mini" @click="handleNoTask()">详情</el-button>
            <el-button
              size="mini"
              type="success"
              @click="scope.row.top === true?handleNoTop(scope.row.id):handleTop(scope.row.id)"
            >{{scope.row.top === true?"取消置顶":"新闻置顶"}}</el-button>
            <el-button
              size="mini"
              type="info"
              @click="scope.row.publish === true?handleNoPublish(scope.row.id):handlePublish(scope.row.id)"
            >{{scope.row.publish === true?"取消发布":"新闻发布"}}</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="scope.row.taskFlag === true?handleNoTask(scope.row.id):handleTask(scope.row.id)"
            >{{scope.row.taskFlag === true?"取消任务":"设为任务"}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-count="pageCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      pageCount: 0,
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 5 //    每页的数据
    };
  },
  mounted() {
    this.axios
      .get("https://www.lfeng.site/taskgo/app/news?curPage=1&pageSize=5")
      .then(res => {
        console.log(res);
        this.tableData = res.data.result.data;
        this.pageCount = res.data.result.totalPage;
        this.count = 5;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {}
};
</script>

<style scoped>
@import "../style/mixin.css";

</style>
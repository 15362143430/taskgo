<template>
  <div class="fillcontain">
    <!-- <head-top></head-top> -->
    <div class="table_container">
      <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="任务名称" prop="name"></el-table-column>
        <el-table-column label="类型" prop="type">
          <template slot-scope="scope">
            <el-tag type="danger">{{ scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="简介" prop="introduction"></el-table-column> -->
        <el-table-column label="金币数" prop="goldCoin">
          <template slot-scope="scope">
            <el-tag type="warning">{{ scope.row.goldCoin}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="执行次数" prop="executeCount"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="200">
          <template slot-scope="scope">{{ scope.row.createTime | dateTimeFormat }}</template>
        </el-table-column>
        <el-table-column label="过期时间" prop="expireTime" width="200">
          <template slot-scope="scope">{{ scope.row.expireTime | dateTimeFormat }}</template>
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button> -->
            <el-button size="mini" @click="handleNoTask()">详情</el-button>
            <el-button
              size="mini"
              type="info"
              @click="scope.row.publish === true?handleNoPublish(scope.row.id):handlePublish(scope.row.id)"
            >{{scope.row.publish === true?"取消发布":"任务发布"}}</el-button>
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
      .get("https://www.lfeng.site/taskgo/app/task?curPage=1&pageSize=5")
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
  methods: {
    handleSizeChange(size) {
      //     console.log(size)
      this.axios
        .get(
          "https://www.lfeng.site/taskgo/app/task?curPage=1&pageSize=" + size
        )
        .then(res => {
          this.tableData = res.data.result.data;
          this.pagesize = size;
        })
        .catch(err => {
          console.log(err);
        });
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      let that = this;
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.axios
        .get(
          "https://www.lfeng.site/taskgo/app/task?curPage=" +
            currentPage +
            "&pageSize=" +
            that.pagesize
        )
        .then(res => {
          this.tableData = res.data.result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDelete(id) {
      let that = this;
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete("https://www.lfeng.site/taskgo/app/task/" + id)
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/task?curPage=" +
                    that.currentPage +
                    "&pageSize=" +
                    that.pagesize
                )
                .then(res => {
                  that.tableData = res.data.result.data;
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handlePublish(id) {
      let that = this;
      this.$confirm("此操作将发布此音频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/task/publish?taskId=" +
                id +
                "&publish=true"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/task?curPage=" +
                    that.currentPage +
                    "&pageSize=" +
                    that.pagesize
                )
                .then(res => {
                  that.tableData = res.data.result.data;
                  this.$message({
                    type: "success",
                    message: "发布成功!"
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    handleNoPublish(id) {
      let that = this;
      this.$confirm("此操作将取消发布此音频, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/task/publish?taskId=" +
                id +
                "&publish=false"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/task?curPage=" +
                    that.currentPage +
                    "&pageSize=" +
                    that.pagesize
                )
                .then(res => {
                  that.tableData = res.data.result.data;
                  this.$message({
                    type: "success",
                    message: "取消成功!"
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃取消"
          });
        });
    },
  }
};
</script>

<style scoped>
@import "../style/mixin.css";
</style>
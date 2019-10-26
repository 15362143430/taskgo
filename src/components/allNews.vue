<template>
  <div class="fillcontain">
    <!-- <head-top></head-top> -->
    <div class="table_container">
      <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) -->
      <!-- <el-date-picker
      v-model="timeValue"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
      </el-date-picker>-->
      <el-col :span="3">
        <el-input placeholder="请输入发布状态" v-model="publish" auto-complete="off"></el-input>
      </el-col>
      <el-button @click="searchPublish" icon="el-icon-search" circle type="danger"></el-button>
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
      pagesize: 5, //    每页的数据
      timeValue: [],
      publishValue: "",
      publish: ""
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
  methods: {
    handleSizeChange(size) {
      let that = this;
      //     console.log(size)
      this.axios
        .get(
          "https://www.lfeng.site/taskgo/app/news" +
            that.publishValue +
            "?curPage=1&pageSize=" +
            size
        )
        .then(res => {
          this.tableData = res.data.result.data;
          this.pagesize = size;
          this.pageCount = res.data.result.totalPage;
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
          "https://www.lfeng.site/taskgo/app/news" +
            that.publishValue +
            "?curPage=" +
            currentPage +
            "&pageSize=" +
            that.pagesize
        )
        .then(res => {
          this.tableData = res.data.result.data;
          this.pageCount = res.data.result.totalPage;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // currentChangePage(list, currentPage) {
    //   let from = (currentPage - 1) * this.pageSize;
    //   let to = currentPage * this.pageSize;
    //   this.tempList = [];
    //   for (; from < to; from++) {
    //     if (list[from]) {
    //       this.tempList.push(list[from]);
    //     }
    //   }
    // }
    handleEdit(id) {
      console.log(id);
    },
    handleNoTop(id) {
      let that = this;
      console.log(id);
      this.$confirm("此操作将取消置顶该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/news/top?newsId=" +
                id +
                "&top=false"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/news" +
                    that.publishValue +
                    "?curPage=" +
                    that.currentPage +
                    "&pageSize=" +
                    that.pagesize
                )
                .then(res => {
                  that.tableData = res.data.result.data;
                  this.$message({
                    type: "success",
                    message: "取消置顶成功!"
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃取消置顶操作"
          });
        });
    },
    handleTop(id) {
      let that = this;
      console.log(id);
      this.$confirm("此操作将置顶该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/news/top?newsId=" +
                id +
                "&top=true"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/news" +
                    that.publishValue +
                    "?curPage=" +
                    that.currentPage +
                    "&pageSize=" +
                    that.pagesize
                )
                .then(res => {
                  that.tableData = res.data.result.data;
                  this.$message({
                    type: "success",
                    message: "置顶成功!"
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃置顶操作"
          });
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
            .delete("https://www.lfeng.site/taskgo/app/news/" + id)
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/news" +
                    that.publishValue +
                    "?curPage=" +
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
      this.$confirm("此操作将发布此新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/news/publish?newsId=" +
                id +
                "&publish=true"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/news" +
                    that.publishValue +
                    "?curPage=" +
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
      this.$confirm("此操作将取消发布此新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/news/publish?newsId=" +
                id +
                "&publish=false"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/news" +
                    that.publishValue +
                    "?curPage=" +
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
    handleTask(id) {
      let that = this;
      this.$confirm("此操作将把此新闻转为任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/news/covert?newsId=" +
                id +
                "&publish=false"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/news" +
                    that.publishValue +
                    "?curPage=" +
                    that.currentPage +
                    "&pageSize=" +
                    that.pagesize
                )
                .then(res => {
                  that.tableData = res.data.result.data;
                  this.$message({
                    type: "success",
                    message: "设置任务成功!"
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已放弃设置任务"
          });
        });
    },
    handleNoTask() {
      this.$message.error("对不起，无法取消任务设置！！！");
    },
    searchPublish() {
      let that = this;
      if (this.publish == "") {
        this.publishValue = "";
      } else {
        this.publishValue = "?publish=" + this.publish + "&";
      }
      this.axios
        .get(
          "https://www.lfeng.site/taskgo/app/news" +
            that.publishValue +
            "?curPage=1&pageSize=5"
        )
        .then(res => {
          if (res.data.code !== 0) {
            that.tableData = [];
            that.pageCount = 0;
          } else {
            that.tableData = res.data.result.data;
            that.pageCount = res.data.result.totalPage;
            that.pagesize = 5;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterTag(value, row) {
      return row.type === value;
    }
  }
};
</script>

<style scoped>
@import "../style/mixin.css";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
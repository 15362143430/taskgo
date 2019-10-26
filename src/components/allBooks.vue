<template>
  <div class="fillcontain">
    <!-- <head-top></head-top> -->
    <div class="table_container">
      <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="书名" prop="name"></el-table-column>
        <el-table-column label="标签" prop="tagName">
          <template slot-scope="scope">
            <el-tag type="danger">{{ scope.row.tagName}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="简介" prop="introduction"></el-table-column> -->
        <el-table-column label="作者" prop="author">
          <template slot-scope="scope">
            <el-tag type="warning">{{ scope.row.author}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评论数" prop="commentCount"></el-table-column>
        <el-table-column label="点赞数" prop="likeCount"></el-table-column>
        <el-table-column label="阅读量" prop="readerCount"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="200">
          <template slot-scope="scope">{{ scope.row.createTime | dateTimeFormat }}</template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button> -->
            <el-button size="mini" @click="handleNoTask()">查看章节</el-button>
            <el-button
              size="mini"
              type="success"
              @click="scope.row.shelf === true?handleNoShelf(scope.row.id):handleShelf(scope.row.id)"
            >{{scope.row.shelf === true?"书籍下架":"书籍上架"}}</el-button>
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
      .get("https://www.lfeng.site/taskgo/app/book?curPage=1&pageSize=5")
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
          "https://www.lfeng.site/taskgo/app/book?curPage=1&pageSize=" + size
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
          "https://www.lfeng.site/taskgo/app/book?curPage=" +
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
    handleNoShelf(id) {
      let that = this;
      this.$confirm("此操作将下架该书籍, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/book/shelf?bookId=" +
                id +
                "&shelf=false"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/book?curPage=" +
                    that.currentPage +
                    "&pageSize=" +
                    that.pagesize
                )
                .then(res => {
                  that.tableData = res.data.result.data;
                  this.$message({
                    type: "success",
                    message: "下架成功!"
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    handleShelf(id) {
      let that = this;
      this.$confirm("此操作将上架该书籍, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .put(
              "https://www.lfeng.site/taskgo/app/book/shelf?bookId=" +
                id +
                "&shelf=true"
            )
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/book?curPage=" +
                    that.currentPage +
                    "&pageSize=" +
                    that.pagesize
                )
                .then(res => {
                  that.tableData = res.data.result.data;
                  this.$message({
                    type: "success",
                    message: "上架成功!"
                  });
                });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上架"
          });
        });
    }
  }
};
</script>

<style scoped>
@import "../style/mixin.css";

</style>
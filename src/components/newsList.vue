<template>
  <div class="fillcontain">
    <!-- <head-top></head-top> -->
    <div class="table_container">
      <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize) -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="标签 ID" prop="name"></el-table-column>
        <el-table-column label="标签名称" prop="type"></el-table-column>
        <el-table-column label="标签类型" prop="id"></el-table-column>
        <el-table-column label="创建时间" prop="createTime">
          <template slot-scope="scope">{{ scope.row.createTime | dateTimeFormat }}</template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button> -->
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
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      pageCount: 0,
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      dialogFormVisible: true,
      selectTable: {}
    };
  },
  mounted() {
    this.axios
      .get(
        "https://www.lfeng.site/taskgo/app/tag?type=news&curPage=1&pageSize=5"
      )
      .then(res => {
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
          "https://www.lfeng.site/taskgo/app/tag?type=news&curPage=1&pageSize=" +
            size
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
          "https://www.lfeng.site/taskgo/app/tag?type=news&curPage=" +
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
            .delete("https://www.lfeng.site/taskgo/app/tag/" + id)
            .then(() => {
              this.axios
                .get(
                  "https://www.lfeng.site/taskgo/app/tag?type=news&curPage=" +
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
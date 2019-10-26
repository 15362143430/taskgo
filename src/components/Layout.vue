<template>
  <!-- eslint-disable  -->
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color:#545c64;">
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%;"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="manage">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
<<<<<<< HEAD
              <i class="el-icon-document"></i>标签管理
            </template>
            <el-menu-item index="/layout/alltaglist">所有标签列表</el-menu-item>
=======
              <i class="el-icon-edit"></i>标签管理
            </template>
            <el-menu-item index="/layout/alltaglist"><i class="el-icon-paperclip"></i>标签列表</el-menu-item>
            <el-menu-item @click="dialogFormVisible = true"><i class="el-icon-plus"></i>添加标签</el-menu-item>
>>>>>>> 第二次
            <el-menu-item index="/layout/newslist">新闻列表</el-menu-item>
            <el-menu-item index="/layout/videoslist">视频列表</el-menu-item>
            <el-menu-item index="/layout/audioslist">音频列表</el-menu-item>
            <el-menu-item index="/layout/bookslist">书籍列表</el-menu-item>
            <el-menu-item index="/layout/teamlist">团队列表</el-menu-item>
            <el-menu-item index="/layout/guesslist">竞猜列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>添加数据
            </template>
<<<<<<< HEAD
            <el-menu-item @click="dialogFormVisible = true">添加标签</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>图表
            </template>
            <el-menu-item index="visitor">用户分布</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>编辑
            </template>
            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>设置
            </template>
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning"></i>说明
            </template>
            <el-menu-item index="explain">说明</el-menu-item>
=======
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-mobile-phone"></i>新闻管理
            </template>
            <el-menu-item index="/layout/allnews"><i class="el-icon-mobile-phone"></i>新闻列表</el-menu-item>
            <el-menu-item @click="dialogFormVisible2 = true"><i class="el-icon-plus"></i>添加新闻</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>竞猜管理
            </template>
            <el-menu-item index="/layout/allGuess"><i class="el-icon-plus"></i>竞猜列表</el-menu-item>
            <el-menu-item index="/layout/allTeams"><i class="el-icon-plus"></i>团队列表</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-reading"></i>书籍管理
            </template>
            <el-menu-item index="/layout/allbooks"><i class="el-icon-notebook-1"></i>书籍列表</el-menu-item>
            <el-menu-item @click="dialogFormVisible2 = true"><i class="el-icon-plus"></i>添加书籍</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-service"></i>音频管理
            </template>
            <el-menu-item index="/layout/allaudios"><i class="el-icon-service"></i>音频列表</el-menu-item>
            <el-menu-item @click="dialogFormVisible2 = true"><i class="el-icon-plus"></i>添加音频</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-video-camera-solid"></i>视频管理
            </template>
            <el-menu-item index="/layout/allvideos"><i class="el-icon-video-camera"></i>视频列表</el-menu-item>
            <el-menu-item @click="dialogFormVisible2 = true"><i class="el-icon-plus"></i>添加视频</el-menu-item>
          </el-submenu>
           <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-edit"></i>任务管理
            </template>
            <el-menu-item index="/layout/alltasks"><i class="el-icon-plus"></i>任务列表</el-menu-item>
            <el-menu-item index="/layout/alltasks"><i class="el-icon-plus"></i>添加任务</el-menu-item>
>>>>>>> 第二次
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>

<<<<<<< HEAD
    <!-- 添加弹出 -->
=======
    <!-- 添加标签弹出 -->
>>>>>>> 第二次
    <el-dialog title="添加标签" :visible.sync="dialogFormVisible">
      <el-form :model="selectTable">
        <el-form-item label="标签名称" label-width="100px">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签类型" label-width="100px">
          <el-select v-model="selectTable.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLabel">确 定</el-button>
      </div>
    </el-dialog>
<<<<<<< HEAD
=======

    <!-- 添加新闻弹出 -->
    <el-dialog title="添加新闻" :visible.sync="dialogFormVisible2">
      <el-form :model="selectNewsTable">
        <el-form-item label="新闻标题" label-width="100px">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻来源" label-width="100px">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否广告" label-width="100px">
          <el-switch v-model="selectTable.value1" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="标签类型" label-width="100px">
          <el-select v-model="selectTable.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addNews">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加书籍弹出 -->
    <!-- <el-dialog title="添加书籍" :visible.sync="dialogFormVisible3">
      <el-form :model="selectNewsTable">
        <el-form-item label="书籍名称" label-width="100px">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者名称" label-width="100px">
          <el-input v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标签ID" label-width="100px">
          <el-input type="number" v-model="selectTable.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍封面" label-width="100px">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleServiceAvatarScucess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="selectTable.image_path"
              :src="baseImgPath + selectTable.image_path"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="标签类型" label-width="100px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea2"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addNews">确 定</el-button>
      </div>
    </el-dialog> -->

>>>>>>> 第二次
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "",
      dialogFormVisible: false,
<<<<<<< HEAD
      selectTable: {},
=======
      dialogFormVisible2: false,
      dialogFormVisible3: true,
      selectTable: {},
      selectNewsTable: {},
>>>>>>> 第二次
      options: [
        {
          value: "news",
          label: "新闻"
        },
        {
          value: "video",
          label: "视频"
        },
        {
          value: "audio",
          label: "音频"
        },
        {
          value: "book",
          label: "书籍"
        },
        {
          value: "team",
          label: "团队"
        },
        {
          value: "guess",
          label: "竞猜"
        }
      ]
    };
  },
  methods: {
    addLabel() {
      // console.log(this.selectTable);
      let that = this;
      let form = JSON.stringify(that.selectTable);
      console.log(form);
      this.axios
        .post("https://www.lfeng.site/taskgo/app/tag", form, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
<<<<<<< HEAD
    }
=======
    },
    addNews() {}
>>>>>>> 第二次
  }
};
</script>

<style scoped>
@import "../style/mixin.css";
<<<<<<< HEAD
=======
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
>>>>>>> 第二次
</style>
<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="getUser">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
export default {
  data() {
    return {
      searchForm: {
        keyword: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
        },
        {
          model: "age",
          label: "年龄",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          options: [
            {
              label: "女",
              value: 0,
            },
            {
              label: "男",
              value: 1,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
        },
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
      operateType: "add",
      dialogVisible: false,
    };
  },
  methods: {
    getList() {
      this.config.loading = true;
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page,
          },
        })
        .then((res) => {
          this.tableData = res.data.list.map((item) => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    // 搜索用户
    getUser() {
      this.config.loading = true;
      this.$http
        .get("/api/user/getUser", {
          params: {
            name: this.searchForm.keyword,
          },
        })
        .then((res) => {
          this.tableData = res.data.list.map((item) => {
            item.sexLabel = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    // 新增用户
    addUser() {
      this.operateType = "add";
      this.dialogVisible = true;
    },
    // 编辑用户
    editUser(row) {
      this.operateType = "edit";
      this.dialogVisible = true;
      this.operateForm = row;
    },
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/api/user/edit", this.operateForm).then((res) => {
          this.dialogVisible = false;
          this.getList();
        });
      } else if (this.operateType === "add") {
        this.$http.post("/api/user/add", this.operateForm).then((res) => {
          this.dialogVisible = false;
          this.getList();
        });
      }
    },
    // 删除用户
    delUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let userId = row.id;
          this.$http
            .get("/api/user/del", {
              params: {
                id: userId,
              },
            })
            .then((res) => {
              console.log(res);
              this.getList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getList();
  },
  components: {
    CommonForm,
    CommonTable,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/common";
</style>
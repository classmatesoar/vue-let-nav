import publicData from './publicData';
import publicMethods from './publicMethods';
console.log(3333)
export default {
  methods: {
    ...publicMethods,
    handleCurrentChange(page) {
      this.allCreated(page, this.size);
      console.log(`当前页: ${page}`);
    },
    handleSizeChange(size) {
      this.allCreated(this.page, size);
      console.log(`每页 ${size} 条`);
    },
    getFromUrl(param) {
      let query = this.$route.query;
      if (!query) {
        query = {}
      }
      let result = 1;
      if (param == "size") {
        result = 5
      }
      let last = query[param];
      if (last) {
        result = parseInt(last)
      }
      return result
    }
  },
  mounted() {
    this.allCreated(this.page,this.size)
  },
  computed: {
    page() {
      return this.getFromUrl('page')
    },
    size() {
      return this.getFromUrl('size')
    }
  },
  data() {
    return {
      ...publicData,
      patterns: [],
      tableData: [],
      total: 0,
      formItems: [],
      allStatus: {
        1: "未提交",
        2: "已提交",
        3: "已发布",
        4: "已撤销"
      },
      allStatusClass: {
        1: "default",
        2: "info",
        3: "success",
        4: "cancle"
      },
      allCrumbs: this.$store.state.allCrumbs,
      /*form: {
        name: "",
        personId: "",
        age: "",
        sex: "",
        country: "",
        death: "",
        mate: "",
        weapon: "",
        motherTown: "",
        remark: "",
        statu: ""
      }*/
    }
  }
}
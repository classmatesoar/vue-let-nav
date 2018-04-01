import { basePath } from '../../static/config';
import axios from 'axios';
let URL_PREFIX = '/api';
if(process.env.NODE_ENV === 'production'){
    URL_PREFIX = basePath;
}
export default {
    axiosPublic() {
        const self = this;
        self.loading = false;
    },
    axiosPass(u, p = {}, t = 'post') {
        const self = this;
        let url = URL_PREFIX + u, result;
        console.log(u)
        if (u != '/loginIn') {
            if (!p.ticket) {
                p.ticket = this.$store.state.info.ticket
            }
        }
        console.log(u, p, t);
        switch (t) {
            case 'post': {
                result = axios.post(url, p);
                break
            }
            case 'get': {
                result = axios.get(url, p);
                break
            }
            default: {
                result = axios.post(url, p);
            }
        }
        result.then(res => {
            console.warn('请求', u, p, t, '请求结果', res.data)
            if (res.data.status == 500) {
                self.$alert(res.data.msg, "通知", {
                    confirmButtonText: "确定",
                    callback() {
                        self.$router.push("/login");
                    }
                })
            } else if (res.data.status == 204) {
                this.$message({
                    message: res.data.msg
                })
            }
        })
            .catch(error => {
                console.warn('后台抛错', error)
            })
        return result
    },
    allCreated(page = 1, size = 5) {
        const self = this;
        self.$store.commit('bodyLoading');
        let params;
        params = self.$route.params;
        if (!params) {
            params = {}
        }
        let query = {}
        if (params.pattern) {
            query.mode = params.pattern
        } else {
            query.page = page;
            query.size = size;
            this.$router.push({
                path: this.$route.path,
                query
            })
        }
        self.axiosPass(self.$route.path, query).then(res => {
            setTimeout(() => {
                const resultData = res.data;
                self.$store.commit('bodyLoaded');
                self.initData = resultData.url + '的页面';
                // if (params.pattern) {
                resultData.formItems === undefined ? true : (self.formItems = resultData.formItems);
                // } else {
                resultData.patterns === undefined ? true : (self.patterns = resultData.patterns);
                resultData.tableData === undefined ? true : (self.tableData = resultData.tableData);
                resultData.total === undefined ? true : (self.total = resultData.total);
                // }
                self.axiosPublic();
            }, 1000)
        })
            .catch(error => {
                self.axiosPublic()
            })
    },
    intoPattern(pattern) {
        this.$router.push(this.$route.path + '/' + pattern)
    },
    launchFullScreen(element) {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    },
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    },
    fullScreen(param) {
        if (param) {
            this.launchFullScreen(document.documentElement);
        } else {
            this.exitFullscreen()
        }
        this.readyFullScreen = !param;
    },
    LiaisonVideo() {
        var video = document.getElementById('video');

        // Get access to the camera!
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            });
        }
    },
    LiaisonAudio() {
        var audio = document.getElementById('audio');

        // Get access to the camera!
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
                audio.src = window.URL.createObjectURL(stream);
                audio.play();
            });
        }
    },
    tableRowClassName({ row, rowIndex }) {
        return 'row-' + this.allStatusClass[row.statu]
    },
    operate(want, index) {
        switch (want) {
            case 'look': {
                sessionStorage[this.$route.path.replace("/", '') + index.id] = JSON.stringify(index)
                this.$router.push({
                    path: this.$route.path + '/' + want,
                    query: {
                        id: index.id
                    }
                })
                break
            }
            case 'del': {
                this.$confirm('确定删除吗？', '询问', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(() => {
                        this.tableData.splice(index, 1)
                    })
                    .catch(() => { })
                break
            }
            case 'cancel': {
                this.$confirm('确定注销吗？', '询问', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(() => {
                        this.tableData[index].statu = 4
                    })
                    .catch(() => { })
                break
            }
        }
    }
}
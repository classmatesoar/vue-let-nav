const mutations = {
    increment(state) {
        state.count++;
    },
    welcomeYou(state) {
        state.welcome = true
    },
    bodyLoading(state) {
        state.bodyLoading = true
    },
    bodyLoaded(state) {
        state.bodyLoading = false
    },
    infoSet(state,info){
        state.info=info;
        sessionStorage['info']=JSON.stringify(info);
    },
    infoClear(state){
        state.info={
            name:'请登录'
        };
        sessionStorage.removeItem('info')
    },
    menuBarSize(state,mode){
        state.menuBarClass=mode
    }
}
export default mutations;
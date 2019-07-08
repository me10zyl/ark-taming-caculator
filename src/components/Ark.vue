<template>
    <div id="main">
        <div>
            <div class="title">
                <h3>
                    生物详情
                </h3>
            </div>
            <div class="list">
                <div class="row">
                    <label>倍率：</label>
                    <select>
                        <option>官服毁灭服(3倍)</option>
                        <option>官服(1倍)</option>
                    </select>
                </div>
                <div class="row">
                    <label>生物：</label><input/>
                </div>
                <div class="row">
                    <label>等级：</label><input/>
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                <h3>
                    击晕
                </h3>
            </div>
            <div class="list">
                <div class="row">
                    <label>十字弩：</label>11
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                <h3>
                    食物详情
                </h3>
            </div>
            <div class="list">
                <div class="row">
                    <label>生肉：</label>20
                </div>
                <div class="row">
                    <label>大腿肉：</label>30
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                <h3>
                    驯服详情
                </h3>
            </div>
            <div class="list">
                <div class="row">
                    <label>总时间：</label>01:20:33
                </div>
                <div class="row">
                    <label>苏醒时间：</label>01:10:33
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                <h3>
                    总结
                </h3>
            </div>
            <div class="list">
                <div class="row primary">
                    <ul>
                        <li>喂麻药时间：00:50:00 (2019-07-08 17:30:41)</li>
                        <li>喂麻药时间：00:50:00 (2019-07-08 17:30:41)</li>
                        <li>喂麻药时间：00:50:00 (2019-07-08 17:30:41)</li>
                    </ul>
                </div>
                <div class="row primary">
                    每次喂多少个麻药（或）：
                    <div>
                        黑果子1个
                    </div>
                    <div>
                        麻药1个
                    </div>
                </div>
            </div>
        </div>
        <div class="start">
            <button>开始驯服</button>
        </div>
    </div>
</template>

<script>
    import '@/js/arkdata.js';
    import '@/js/ark.js';

    export default {
        name: "ark",
        data() {
            return {
                creature: {
                    name: 'Ankylosaurus',
                    level: 20,
                    foods: null,
                    knockout: null
                },
            }
        },
        props: {},
        created: function () {
            window._self = this;
            /*$scope.resetfoods();
            $scope.selectdino();
            $scope.maxfoodcalc();
            $scope.alltimescalc();
            $scope.foodcalc();
            $rootScope.pagetitle = "ARK Taming Calculator";*/
        }
    }


</script>

<style scoped>
    #main {
        background: linear-gradient(rgba(40, 100, 100, 0.6), rgba(40, 100, 100, 0.3));
        width: 500px;
        /*display: table;*/
        /*text-align: center;*/
        /*border-width: 2px;
        border-style: solid;*/
        border-radius: 10px;
        /*border-color:  rgba(50, 200, 200, 0.6);*/
        /*background-color: rgba(40, 100, 100, 0.5);*/
        background: linear-gradient(rgba(40, 100, 100, 0.6), rgba(40, 100, 100, 0.3));
        padding: 10px;
        margin: 0 auto;
    }

    .primary {
        color: darkgreen;
    }

    .title {
        text-align: center;
    }

    .row {
        padding: 0 20px;
        width: 300px;
    }

    .list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .row label {
        /*margin-right: 20px;*/
        display: inline-block;
        width: 100px;
    }

    ul{
        padding: 0px;
        margin: 0px;
    }

    li {
        padding: 0px;
        margin: 0px;
    }

    .start{
        text-align: center;
    }
</style>
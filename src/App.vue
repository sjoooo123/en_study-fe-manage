<template>
    <ul>
        <li :class="{ cur: curTitle === '首页' }">
            <router-link to="/">首页</router-link>
        </li>
        <!--<li :class="{ cur: curTitle === '字典' }">
            <router-link to="/dict">字典</router-link>
        </li>-->
        <li :class="{ cur: curTitle === '分类' }">
            <router-link to="/category">分类</router-link>
        </li>
        <li :class="{ cur: curTitle === 'pie词根' }">
            <router-link to="/pieroot">pie词根</router-link>
        </li>
        <li :class="{ cur: curTitle === '词根' }">
            <router-link to="/wordroot">词根</router-link>
        </li>
        <li :class="{ cur: curTitle === '前缀' }">
            <router-link to="/prefix">前缀</router-link>
        </li>
        <li :class="{ cur: curTitle === '后缀' }">
            <router-link to="/suffix">后缀</router-link>
        </li>
        <li :class="{ cur: curTitle === '简单词' }">
            <router-link to="/simpleword">简单词</router-link>
        </li>
    </ul>
    <p>{{ curTitle }}</p>
    <router-view></router-view>
</template>

<script lang="ts" setup>
// -2、引用
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

// -1.类型
// 0、父组件相关
// 1、属性
const curTitle = ref("");
const route = useRoute();
const routeTitleMap = new Map([
    ["/home", "首页"],
    ["/dict", "字典"],
    ["/category", "分类"],
    ["/pieroot", "pie词根"],
    ["/wordroot", "词根"],
    ["/prefix", "前缀"],
    ["/suffix", "后缀"],
]);

// 2、辅助方法
// 3、异步
// 4、交互
// 5、生命周期
watch(
    () => route.path,
    (n, _o) => {
        curTitle.value = routeTitleMap.get(n) || "";
    },
    {
        immediate: true,
    }
);
onMounted(() => {
    const store = useStore();
    store.dispatch("category/getCategory");
});

// 6、外部
</script>
<style lang="less" scoped>
ul {
    text-align: left;
    li {
        display: inline-block;
        margin-right: 5px;
        &.cur {
            font-weight: 700;
        }
    }
}
p {
    text-align: center;
    font-weight: 700;
    color: #f00;
}
</style>

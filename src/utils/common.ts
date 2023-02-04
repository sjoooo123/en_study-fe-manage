import { pierootType } from "../api/pieroot";
import { langTypeOptions } from './options';

// 展示示例
export const getExample = (example: string) => {
    const formatExampleList =
        example?.indexOf("[") === 0
            ? JSON.parse(example)
            : [
                  {
                      word: "",
                      split: example,
                      midmean: "",
                      translation: "",
                  },
              ];
    let resultMes = "";
    formatExampleList.forEach((item, index) => {
        resultMes =
            (resultMes ? resultMes + "\n" : "") + // 第一行
            (item.word ? +index + 1 + "." + item.word : "") + // 数组
            (item.word.length ? " = " : "") +
            item.split +
            (item.midmean.length ? " → " : "") +
            item.midmean +
            (item.translation.length ? " → " : "") +
            item.translation;
    });
    return resultMes;
};

// 展示词源名称
export const getSourceName = (row: pierootType) => {
    const {pieroot, translation, type} = row;
    const typeMes = langTypeOptions.find(item=>item.value===type)?.label || '未知语言';
    let resultMes = pieroot.indexOf('-')>0 ? pieroot : pieroot + '-' + translation?.replace(/\，|\、|\；|\。/g,',').split(',')[0];
    resultMes = '(' + typeMes + ')' + resultMes;

    return resultMes;
};

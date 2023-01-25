import { pierootType } from "../api/pieroot";

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
    const {pieroot, translation, chainInfo} = row;
    const chainList =
        chainInfo?.indexOf("[") === 0
            ? JSON.parse(chainInfo)
            : [];
    let resultMes = pieroot.indexOf('-')>0 ? pieroot : pieroot + '-' + translation?.replace(/\，|\、|\；|\。/g,',').split(',')[0];
    chainList.forEach((item, _index) => {
        // 词义，只截取第一个
        const transMes = item.translation.replace(/\，|\、|\；|\。/g,',').split(',')[0]
        resultMes += '🡄' + item.word + '-' + transMes;
    });

    return resultMes;
};

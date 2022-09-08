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


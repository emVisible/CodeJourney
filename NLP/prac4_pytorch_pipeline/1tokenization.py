"""
  使用transformers提供的pipeline完成一系列任务
  知识点：
    管道中有三个阶段:
      Tokenization(tokenizer, 标记生成器; tokenization, 标记/文本标注)
        原始文本=>拆分不同的tokens=>添加特殊标记(CLS SEP)=>词汇表匹配,生成InputID
      model
      postprocessing
"""
from transformers import pipeline, AutoTokenizer

"""
  情感分析
"""


def sentiment_analysis() -> None:
    classifier = pipeline("sentiment-analysis")
    res = classifier(
        [
            "We need more people like Andrew Ng in this world, very inspiring and helpful.",
            "I hate this so much.",
        ]
    )
    print(f"{res}")


"""
  Stage 1 返回文本对应的pytorch张量

  {
    'input_ids': tensor([
        [  101,  2057,  2342,  2062,  2111,  2066,  4080, 12835,  1999,  2023,
          2088,  1010,  2200, 18988,  1998, 14044,  1012,   102],
        [  101,  1045,  5223,  2023,  2061,  2172,  1012,   102,     0,     0,
          0,     0,     0,     0,     0,     0,     0,     0]
      ]),
    'attention_mask': tensor([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ])
  }
"""


def tokenization():
    # 实例化标记生成器
    # checkpoint为默认情感分析checkpoint
    # from_pretrained 下载并缓存给定的checkpoint的权重和词汇表
    checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
    tokenizer = AutoTokenizer.from_pretrained(checkpoint)

    # 原始数据
    raw_inputs = [
        "We need more people like Andrew Ng in this world, very inspiring and helpful.",
        "I hate this so much.",
    ]

    # 原始数据处理, 将文本表示为张量
    # 设置pt代表返回pytorch框架下的张量
    inputs = tokenizer(raw_inputs, padding=True, truncation=True, return_tensors="pt")
    print(inputs)
    return inputs


tokenization()

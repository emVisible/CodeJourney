"""
  句子对
    在处理句子对时, 常常会遇到两个句子表意相同的情况(duplicate)
      not duplicate 非重复
      duplicate     重复
  这种处理语句在逻辑上相关的分类, 叫做自然语言推理(Natural Language Inference)
      MultiNLI中的例子: contradiction 矛盾 / neural 中性 / entailnment 蕴含
  GLUE (General Language Understanding Evaluation)
    行业测试NLP性能的标准, 通过多个任务测试NLP的性能
    涵盖了文本分类、文本相似度、情感分析、自然语言推理
  在文本分类中, 分为单句子和句子对两种
    单句子:
      COLA                理解性能 语法和句法
      SST-2               情感极性（正面、负面或中性）
    句子对:
      MNLI(MultiNLI)                            句子关系 (矛盾、中性、蕴含)           文本分类任务
      QQP(Quora Question Pairs)                 语义相似度                            文本相似度任务
      CoLA(Corpus of Linguistic Acceptbility)   语法和句法                            语法/句法任务
      SST-2(Stanford Sentiment TreeBank)        情感极性（正面、负面或中性）          情感分类
      MRPC(Microsoft Research Paraphase Corpus) 同义句分析                            文本相似度任务
      RTE(Recognizing Textral Entailment)       一个句子是否可以从另一个句子推理出来  自然语言推理任务

    除了modeling的目的, 对于句子对还拥有其相关的处理, 如
      BERT在预训练期间:
        1. 显示成对句子并随机屏蔽标记的值
        2. 确认第二个句子是否来自第一个句子(NLI)
"""
from transformers import AutoTokenizer

checkpoints = "bert-base-cased"
tokenizer = AutoTokenizer.from_pretrained(checkpoints)
sentence = ["I have been waiting for a new life.", "My life is not bad."]
"""
  {
    'input_ids': tensor([[ 101,  146, 1138, 1151, 2613, 1111,  170, 1207, 1297,  119,  102],
      [ 101, 1422, 1297, 1110, 1136, 2213,  119,  102,    0,    0,    0]]),
    'token_type_ids': tensor([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]),
    'attention_mask': tensor([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]])
  }
"""
batch = tokenizer(sentence, padding=True, truncation=True, return_tensors="pt")
print(batch)

"""
  Huggingface API 处理句子对只需要分别传入句子
  token_type_ids 是一个与输入令牌对应的序列，它告诉模型每个令牌属于哪个文本片段。
    通常，对于句子对任务，例如文本相似度任务，这个列的值为 0 或 1，其中：
      0 表示某个令牌属于第一个文本片段（通常是 "sentence1"）。
      1 表示某个令牌属于第二个文本片段（通常是 "sentence2"）。
  {
    'input_ids': [101, 146, 1138, 1151, 2613, 1111, 170, 1207, 1297, 119, 102, 1422, 1297, 1110, 1136, 2213, 119, 102],
    'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }
"""
pair_input = tokenizer(
    "I have been waiting for a new life.", "My life is not bad."
)  # 单对句子
"""
  token_type_ids需要和attention_mask一起来看
  {
    'input_ids': [
      [101, 146, 1138, 1151, 2613, 1111, 170, 1207, 1297, 119, 102, 1109, 2235, 1431, 1136, 1129, 1215, 1106, 16841, 2561, 10518, 1137, 8143, 3798, 10152, 1111, 1234, 119, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [101, 1422, 1297, 1110, 1136, 2213, 119, 102, 1130, 1901, 117, 1103, 2235, 1108, 1136, 3972, 1106, 1129, 1864, 4746, 1137, 2276, 16539, 1104, 1234, 1137, 1958, 117, 1105, 3335, 1606, 1103, 2235, 1106, 9509, 1216, 3438, 1110, 1149, 118, 1104, 118, 9668, 1111, 1103, 7134, 1104, 1142, 2235, 119, 102]
    ],
    'token_type_ids': [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    'attention_mask': [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
  }
"""
pairs_input = tokenizer(
    ["I have been waiting for a new life.", "My life is not bad."],
    [
        "The model should not be used to intentionally create hostile or alienating environments for people.",
        "In addition, the model was not trained to be factual or true representations of people or events, and therefore using the model to generate such content is out-of-scope for the abilities of this model.",
    ],
    padding=True,
)  # 多对句子
print(pair_input)
print(pairs_input)

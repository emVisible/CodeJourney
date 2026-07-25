"""
  Stage2 将stage1生成的tensor转为logits
  AutoModel是通用的、不包含分类头的预训练模型
    而AutoModelForSequenceClassification是特定于文本分类任务的模型, 它包含了一个分类头
"""
from transformers import AutoModel, AutoTokenizer, AutoModelForSequenceClassification


def tokenization():
    checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
    tokenizer = AutoTokenizer.from_pretrained(checkpoint)
    raw_inputs = [
        "We need more people like Andrew Ng in this world, very inspiring and helpful.",
        "I hate this so much.",
    ]
    inputs = tokenizer(raw_inputs, padding=True, truncation=True, return_tensors="pt")
    return inputs


"""
  输出高维张量, 其为所传递句子的表示, 结果不能直接用于分类
"""


def model():
    checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
    model = AutoModel.from_pretrained(checkpoint)
    inputs = tokenization()
    outputs = model(**inputs)
    print(outputs.last_hidden_state)


# model()

"""
  loss被设置为None，这意味着在模型的训练中没有计算损失值
  Logits是模型在没有经过激活函数（如softmax）的情况下的原始输出值
    它们表示每个类别的得分或概率，
    用于确定输入数据属于各个类别的可能性。
    softmax函数可以将logits转换为概率分布，确保所有类别的概率之和为1
  SequenceClassifierOutput(
    loss=None,
    logits=tensor([
      [-3.7817,  4.0404],
      [ 4.2321, -3.4101]],
      grad_fn=<AddmmBackward0>),
    hidden_states=None, attentions=None)
"""


def model2():
    checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
    model = AutoModelForSequenceClassification.from_pretrained(checkpoint)
    inputs = tokenization()
    outputs = model(**inputs)
    print(outputs)


model2()

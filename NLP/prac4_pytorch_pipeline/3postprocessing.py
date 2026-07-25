"""
  stage3 将stage2生成的logits转化为概率
"""
import torch
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


def model2():
    checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
    model = AutoModelForSequenceClassification.from_pretrained(checkpoint)
    inputs = tokenization()
    outputs = model(**inputs)
    return outputs


"""
使用softmax层, 转换为和为1的概率, 使用float可以将xxxe-xx转为小数的形式
tensor([
        [4.0063e-04, 9.9960e-01],
        [9.9952e-01, 4.7952e-04]
        ],
        grad_fn=<SoftmaxBackward0>)
"""


def postprocessing():
    outputs = model2()
    predictions = torch.nn.functional.softmax(outputs.logits, dim=1)
    print(predictions)


if __name__ == "__main__":
    postprocessing()

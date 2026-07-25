from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

"""
  处理多批次input
"""
checkpoints = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
raw_inputs = [
    "Do you have a creative JavaScript project that you think would be a great addition to our collection? Submit your project!",
    "Have an idea for a new project? Create a new issue by clicking on the New Issue button and updating the pre-defined template.",
    "Make some awesome projects, put them in your directory and create a pull request. and DONE.",
]
tokens = [tokenizer.tokenize(data) for data in raw_inputs]
ids = [tokenizer.convert_tokens_to_ids(token) for token in tokens]
final = [tokenizer.prepare_for_model(token_id) for token_id in ids]

print(tokens)
print(ids)
print(f"final: {final}")
"""
  一般通过添加特殊token来完成ids在转化为张量前的处理, 另一种方法是按句子最短的那一个为长度标准,
    对其它句子进行truncate, 不过会导致信息的严重丢失, 所以一般的truncate只在句子超过模型可处理的
    最大长度时才使用
  模型对padding的填充在预训练时已经定义好
"""
ids = [torch.tensor(subsentence["input_ids"]) for subsentence in final]
print(ids)
print(type(ids))

'''
  有了ids, 相当于有了最终输入, 即使用api即可获得输出
'''
tokenizer = AutoTokenizer.from_pretrained(checkpoints)
model = AutoModelForSequenceClassification.from_pretrained(checkpoints)
inputs = tokenizer(raw_inputs, padding=True, truncation=True, return_tensors="pt")
res = model(**inputs)
print(f"res: {res}")

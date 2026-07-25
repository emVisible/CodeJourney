from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

checkpoints = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoints)
raw_inputs = [
    "Do you have a creative JavaScript project that you think would be a great addition to our collection? Submit your project!",
    "Have an idea for a new project? Create a new issue by clicking on the New Issue button and updating the pre-defined template.",
    "Make some awesome projects, put them in your directory and create a pull request. and DONE.",
]

# 使用tokenizer将原始文本编码成模型所需的格式
inputs = tokenizer(raw_inputs, padding=True, truncation=True, return_tensors="pt")

# 打印编码后的输入
print(inputs)

# 创建模型
model = AutoModelForSequenceClassification.from_pretrained(checkpoints)

# 运行模型
outputs = model(**inputs)

# 打印模型输出
print(outputs)
"""
  通过training API, 可以方便地传递超参数、数据集、模型、分词器等进行微调
"""

from transformers import (
    AutoTokenizer,
    DataCollatorWithPadding,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
)
import numpy as np
from datasets import load_dataset, load_metric


dataset = load_dataset("glue", "mrpc")  # Microsoft Research Paraphrase Corpus数据子集
metric = load_metric("glue", "mrpc")  # 用于评估的度量指标
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased") # 预训练模型

"""
  评估指标函数
"""


def compute_metrics(eval_preds):
    logits, labels = eval_preds
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)


"""
  分词函数
"""


def tokenize(examples):
    return tokenizer(examples["sentence1"], examples["sentence2"], truncation=True)

# 分词
tokenized_data = dataset.map(tokenize, batched=True)
# 填充
data_collector = DataCollatorWithPadding(tokenizer)

# 模型加载
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-cased", num_labels=2
)

# 超参数
training_args = TrainingArguments(
    "test-trainer",
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=5,
    learning_rate=2e-5,
    weight_decay=0.01,
    evaluation_strategy="epoch",
)

# 训练模型的类
trainer = Trainer(
    model,
    training_args,
    train_dataset=tokenized_data["train"],
    eval_dataset=tokenized_data["validation"],
    data_collator=data_collector,
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)

# 训练
trainer.train()

# 获取预测集结果
predictions = trainer.predict(tokenized_data["validation"])
print(predictions.predictions.shape, predictions.label_ids.shape)

# 每个预测结果最大值对应的索引
preds = np.argmax(predictions.predictions, axis=-1)
# 计算模型评估指标
res = metric.compute(predictions=preds, references=predictions.label_ids)
print(res)


trainer.save_model('./model')

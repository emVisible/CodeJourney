'''
  动态批处理
    动态批处理速度更快, 优先使用
    如果在TPU训练, 需要切换回固定padding 
'''
from transformers import AutoTokenizer, DataCollatorWithPadding
from datasets import load_dataset
from torch.utils.data import DataLoader

checkpoint = "bert-base-cased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)


def handle_tokenize(example):
    return tokenizer(example["sentence1"], example["sentence2"], truncation=True)


raw_datasets = load_dataset("glue", "mrpc")
raw_datasets = raw_datasets.map(handle_tokenize, batched=True)
raw_datasets = raw_datasets.remove_columns(["sentence1", "sentence2", "idx"])
raw_datasets = raw_datasets.rename_column("label", "labels")
raw_datasets = raw_datasets.with_format("torch")
data_collector = DataCollatorWithPadding(tokenizer)
train_dataloader = DataLoader(
    raw_datasets["train"], batch_size=16, shuffle=True, collate_fn=data_collector
)
'''
  torch.Size([16, 76])
  torch.Size([16, 74])
  torch.Size([16, 81])
  torch.Size([16, 73])
  torch.Size([16, 106])
  torch.Size([16, 90])
  torch.Size([16, 80])
'''
for step, batch in enumerate(train_dataloader):
    print(batch['input_ids'].shape)
    if step > 5:
        break

from transformers import AutoTokenizer
from datasets import load_dataset
from torch.utils.data import DataLoader

checkpoint = "bert-base-cased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)


def handle_tokenize(example):
    return tokenizer(
        example["sentence1"],
        example["sentence2"],
        padding="max_length",
        truncation=True,
        max_length=128,
    )


raw_datasets = load_dataset("glue", "mrpc")
tokenized_datasets = raw_datasets.map(handle_tokenize, batched=True)
tokenized_datasets = tokenized_datasets.remove_columns(
    ["sentence1", "sentence2", "idx"]
)
tokenized_datasets = tokenized_datasets.rename_column("label", "labels")
tokenized_datasets = tokenized_datasets.with_format(type="torch")
print(tokenized_datasets)

"""
  step: 0
  batch: {'labels': tensor([1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1]), 'input_ids': tensor([[  101, 12423,  1116,  ...,     0,     0,     0],
        [  101,  1284,  1274,  ...,     0,     0,     0],
        [  101,  1994,  1110,  ...,     0,     0,     0],
        ...,
        [  101, 11336, 20080,  ...,     0,     0,     0],
        [  101,  1448,  1104,  ...,     0,     0,     0],
        [  101,  1220,  1417,  ...,     0,     0,     0]]), 'token_type_ids': tensor([[0, 0, 0,  ..., 0, 0, 0],
        [0, 0, 0,  ..., 0, 0, 0],
        [0, 0, 0,  ..., 0, 0, 0],
        ...,
        [0, 0, 0,  ..., 0, 0, 0],
        [0, 0, 0,  ..., 0, 0, 0],
        [0, 0, 0,  ..., 0, 0, 0]]), 'attention_mask': tensor([[1, 1, 1,  ..., 0, 0, 0],
        [1, 1, 1,  ..., 0, 0, 0],
        [1, 1, 1,  ..., 0, 0, 0],
        ...,
        [1, 1, 1,  ..., 0, 0, 0],
        [1, 1, 1,  ..., 0, 0, 0],
        [1, 1, 1,  ..., 0, 0, 0]])}
"""
train_dataloader = DataLoader(tokenized_datasets["train"], batch_size=16, shuffle=True)
for step, batch in enumerate(train_dataloader):
    print(f"step: {step}")
    print(f"batch: {batch}")
    """
      shape: 16 * 128
    """
    # print(batch['input_ids'].shape)
    if step > 5:
        break

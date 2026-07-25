"""
  datasets库: 提供公共数据集
  这个python文件主要说明使用远程数据如何操作
    huggingface datasets使用Apache Arrow存到磁盘——即便数据集很大也不会耗尽RAM, 只有请求的元素才会加载到内存中
"""
from datasets import load_dataset
from transformers import AutoTokenizer

checkpoint = "bert-base-cased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)


def tokenize_function(example):
    return tokenizer(
        example["sentence1"],
        example["sentence2"],
        padding="max_length",
        truncation=True,
        max_length=128,
    )


"""
  load_dataset返回DatasetDict, 包含数据集每个分割的字典
"""
raw_datasets = load_dataset("glue", "mrpc")
"""
  Dataset({
    features: ['sentence1', 'sentence2', 'label', 'idx'],
    num_rows: 3668
  })
"""
train = raw_datasets["train"]
"""
  {
  'sentence1': 'The Nasdaq had a weekly gain of 17.27 , or 1.2 percent , closing at 1,520.15 on Friday .',
  'sentence2': 'The tech-laced Nasdaq Composite .IXIC rallied 30.46 points , or 2.04 percent , to 1,520.15 .',
  'label': 0,
  'idx': 6
  }
"""
single_data = train[6]
"""
  {'sentence1':
      [
      'Amrozi accused his brother , whom he called " the witness " , of deliberately distorting his evidence .',
      "Yucaipa owned Dominick 's before selling the chain to Safeway in 1998 for $ 2.5 billion .",
      'They had published an advertisement on the Internet on June 10 , offering the cargo for sale ,he added .',
      'Around 0335 GMT , Tab shares were up 19 cents , or 4.4 % , at A $ 4.56 , having earlier set a record high of A $ 4.57 .',
      'The stock rose $ 2.11 , or about 11 percent , to close Friday at $ 21.51 on the New York Stock Exchange .',
      'Revenue in the first quarter of the year dropped 15 percent from the same period a year earlier .'],
    'sentence2':
      ['Referring to him as only " the witness " , Amrozi accused his brother of deliberately distorting his evidence .',
      "Yucaipa bought Dominick 's in 1995 for $ 693 million and sold it to Safeway for $ 1.8 billion in 1998 .",
      "On June 10 , the ship 's owners had published an advertisement on the Internet ,
        offering the explosives for sale .",
      'Tab shares jumped 20 cents , or 4.6 % , to set a record closing high at A $ 4.57 .',
      'PG & E Corp. shares jumped $ 1.63 or 8 percent to $ 21.03 on the New York Stock Exchange on Friday .',
      "With the scandal hanging over Stewart 's company , revenue the first quarter of the year dropped 15 percent from the same period a year earlier ."],
    'label': [1, 0, 1, 0, 1, 1],
    'idx': [0, 1, 2, 3, 4, 5]
  }
"""
multi_data = train[:6]

"""
  features提供了整数和标签名称的对应关系
    not_equivalent 代表不等同
    equivalent 代表等同
  {
    'sentence1': Value(dtype='string', id=None),
    'sentence2': Value(dtype='string', id=None),
    'label': ClassLabel(names=['not_equivalent', 'equivalent'], id=None),
    'idx': Value(dtype='int32', id=None)
  }
"""
data_features = train.features

print(train)
print(single_data)
print(multi_data)
print(data_features)

"""
  对raw_data进行tokenization操作, 通过map添加features
    DatasetDict({
    train: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 3668
    })
    validation: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 408
    })
    test: Dataset({
        features: ['sentence1', 'sentence2', 'label', 'idx', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 1725
    })
  })
  这里的batched=True用在较大的数据规模时, 开启后并行处理; 默认是串行处理;
"""
tokenized_datasets = raw_datasets.map(tokenize_function, batched=True)
print(tokenized_datasets)

"""
  数据清理, 清除掉不需要使用的列
  input_ids 就是stage1 tokenization中最后的输出——文本经过编码 && 分词后的标识符,
    每个词映射到唯一ID, 用于表示输入文本的token序列, 所以sentence在这里并不需要
  DatasetDict({
    train: Dataset({
        features: ['labels', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 3668
    })
    validation: Dataset({
        features: ['labels', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 408
    })
    test: Dataset({
        features: ['labels', 'input_ids', 'token_type_ids', 'attention_mask'],
        num_rows: 1725
    })
  })
"""
tokenized_datasets = tokenized_datasets.remove_columns(
    ["idx", "sentence1", "sentence2"]
)
tokenized_datasets = tokenized_datasets.rename_column("label", "labels")
"""
  可以调整output的后端形式: numpy tensorflow torch
  如果需要, 可以使用select获取一些小样本
  tokenized_datasets['train'].select(range(100))
"""
tokenized_datasets = tokenized_datasets.with_format("torch")
print(tokenized_datasets)

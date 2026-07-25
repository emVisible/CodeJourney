from transformers import AutoTokenizer

"""
  transformers提供的AutoTokenizer分词器
    首先, 加载预训练模型
    其次, 内部会把input转换为tokens(单词、单词的一部分、特殊标记)
    然后, 分词器会添加一些特殊标记
    最后, 将每个标记转为唯一ID
"""
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
raw_inputs = [
    "Do you have a creative JavaScript project that you think would be a great addition to our collection? Submit your project!",
    "Have an idea for a new project? Create a new issue by clicking on the New Issue button and updating the pre-defined template.",
    "Make some awesome projects, put them in your directory and create a pull request. and DONE.",
]
inputs = tokenizer(raw_inputs)
print(inputs)

"""
  ['let', "'", 's', 'build', 'from', 'here', 'for', 'token', 'and', 'token', '##ize']
  具体过程
    0. 预处理。全部转为小写, 使用subword tokenizaiton algorithm
    1. 使用tokenize方法将句子拆分为tokens
"""
tokens = tokenizer.tokenize("Let's build from here for token and tokenize")
print(tokens)

'''
  albert: ['▁let', "'", 's', '▁build', '▁from', '▁here', '▁for', '▁to', 'ken', '▁and', '▁to', 'ken', 'ize']
  albert使用不同的tokenizer约定, 其结果会在每个前方是空格的单词前添加__
'''
def albert_tokenizer():
    tokenizer = AutoTokenizer.from_pretrained("albert-base-v1")
    tokens = tokenizer.tokenize("Let's build from here for token and tokenize")
    print(f"albert: {tokens}")

albert_tokenizer()
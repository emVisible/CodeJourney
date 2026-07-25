'''
  tokenizer(sentences, Padding=True)时attention_mask以及padding原理
'''

from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
'''
  对包含多个语句进行向量化的logtis结果与单个向量化的结果不同, 其原因就是自注意力机制, 即all_sentence 中
  的PADDING, 比如:
    i like this.
    i like this [PAD] [PAD] [PAD].
  默认情况下, PADDING不同, logits的结果也不会相同
  在有或者没有填充的情况下, 如果需要获得相同结果, 需要向注意力层表明忽略填充标记
    忽略填充标记的内部实现原理是创建attention_mask, attention_mask是一个与输入ID具有相同shape的0,1两种状态的张量
    1表示不忽略, 0表示忽略
'''
checkpoints = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(checkpoints)
raw_inputs = [
    "Do you have a creative JavaScript project that you think would be a great addition to our collection? Submit your project!",
    "Have an idea for a new project? Create a new issue by clicking on the New Issue button and updating the pre-defined template."
]

sentence1 = torch.tensor([[  101,  2079,  2017,  2031,  1037,  5541,  9262, 22483,  2622,  2008,
          2017,  2228,  2052,  2022,  1037,  2307,  2804,  2000,  2256,  3074,
          1029, 12040,  2115,  2622,   999,   102]])


sentence2 = torch.tensor([[  101,  2031,  2019,  2801,  2005,  1037,  2047,  2622,  1029,  3443,
          1037,  2047,  3277,  2011, 22042,  2006,  1996,  2047,  3277,  6462,
          1998,  2039, 16616,  1996,  3653,  1011,  4225, 23561,  1012,   102,
          ]])

all_sentence = torch.tensor([
        [  101,  2079,  2017,  2031,  1037,  5541,  9262, 22483,  2622,  2008,
          2017,  2228,  2052,  2022,  1037,  2307,  2804,  2000,  2256,  3074,
          1029, 12040,  2115,  2622,   999,   102,  0,     0,     0,     0],
        [  101,  2031,  2019,  2801,  2005,  1037,  2047,  2622,  1029,  3443,
          1037,  2047,  3277,  2011, 22042,  2006,  1996,  2047,  3277,  6462,
          1998,  2039, 16616,  1996,  3653,  1011,  4225, 23561,  1012,   102
          ]
])

model = AutoModelForSequenceClassification.from_pretrained(checkpoints)
'''

  sentence1的原始logits值 [[-1.8496,  1.9923]]
'''
output1 = model(sentence1)
'''
  sentence2的原始logits值 [[ 2.3498, -1.9665]]
'''
output2 = model(sentence2)
'''
  sentences的考虑padding的logtis值[[-0.3160,  0.4910],[ 2.3498, -1.9665]]
'''
output3 = model(all_sentence)
'''
  mask的shape要与sentences的shape相同, 在此基础上运用mask
  即忽略掉sentence1的PADDING值, 其计算结果与原始的sentence1便可相同
'''
mask = torch.tensor([
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, ],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
])
print(f"mask {mask}")
'''
  sentences的使用注意力掩码的logits值, 与原始值相等[[-1.8496,  1.9923],[ 2.3498, -1.9665]]
'''
output4 = model(all_sentence, attention_mask=mask)
# 打印模型输出
print(output1)
print(output2)
print(output3)
print(output4)
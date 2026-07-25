'''
  处理多句子对的实现
'''
from transformers import AutoTokenizer, AutoModelForSequenceClassification

checkpoint = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
batch = tokenizer(
    ["I have been waiting for a new life.", "My life is not bad."],
    [
        "The model should not be used to intentionally create hostile or alienating environments for people.",
        "In addition, the model was not trained to be factual or true representations of people or events, and therefore using the model to generate such content is out-of-scope for the abilities of this model.",
    ],
    padding=True,
    return_tensors="pt",
)

model = AutoModelForSequenceClassification.from_pretrained(checkpoint)
"""
  SequenceClassifierOutput(
        loss=None,
        logits=tensor([[-0.2323,  0.1941], [-0.3701,  0.5048]], grad_fn=<AddmmBackward0>),
        hidden_states=None, attentions=None
        )
"""
output = model(**batch)
print(output)

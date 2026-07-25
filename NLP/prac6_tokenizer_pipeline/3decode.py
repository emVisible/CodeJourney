from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer("let's build for token and tokenization.")
res = tokenizer.decode(tokens["input_ids"])
print(f"{res}")
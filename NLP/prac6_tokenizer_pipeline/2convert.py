from transformers import AutoTokenizer


tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
raw_inputs = "Let's build from here for token and tokenize"

"""
  ⭐tokenizer pipeline flow
  直接调用tokenizer() = tokenizer.tokenize() + tokenizer.convert_to_ids() + tokenizer.prepare_for_model()
"""


def integrated_api():
    tokens = tokenizer(raw_inputs)
    print(f"straight use tokenizer:\n\t{tokens['input_ids']}")


integrated_api()

"""
  第一步 分词 / 标记
"""
tokens = tokenizer.tokenize(raw_inputs)
print(f"after tokens:\n\t{tokens}")


"""
  第二步 映射
    将tokens映射到由tokenizer词汇定义的id
    这也是为什么使用AutoTokenizer.from_pretrained时需要下载文件——确保使用与预训练模型相同的id映射
    使用convert_token后, 特殊标记的token会缺失
    output: [2292, 1005, 1055, 3857, 2013, 2182, 2005, 19204, 1998, 19204, 4697], 缺少了101 CLS和102 SEP
"""
inputs_ids = tokenizer.convert_tokens_to_ids(tokens)
print(f"after convert:\n\t {inputs_ids}")

"""
  第三步 添加特殊标记
    由于所有的数组或者张量必须为矩形, 而每句话的长度不一, 所以需要添加特殊标记满足张量化需求
    添加缺失的special tokens, 至此与直接使用tokenizer api的结果相同
"""
final_inputs = tokenizer.prepare_for_model(inputs_ids)
print(f"after prepare: \n\t{final_inputs['input_ids']}")

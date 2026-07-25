from transformers import AutoModel, BertConfig, BertModel

"""
  Automodel运行流程
    打开配置文件, 查看并加载配置类(config class) && 产生配置项(model config), 不同的模型拥有不同的类
      AutoModel更便捷, 分开加载操作的颗粒度更高
      AutoModel = XxxConfig + XxxModel
    可以加载特定的类, AutoModel只是在AutoConfig上进行了自动识别Config并进行modeling
"""

bert_based_model = AutoModel.from_pretrained("bert-base-cased")
# 输出BertConfig对象，包含创建模型架构所需的所有信息
bert_based_model2 = BertConfig.from_pretrained("bert-base-cased", num_hidden_layers=10)
bert_model = BertModel(bert_based_model2)

gpt_model = AutoModel.from_pretrained("gpt2")
bart_model = AutoModel.from_pretrained("facebook/bart-base")

print(f"bert: {bert_based_model}\n gpt:{gpt_model} \n  bart:{bart_model}")
print(f"{bert_based_model2}")

'''
  保存训练的模型
    使用训练的模型
      BertModel.from_pretrained('my-bert-model')
'''
bert_model.save_pretrained('my-bert-model')
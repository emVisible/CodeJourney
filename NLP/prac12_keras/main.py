import tensorflow as tf
from transformers import TFAutoModelForSequenceClassification

checkpoint = "bert-base-cased"
model = TFAutoModelForSequenceClassification.from_pretrained(checkpoint, num_labels=2)

'''
  稀疏分类交叉熵loss——分类任务 && 神经网络的标准损失函数
'''
loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
'''
  在训练模型前必须compile
'''
model.compile(optimizer="adam", loss=loss)
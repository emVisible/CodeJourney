"""
  应对一个batch中固定shape, 通常有两种方法:
    1. 对齐最长(固定填充): 找到最长的sentence, 将其余所有sentence与之对齐, 使得一个batch内shape相同
      优点: 所有batch都拥有同样长的shape
      缺点: 较多的冗余。 较短的句子会有较多的padding token
    2. 对齐最短(动态填充): 对齐最短的sentence, 不断处理batch中最长的句子, 使得shape最终相同
      优点: 所有batch都尽可能达到最小
      缺点: 每个batch的shape都不相同, 会减慢一些accelerator
"""
'''
  固定shape方案
'''

const deepseek = require('../config/deepseek')


exports.createNotification = async (req, res) => {
  try {
    let {
      tips
    } = req.body;

    // 构建系统提示词
    const systemPrompt = `你是一个专业的通知生成、润色助手，你的一切输出都将使用不带样式的HTML标签语法。请根据用户的要求，自动帮用户生成一条格式规整、直观的通知，可以适当加入emoji来增加阅读性。`;

    // 创建临时对话
    const completion = await deepseek.chat.completions.create({
      messages: [{
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: tips
        }
      ],
      model: "deepseek-chat",
    });

    const anwser = completion.choices[0].message.content;

    return res.send({
      code: 200,
      msg: '生成成功',
      row: anwser
    })
  } catch (error) {
    console.error('Error:', error);
    res.send({
      code: 500,
      msg: '生成失败'
    });
  }
};
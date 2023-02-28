const { Post, User } = require('../../../app')

exports.main = async (req, res) => {
  const { uuid, type, current, sortField } = req.query

  try {
    // 帖子详情页面
    if (uuid && type === 'detail' && !current && !sortField) {
      const post = await Post.findOne({
        attributes: ['uuid', 'createdAt', 'updatedAt', 'title', 'html'],
        include: {
          model: User,
          attributes: ['uuid', 'username', 'bio'],
        },
        where: { uuid, publicly: true },
      })
      res.status(post ? 200 : 400).json({
        code: post ? 200 : 400,
        data: post,
        message: post ? 'ok' : '该帖子不存在或关闭了公开访问！',
      })
      // 主页 推荐/最多收藏/最多浏览 页面
    } else if (!uuid && type === 'category' && current && sortField) {
      const limit = 5
      const { rows } = await Post.findAndCountAll({
        limit,
        attributes: ['uuid', 'createdAt', 'updatedAt', 'title', 'text'],
        include: {
          model: User,
          attributes: ['uuid', 'username', 'bio'],
        },
        offset: Number(current) * limit - limit,
        order: [[sortField, 'DESC']],
        where: {
          publicly: true,
        },
      })
      res.status(200).json({ code: 200, data: rows, message: 'ok' })
    } else {
      res.status(400).json({ code: 400, data: null, message: '参数无效！' })
    }
  } catch (e) {
    res.status(400).json({ code: 400, data: null, message: '服务器错误！' })
  }
}

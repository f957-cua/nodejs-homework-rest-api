const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const {User} = require('../../models')
const { Unauthorized } = require('http-errors')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const updateImage = async(req, res) => {
  //create uniqe name
  const {id} = req.user
  const {path: tempPath, originalname} = req.file
  const uniqeName = `${id}${originalname}`

  //create upload path
  const uploadPath = path.join(avatarDir, uniqeName)

  try {
    //handling avatar
    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(tempPath)

    //transfer file
    await fs.rename(tempPath, uploadPath)

    //send img to db
    const avatarURL = `/avatars/${uniqeName}`
    await User.findByIdAndUpdate(req.user.id, {avatarURL})

    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL
      }
    })
  } catch (error) {
    fs.unlink(tempPath)
    throw new Unauthorized()
  }
}

module.exports = updateImage
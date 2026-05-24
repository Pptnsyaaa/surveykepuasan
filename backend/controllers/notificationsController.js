import db from '../db.js'

export const getNotifications=(req,res)=>{

db.query(

`

SELECT *
FROM notifications

ORDER BY id DESC

LIMIT 20

`,

(err,results)=>{

if(err){

return res
.status(500)
.json({

success:false,

message:err.message

})

}

res.json(results)

}

)

}

export const markNotificationRead = (req, res) => {
  const { id } = req.params

  db.query(
    `
      UPDATE notifications
      SET status = 'read'

      WHERE id = ?
    `,
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Notifikasi tidak ditemukan'
        })
      }

      res.json({
        success: true,
        message: 'Notifikasi ditandai dibaca'
      })
    }
  )
}

export const markAllNotificationsRead = (req, res) => {
  db.query(
    `
      UPDATE notifications
      SET status = 'read'
      WHERE status = 'unread'
    `,
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }

      res.json({
        success: true,
        message: 'Semua notifikasi ditandai dibaca'
      })
    }
  )
}

export const deleteNotification = (req, res) => {
  const { id } = req.params

  db.query(
    `
      DELETE FROM notifications
      WHERE id = ?
    `,
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Notifikasi tidak ditemukan'
        })
      }

      res.json({
        success: true,
        message: 'Notifikasi dihapus'
      })
    }
  )
}

export const deleteAllNotifications = (req, res) => {
  db.query(
    `
      DELETE FROM notifications
    `,
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        })
      }

      res.json({
        success: true,
        message: 'Semua notifikasi dihapus'
      })
    }
  )
}


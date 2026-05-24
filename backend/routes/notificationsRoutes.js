import express from 'express'

import {
getNotifications,
deleteNotification,
markNotificationRead,
markAllNotificationsRead,
deleteAllNotifications
} from '../controllers/notificationsController.js'

const router=
express.Router()

router.get(
'/',
getNotifications
)

router.patch(
'/:id/read',
markNotificationRead
)

router.patch(
'/read-all',
markAllNotificationsRead
)

router.delete(
'/:id',
deleteNotification
)

router.delete(
'/',
deleteAllNotifications
)

export default router
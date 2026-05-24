import express from 'express'

import {
saveSurvey,
getSurveys
}
from '../controllers/surveyController.js'

const router=
express.Router()


router.post(
'/',
saveSurvey
)


router.get(
'/',
getSurveys
)

export default router
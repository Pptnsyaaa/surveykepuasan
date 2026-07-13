import express from 'express'
import { getSettings, saveDepartments, saveQuestions } from '../controllers/settingsController.js'

const router = express.Router()

router.get('/', getSettings)
router.post('/departments', saveDepartments)
router.post('/questions', saveQuestions)

export default router

// ===============================
// API CONFIGURATION
// ===============================

const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  ''

console.log('🔌 API Base URL:', API_BASE_URL || 'relative path')

export const API = {
  SURVEY: {
    GET_ALL: `${API_BASE_URL}/api/survey`,
    SAVE: `${API_BASE_URL}/api/save-survey`
  },
  SETTINGS: {
    GET: `${API_BASE_URL}/api/settings`,
    SAVE_DEPARTMENTS: `${API_BASE_URL}/api/settings/departments`,
    SAVE_QUESTIONS: `${API_BASE_URL}/api/settings/questions`
  },
  NOTIFICATIONS: {
    GET_ALL: `${API_BASE_URL}/api/notifications`,
    MARK_READ: (id) => `${API_BASE_URL}/api/notifications/${id}/read`,
    READ_ALL: `${API_BASE_URL}/api/notifications/read-all`,
    DELETE: (id) => `${API_BASE_URL}/api/notifications/${id}`,
    DELETE_ALL: `${API_BASE_URL}/api/notifications`
  },
  ADMIN: {
    LOGIN: `${API_BASE_URL}/api/admin/login`
  }
}

// ===============================
// EMOTION ANALYSIS
// ===============================

export const analyzeEmotion = async (imageBlob) => {

  const formData = new FormData()

  formData.append(
    "image",
    imageBlob,
    "photo.jpg"
  )

  const response = await fetch(

    "/analyze",

    {
      method: "POST",
      body: formData
    }

  )

  return await response.json()

}
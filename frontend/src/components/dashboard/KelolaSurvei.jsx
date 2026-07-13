import { useState, useEffect } from 'react'
import {
  Settings,
  Layers,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Building2,
  HelpCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { API } from '../../api'

export default function KelolaSurvei({ darkMode }) {
  const [departments, setDepartments] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('departments') // 'departments' or 'questions'
  const [statusMessage, setStatusMessage] = useState(null)

  // Edit / Add State for Department
  const [editingDept, setEditingDept] = useState(null)
  const [deptForm, setDeptForm] = useState({ id: '', name: '', code: '' })

  // Edit / Add State for Question
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [questionForm, setQuestionForm] = useState({ id: '', name: '', question: '' })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    setLoading(true)
    fetch(API.SETTINGS.GET)
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'success') {
          if (data.departments) setDepartments(data.departments)
          if (data.questions) setQuestions(data.questions)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Gagal memuat konfigurasi survei:', err)
        setLoading(false)
      })
  }

  const showStatus = (msg, isError = false) => {
    setStatusMessage({ text: msg, isError })
    setTimeout(() => setStatusMessage(null), 4000)
  }

  // ============================
  // DEPARTMENTS HANDLERS
  // ============================
  const handleOpenAddDept = () => {
    setEditingDept('new')
    setDeptForm({ id: '', name: '', code: '' })
  }

  const handleOpenEditDept = (dept, index) => {
    setEditingDept(index)
    setDeptForm({ id: dept.id || dept.code, name: dept.name, code: dept.code || dept.id })
  }

  const handleSaveDept = (e) => {
    e.preventDefault()
    if (!deptForm.name.trim() || !deptForm.code.trim()) {
      showStatus('Nama dan Kode Program Studi wajib diisi!', true)
      return
    }

    let updatedList = [...departments]
    if (editingDept === 'new') {
      updatedList.push({
        id: deptForm.code.trim().toUpperCase(),
        name: deptForm.name.trim(),
        code: deptForm.code.trim().toUpperCase()
      })
    } else {
      updatedList[editingDept] = {
        id: deptForm.code.trim().toUpperCase(),
        name: deptForm.name.trim(),
        code: deptForm.code.trim().toUpperCase()
      }
    }

    saveDepartmentsToServer(updatedList)
    setEditingDept(null)
  }

  const handleDeleteDept = (index) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus Program Studi ini dari pilihan survei?')) return
    const updatedList = departments.filter((_, idx) => idx !== index)
    saveDepartmentsToServer(updatedList)
  }

  const saveDepartmentsToServer = (list) => {
    setDepartments(list)
    fetch(API.SETTINGS.SAVE_DEPARTMENTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ departments: list })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          showStatus('Daftar Program Studi berhasil diperbarui!')
        } else {
          showStatus('Gagal menyimpan Program Studi ke server.', true)
        }
      })
      .catch(err => showStatus('Terjadi kesalahan koneksi.', true))
  }

  // ============================
  // QUESTIONS HANDLERS
  // ============================
  const handleOpenAddQuestion = () => {
    setEditingQuestion('new')
    setQuestionForm({ id: '', name: '', question: '' })
  }

  const handleOpenEditQuestion = (item, index) => {
    setEditingQuestion(index)
    setQuestionForm({ id: item.id, name: item.name, question: item.question })
  }

  const handleSaveQuestion = (e) => {
    e.preventDefault()
    if (!questionForm.name.trim() || !questionForm.question.trim()) {
      showStatus('Nama Layanan dan Redaksi Pertanyaan wajib diisi!', true)
      return
    }

    const generatedId = questionForm.id.trim() || questionForm.name.trim()
    let updatedList = [...questions]
    if (editingQuestion === 'new') {
      updatedList.push({
        id: generatedId,
        name: questionForm.name.trim(),
        question: questionForm.question.trim()
      })
    } else {
      updatedList[editingQuestion] = {
        id: generatedId,
        name: questionForm.name.trim(),
        question: questionForm.question.trim()
      }
    }

    saveQuestionsToServer(updatedList)
    setEditingQuestion(null)
  }

  const handleDeleteQuestion = (index) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pertanyaan survei ini?')) return
    const updatedList = questions.filter((_, idx) => idx !== index)
    saveQuestionsToServer(updatedList)
  }

  const saveQuestionsToServer = (list) => {
    setQuestions(list)
    fetch(API.SETTINGS.SAVE_QUESTIONS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions: list })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          showStatus('Daftar Pertanyaan Survei berhasil diperbarui!')
        } else {
          showStatus('Gagal menyimpan Pertanyaan Survei ke server.', true)
        }
      })
      .catch(err => showStatus('Terjadi kesalahan koneksi.', true))
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADER CARD */}
      <div className={`
        p-6 sm:p-8 rounded-3xl border shadow-xl transition-all
        ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}
      `}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">
                Manajemen Survei & Program Studi
              </h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Kendali penuh atas pilihan jurusan awal mahasiswa dan daftar pertanyaan evaluasi kampus
              </p>
            </div>
          </div>

          <button
            onClick={loadSettings}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all min-h-[40px]"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Muat Ulang</span>
          </button>
        </div>

        {/* STATUS NOTIFICATION */}
        {statusMessage && (
          <div className={`
            mt-6 p-4 rounded-2xl border flex items-center gap-3 font-semibold text-sm animate-fadeIn
            ${statusMessage.isError 
              ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400' 
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'}
          `}>
            {statusMessage.isError ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* TABS SELECTOR */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => { setActiveTab('departments'); setEditingDept(null); setEditingQuestion(null); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all min-h-[44px] ${
              activeTab === 'departments'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : darkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Program Studi ({departments.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('questions'); setEditingDept(null); setEditingQuestion(null); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all min-h-[44px] ${
              activeTab === 'questions'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : darkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Pertanyaan & Layanan ({questions.length})</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* TAB 1: DEPARTMENTS (PROGRAM STUDI) */}
      {/* ==================================================== */}
      {activeTab === 'departments' && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-500" />
                <span>Daftar Pilihan Program Studi</span>
              </h3>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Daftar ini akan tampil di menu dropdown pada halaman awal survei mahasiswa
              </p>
            </div>

            <button
              onClick={handleOpenAddDept}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md min-h-[40px]"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Program Studi</span>
            </button>
          </div>

          {/* EDIT/ADD DEPT FORM MODAL POPUP */}
          {editingDept !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
              <div className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl border shadow-2xl animate-scaleUp ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-lg flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
                    <Building2 className="w-6 h-6 shrink-0" />
                    <span>{editingDept === 'new' ? 'Tambah Program Studi Baru' : 'Edit Program Studi'}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setEditingDept(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveDept} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 text-slate-500 dark:text-slate-400">Kode Jurusan / Singkatan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: TI, TM, AKUN"
                      value={deptForm.code}
                      onChange={e => setDeptForm({ ...deptForm, code: e.target.value.toUpperCase() })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 text-slate-500 dark:text-slate-400">Nama Lengkap Program Studi</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Teknik Informatika"
                      value={deptForm.name}
                      onChange={e => setDeptForm({ ...deptForm, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'}`}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingDept(null)}
                      className={`px-5 py-2.5 rounded-xl border font-bold text-sm transition-all ${darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/25"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* DEPARTMENTS TABLE */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={darkMode ? 'bg-slate-800/60 text-slate-300' : 'bg-slate-100 text-slate-600'}>
                  <th className="px-5 py-4 font-bold text-xs uppercase">No</th>
                  <th className="px-5 py-4 font-bold text-xs uppercase">Kode</th>
                  <th className="px-5 py-4 font-bold text-xs uppercase">Nama Program Studi</th>
                  <th className="px-5 py-4 font-bold text-xs uppercase text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept, index) => (
                  <tr key={index} className={`border-t ${darkMode ? 'border-slate-800 hover:bg-slate-800/40' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <td className="px-5 py-4 text-sm font-bold">{index + 1}</td>
                    <td className="px-5 py-4 text-sm">
                      <span className="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
                        {dept.code || dept.id}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">{dept.name}</td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditDept(dept, index)}
                        className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-all inline-flex items-center justify-center"
                        title="Edit Jurusan"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDept(index)}
                        className="p-2 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 transition-all inline-flex items-center justify-center"
                        title="Hapus Jurusan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {departments.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-5 py-8 text-center text-sm text-slate-500">
                      Belum ada Program Studi terdaftar. Klik tombol tambah di atas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: QUESTIONS (PERTANYAAN & KATEGORI SURVEI) */}
      {/* ==================================================== */}
      {activeTab === 'questions' && (
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <span>Daftar Pertanyaan & Kategori Layanan</span>
              </h3>
              <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Urutan dan redaksi pertanyaan yang dijawab oleh mahasiswa selama sesi survei
              </p>
            </div>

            <button
              onClick={handleOpenAddQuestion}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-md min-h-[40px]"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pertanyaan</span>
            </button>
          </div>

          {/* EDIT/ADD QUESTION FORM MODAL POPUP */}
          {editingQuestion !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
              <div className={`w-full max-w-xl p-6 sm:p-8 rounded-3xl border shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-scaleUp ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                  <h4 className="font-bold text-lg flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
                    <HelpCircle className="w-6 h-6 shrink-0" />
                    <span>{editingQuestion === 'new' ? 'Tambah Pertanyaan Layanan Baru' : 'Edit Pertanyaan Layanan'}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setEditingQuestion(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveQuestion} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-2 text-slate-500 dark:text-slate-400">Nama Kategori / Layanan</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kualitas Pengajaran"
                        value={questionForm.name}
                        onChange={e => setQuestionForm({ ...questionForm, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-2 text-slate-500 dark:text-slate-400">ID Kategori (Sistem)</label>
                      <input
                        type="text"
                        placeholder="Contoh: Layanan IT (otomatis sama dengan Nama Kategori jika kosong)"
                        value={questionForm.id}
                        onChange={e => setQuestionForm({ ...questionForm, id: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 text-slate-500 dark:text-slate-400">Redaksi Lengkap Pertanyaan</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Contoh: Bagaimana kepuasan Anda terhadap kompetensi dan kedisiplinan dosen?"
                      value={questionForm.question}
                      onChange={e => setQuestionForm({ ...questionForm, question: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'}`}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingQuestion(null)}
                      className={`px-5 py-2.5 rounded-xl border font-bold text-sm transition-all ${darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/25"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* QUESTIONS LIST / TABLE */}
          <div className="space-y-4">
            {questions.map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                  darkMode ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-extrabold text-base">{item.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs">
                        ID: {item.id}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {item.question}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleOpenEditQuestion(item, index)}
                    className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-all inline-flex items-center justify-center"
                    title="Edit Pertanyaan"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 transition-all inline-flex items-center justify-center"
                    title="Hapus Pertanyaan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {questions.length === 0 && (
              <div className="p-8 text-center text-sm text-slate-500 border rounded-2xl">
                Belum ada pertanyaan survei terdaftar. Klik tombol tambah di atas.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

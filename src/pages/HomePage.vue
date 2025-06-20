<template>
  <div class="app-container">
    <!-- Header -->
    <div class="app-header">
      <h1 class="app-title">メール設定マスター</h1>
      <p class="app-subtitle">メール送信の詳細設定を行います</p>
    </div>

    <!-- Status Bar -->
    <div class="status-bar">
      <div>
        <span>メール設定No:</span>
        <span class="font-medium">PSU0001</span>
      </div>
      <div>
        <span>作成日時:</span>
        <span class="font-medium">{{ currentDate }}</span>
      </div>
      <div>
        <span>最終更新:</span>
        <span class="font-medium">{{ currentTime }}</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-grid">
      <!-- Basic Information -->
      <div class="section-card basic-info-card">
        <div class="section-title">基本情報</div>
        
        <div class="form-group">
          <label class="form-label">メール名</label>
          <input type="text" class="form-input" v-model="formData.mailName">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">送信者名</label>
            <input type="text" class="form-input" v-model="formData.senderName" placeholder="件名事務担当">
          </div>
          <div class="form-group">
            <label class="form-label">送信者</label>
            <input type="text" class="form-input" v-model="formData.sender" placeholder="送信者">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">送信者名</label>
            <input type="text" class="form-input" v-model="formData.senderName2" placeholder="件名">
          </div>
          <div class="form-group">
            <label class="form-label">件名</label>
            <input type="text" class="form-input" v-model="formData.subject" placeholder="重要な案内があります">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">差出人</label>
            <input type="text" class="form-input" v-model="formData.from" placeholder="差出人">
          </div>
          <div class="form-group">
            <label class="form-label">返信先</label>
            <input type="text" class="form-input" v-model="formData.replyTo" placeholder="不要 送信専用の為">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">本文</label>
          <textarea class="form-input form-textarea" v-model="formData.body"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">本文詳細</label>
          <textarea class="form-input form-textarea-large" v-model="formData.bodyDetail"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">署名</label>
          <textarea class="form-input form-textarea-large" v-model="formData.signature"></textarea>
        </div>
      </div>

      <!-- Send Settings -->
      <div class="section-card send-settings-card">
        <div class="section-title">送信設定</div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">送信方法</label>
            <input type="text" class="form-input" v-model="formData.sendMethod">
          </div>
          <div class="form-group">
            <label class="form-label">送信先・宛先</label>
            <input type="text" class="form-input" v-model="formData.sendTo">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Toユーザーグループ</label>
            <input type="text" class="form-input" v-model="formData.toUserGroup">
          </div>
          <div class="form-group">
            <label class="form-label">Ccユーザーグループ</label>
            <input type="text" class="form-input" v-model="formData.ccUserGroup">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Bccユーザーグループ</label>
            <input type="text" class="form-input" v-model="formData.bccUserGroup">
          </div>
          <div class="form-group">
            <label class="form-label">送信条件・(メール送信日を指定)</label>
            <input type="text" class="form-input" v-model="formData.sendCondition">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">To Key Destination(User)</label>
            <input type="text" class="form-input" v-model="formData.toKeyDest">
          </div>
          <div class="form-group">
            <label class="form-label">Cc Key Destination(User)</label>
            <input type="text" class="form-input" v-model="formData.ccKeyDest">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">ファイルパス・保存先</label>
          <input type="text" class="form-input" v-model="formData.filePath">
        </div>

        <div class="form-group">
          <label class="form-label">SMTP設定・メール送信設定</label>
          <textarea class="form-input form-textarea-large" v-model="formData.smtpSettings"></textarea>
        </div>
      </div>
    </div>

    <!-- Recipients Section -->
    <div class="recipients-section">
      <div class="recipients-title">送信先リスト</div>
      
      <div class="recipients-grid">
        <button 
          class="recipient-button" 
          v-for="recipient in activeRecipients" 
          :key="recipient.id"
          :class="{ 'bg-green-300': selectedRecipients.has(recipient.id) }"
          @click="handleRecipientClick(recipient.id)"
        >
          {{ recipient.name }}<br>
          {{ recipient.role }}
        </button>
      </div>
    </div>

    <!-- Search Section -->
    <div class="search-section">
      <div class="search-title">
        宛先の絞り込み検索 
        <span v-if="selectedCount > 0" class="text-green-600 font-semibold">
          ({{ selectedCount }}件選択中)
        </span>
      </div>
      <div class="flex gap-2">
        <input 
          type="text" 
          class="search-input flex-1" 
          v-model="searchQuery" 
          placeholder="名前等"
        >
        <button 
          v-if="searchQuery" 
          @click="clearSearch"
          class="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-xs"
        >
          クリア
        </button>
      </div>
    </div>

    <!-- Footer Buttons -->
    <div class="footer-buttons">
      <button class="btn-base btn-outline" @click="handleNew" :disabled="isLoading">新規</button>
      <button class="btn-base btn-outline" @click="handleEdit" :disabled="isLoading">編集</button>
      <button class="btn-base btn-outline" @click="handleCopy" :disabled="isLoading">コピー</button>
      <button 
        class="btn-base btn-primary" 
        @click="handleSave" 
        :disabled="isLoading || !isFormValid"
        :class="{ 'opacity-50 cursor-not-allowed': isLoading || !isFormValid }"
      >
        {{ isLoading ? '保存中...' : '登録' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// Date/time management
const currentDate = ref('9/20/2024')
const currentTime = ref('12:00:00AM')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  })
}

onMounted(() => {
  setInterval(updateTime, 1000)
  updateTime()
})

// Form data management
const formData = reactive({
  mailName: '',
  senderName: '',
  sender: '',
  senderName2: '',
  subject: '',
  from: '',
  replyTo: '',
  body: '',
  bodyDetail: '',
  signature: '',
  sendMethod: '',
  sendTo: '',
  toUserGroup: '',
  ccUserGroup: '',
  bccUserGroup: '',
  sendCondition: '',
  toKeyDest: '',
  ccKeyDest: '',
  filePath: '',
  smtpSettings: ''
})

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
}

const isFormValid = computed(() => {
  return formData.mailName.trim() !== '' && 
         formData.subject.trim() !== '' &&
         formData.senderName.trim() !== ''
})

const getFormSummary = computed(() => {
  const filledFields = Object.entries(formData)
    .filter(([_, value]) => value.trim() !== '').length
  const totalFields = Object.keys(formData).length
  return {
    filledFields,
    totalFields,
    completionPercentage: Math.round((filledFields / totalFields) * 100)
  }
})

// Recipients management
const recipients = ref([
  { id: 1, name: '佐藤一郎', role: 'system@example.jp', department: 'IT', active: true },
  { id: 2, name: '田中花子', role: '役員', department: '経営', active: true },
  { id: 3, name: '山田太郎', role: '課長', department: '営業', active: true },
  { id: 4, name: '鈴木次郎', role: '部長', department: '人事', active: true },
  { id: 5, name: '高橋三郎', role: '主任', department: '総務', active: true },
  { id: 6, name: '松本四郎', role: '係長', department: '経理', active: false },
  { id: 7, name: '木村五郎', role: '課員', department: '開発', active: true },
  { id: 8, name: '林六郎', role: '部員', department: '企画', active: true },
  { id: 9, name: '中村七郎', role: '担当', department: '品質', active: true },
  { id: 10, name: '小林八郎', role: '職員', department: '製造', active: true }
])

const selectedRecipients = ref(new Set())

const toggleRecipient = (recipientId) => {
  if (selectedRecipients.value.has(recipientId)) {
    selectedRecipients.value.delete(recipientId)
  } else {
    selectedRecipients.value.add(recipientId)
  }
}

const selectedCount = computed(() => {
  return selectedRecipients.value.size
})

const activeRecipients = computed(() => {
  return recipients.value.filter(recipient => recipient.active)
})

// Search functionality
const searchQuery = ref('')

const filteredResults = computed(() => {
  return searchQuery.value.trim().length > 0
})

const clearSearch = () => {
  searchQuery.value = ''
}

watch(searchQuery, (newQuery) => {
  console.log('Search query changed:', newQuery)
})

// Form actions
const isLoading = ref(false)
const lastSavedAt = ref(null)

const saveForm = async (formData) => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    lastSavedAt.value = new Date()
    console.log('Form saved:', formData)
  } catch (error) {
    console.error('Error saving form:', error)
  } finally {
    isLoading.value = false
  }
}

const createNew = (resetFormFn) => {
  if (confirm('現在の入力内容をクリアして新規作成しますか？')) {
    resetFormFn()
  }
}

const editForm = () => {
  console.log('Edit mode activated')
}

const copyForm = (formData) => {
  console.log('Form copied:', formData)
}

// Event handlers
const handleSave = () => {
  if (isFormValid.value) {
    saveForm(formData)
  } else {
    alert('必須項目を入力してください。')
  }
}

const handleNew = () => {
  createNew(resetForm)
}

const handleEdit = () => {
  editForm()
}

const handleCopy = () => {
  copyForm(formData)
}

const handleRecipientClick = (recipientId) => {
  toggleRecipient(recipientId)
}

// Watch for form changes
watch(() => getFormSummary.value, (newSummary) => {
  console.log('Form completion:', newSummary.completionPercentage + '%')
}, { deep: true })
</script>

<style scoped lang="postcss">
.app-container {
  @apply max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden;
}

.app-header {
  @apply bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-5 text-center;
}

.app-title {
  @apply text-xl font-semibold mb-1;
}

.app-subtitle {
  @apply text-xs opacity-90;
}

.status-bar {
  @apply bg-green-50 px-5 py-3 flex justify-between items-center text-xs text-green-800 border-b border-green-100;
}

.main-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-5 p-5;
}

.section-card {
  @apply rounded-lg p-4 border;
}

.basic-info-card {
  @apply bg-orange-50 border-orange-200;
}

.send-settings-card {
  @apply bg-blue-50 border-blue-200;
}

.section-title {
  @apply text-sm font-bold mb-4 text-gray-700;
}

.form-group {
  @apply mb-3;
}

.form-row {
  @apply grid grid-cols-2 gap-2 mb-3;
}

.form-label {
  @apply block text-xs text-gray-600 mb-1;
}

.form-input {
  @apply w-full px-2.5 py-2 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500;
}

.form-textarea {
  @apply resize-y min-h-[60px];
}

.form-textarea-large {
  @apply min-h-[80px];
}

.recipients-section {
  @apply bg-green-50 border border-green-200 rounded-lg p-4 mx-5 mb-5;
}

.recipients-title {
  @apply text-sm font-bold mb-4 text-green-800;
}

.recipients-grid {
  @apply grid grid-cols-5 gap-2 mb-3;
}

.recipient-button {
  @apply bg-green-200 hover:bg-green-300 border-0 rounded px-2 py-2 text-xs text-green-800 cursor-pointer text-center transition-colors duration-200;
}

.search-section {
  @apply bg-purple-50 border border-purple-200 rounded-lg p-4 mx-5 mb-5;
}

.search-title {
  @apply text-xs text-gray-600 mb-2;
}

.search-input {
  @apply w-full px-2.5 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500;
}

.footer-buttons {
  @apply flex justify-center gap-2.5 p-5 bg-gray-50;
}

.btn-base {
  @apply px-5 py-2.5 border rounded text-xs cursor-pointer transition-all duration-200;
}

.btn-outline {
  @apply bg-white text-gray-600 border-gray-300 hover:bg-gray-50;
}

.btn-primary {
  @apply bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600;
}
</style>
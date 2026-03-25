const UPLOADCARE_PUB_KEY = 'fd0409779c28f6f219e9'

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('UPLOADCARE_PUB_KEY', UPLOADCARE_PUB_KEY)
  formData.append('UPLOADCARE_STORE', '1')
  formData.append('file', file)

  const res = await fetch('https://upload.uploadcare.com/base/', {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) throw new Error('Upload failed')

  const data = await res.json()
  return `https://ucarecdn.com/${data.file}/`
}

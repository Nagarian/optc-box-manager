export function exportAsJson (data: string, filename: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const file = new Blob([data], { type: 'application/json' })

    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      resolve()
    }, 0)
  })
}

export function importAsJson (file: File): Promise<string> {
  if (!file || file.type !== 'application/json') {
    return Promise.reject(new Error('not a json file'))
  }

  if (file.text) {
    return file.text()
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      if (typeof e.target?.result === 'string') {
        resolve(e.target.result)
      }

      reject(new Error('bad format file'))
    }

    reader.onerror = () => {
      reject(new Error('an error occured while reading file'))
    }

    reader.readAsText(file)
  })
}

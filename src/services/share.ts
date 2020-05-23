export function exportAsJson (object: any, filename: string) : Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const data = JSON.stringify(object)
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

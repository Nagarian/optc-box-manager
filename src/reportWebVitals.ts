import { ReportCallback } from 'web-vitals'

export async function reportWebVitals (onPerfEntry?: ReportCallback) {
  if (!onPerfEntry || !(onPerfEntry instanceof Function)) {
    return
  }

  const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals')

  onCLS(onPerfEntry)
  onFID(onPerfEntry)
  onFCP(onPerfEntry)
  onLCP(onPerfEntry)
  onTTFB(onPerfEntry)
}

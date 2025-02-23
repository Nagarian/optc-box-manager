import { addDays, relativeTimeFromDates } from './date-time'

const notificationTitle = 'OPTC-BM Account recovery reminder'

export async function setupNotification(generatedAt: Date) {
  const permission = await Notification.requestPermission()
  if (permission == 'granted') {
    new Notification(notificationTitle, {
      body: `You'll receive a notification on ${addDays(generatedAt, 90 - 7).toLocaleDateString()} to regenerate your account recovery information`,
    })
  }
}

export function checkReminderNotification(generatedAt: Date) {
  if (Notification?.permission !== 'granted') {
    return
  }

  if (addDays(generatedAt, 90 - 7) < new Date()) {
    try {
      new Notification(notificationTitle, {
        body: `Your generated password will expire in ${relativeTimeFromDates(addDays(generatedAt, 90))} - you should update it`,
      })
    } catch (error) {
      console.error('Failed to create notification', error)
    }
  }
}

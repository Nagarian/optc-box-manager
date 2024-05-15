import Button from 'components/Button'
import ExpansionPanel from 'components/ExpansionPanel'
import { ArrowIcon } from 'components/Icon'
import { Text } from 'components/Title'
import { useEffect, useState } from 'react'

const imagesCacheKey = 'characters_images'
const dbCacheKey = 'db_data'

export function ClearCache() {
  const [storageEstimation, setStorageEstimation] = useState<StorageEstimate>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const computeStorageEstimation = async () => {
    if (!('storage' in navigator)) {
      return
    }

    const estimation = await navigator.storage.estimate()
    if (estimation?.quota) {
      setStorageEstimation(estimation)
    }
  }

  useEffect(() => {
    computeStorageEstimation().catch((e: unknown) => console.error(e))
  }, [])

  return (
    <ExpansionPanel title="Cache" icon={ArrowIcon}>
      <Text my="2">
        To improve the performance of the application, we store the character
        images on your devices. However, if you need to retrieve some space on
        your device, you can use this button to swipe it.
      </Text>

      {storageEstimation && (
        <Text my="2">{computeSentences(storageEstimation)}</Text>
      )}

      <Button
        mx="auto"
        my="2"
        fontSize="2"
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true)
          try {
            await window.caches.delete(imagesCacheKey)
            await window.caches.delete(dbCacheKey)
          } catch (error) {
            console.error(error)
          }
          setIsLoading(false)

          await computeStorageEstimation()
        }}
      >
        Clear cache
      </Button>
    </ExpansionPanel>
  )
}

function computeSentences(storageEstimation: StorageEstimate) {
  const usage = bytesToSize(storageEstimation.usage)
  const quota = bytesToSize(storageEstimation.quota)
  const percent = (
    (storageEstimation.usage ?? 0 / (storageEstimation.quota ?? 1)) * 100
  ).toFixed(2)
  return `Storage used / Total Storage: ${usage} / ${quota} (${percent} %)`
}

function bytesToSize(bytes?: number): string {
  if (!bytes) return 'n/a'

  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i: number = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
  )
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

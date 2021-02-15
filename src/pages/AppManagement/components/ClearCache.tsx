import Button from 'components/Button'
import ExpansionPanel from 'components/ExpansionPanel'
import { ArrowIcon } from 'components/Icon'
import { Text } from 'components/Title'
import { useEffect, useState } from 'react'

const imagesCacheKey = 'characters_images'
const dbCacheKey = 'db_data'

export function ClearCache () {
  // eslint-disable-next-line no-undef
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
    computeStorageEstimation()
  }, [])

  return (
    <ExpansionPanel title="Cache" icon={ArrowIcon}>
      <Text my="2">
        To improve the performance of the application, we store the character
        images on your devices. However, if you need to retrieve some space on
        your device, you can use this button to swipe it.
      </Text>

      {storageEstimation && (
        <Text my="2">
          Storage used / Total Storage: {bytesToSize(storageEstimation.usage)} /{' '}
          {bytesToSize(storageEstimation.quota)} (
          {(storageEstimation.usage! / storageEstimation.quota! * 100).toFixed(2)}{' '}
          %)
        </Text>
      )}

      <Button
        mx="auto"
        my="2"
        fontSize="2"
        isLoading={isLoading}
        onClick={() => {
          const clear = async () => {
            setIsLoading(true)
            try {
              await window.caches.delete(imagesCacheKey)
              await window.caches.delete(dbCacheKey)
            } catch (error) {}
            setIsLoading(false)

            await computeStorageEstimation()
          }

          clear()
        }}
      >
        Clear cache
      </Button>
    </ExpansionPanel>
  )
}

export function bytesToSize (bytes?: number): string {
  if (!bytes) return 'n/a'

  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i: number = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
  )
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

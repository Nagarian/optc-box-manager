import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { TextInput } from 'components/forms/TextInput'
import { ArrowIcon } from 'components/Icon'
import { Text } from 'components/Title'
import { AccountRecovery, useUserSettings } from 'hooks/useUserSettings'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { addDays } from 'services/date-time'
import { setupNotification } from 'services/notification'
import { ReactMarkdownRenderers } from 'styles/react-markdown'

export function AccountRecoveryPanel() {
  const { userSetting, setUserSetting } = useUserSettings()
  const [accountRecovery, setAccountRecovery] = useState<AccountRecovery>(
    userSetting.accountRecovery ?? {
      userId: '',
      password: '',
      generatedAt: new Date(),
    },
  )
  const { userId, password, generatedAt } = accountRecovery

  return (
    <ExpansionPanel title="Account recovery" icon={ArrowIcon}>
      <ReactMarkdown components={ReactMarkdownRenderers}>
        {Instruction}
      </ReactMarkdown>
      <Box
        as="form"
        my="2"
        p="3"
        display="flex"
        flexDirection="column"
        gap="2"
        onSubmit={async e => {
          e.preventDefault()
          setUserSetting(v => ({ ...v, accountRecovery }))
          await setupNotification(generatedAt)
        }}
      >
        <Text as="label" display="flex" flexDirection="column">
          User ID
          <TextInput
            type="text"
            name="userId"
            value={userId}
            onChange={e =>
              setAccountRecovery({
                ...accountRecovery,
                userId: e.currentTarget.value,
              })
            }
            onFocus={e => e.target.select()}
            placeholder="111222333"
            maxLength={9}
            minLength={9}
          />
        </Text>
        <Text as="label" display="flex" flexDirection="column">
          Password
          <TextInput
            type="text"
            name="password"
            value={password}
            onChange={e =>
              setAccountRecovery({
                ...accountRecovery,
                password: e.currentTarget.value,
              })
            }
            onFocus={e => e.target.select()}
            placeholder="ps4wy37i"
          />
        </Text>
        <Text as="label" display="flex" flexDirection="column">
          Generated on
          <TextInput
            type="date"
            name="generatedAt"
            value={generatedAt.toISOString().substring(0, 10)}
            onChange={e =>
              setAccountRecovery({
                ...accountRecovery,
                generatedAt: e.currentTarget.valueAsDate ?? new Date(),
              })
            }
            onFocus={e => e.target.select()}
          />
          <Text as="span" fontStyle="italic" px="2" py="1">
            {`So this one will expire on ${addDays(generatedAt, 90).toLocaleDateString()} and you'll receive a notification starting on ${addDays(generatedAt, 90 - 7).toLocaleDateString()}`}
          </Text>
        </Text>
        <Box alignSelf="center" display="flex" gap="2">
          <Button type="submit" fontSize="2">
            Save
          </Button>

          <Button
            type="button"
            fontSize="2"
            variant="danger"
            onClick={() => {
              setUserSetting(v => ({ ...v, accountRecovery: undefined }))
              setAccountRecovery({
                userId: '',
                password: '',
                generatedAt: new Date(),
              })
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </ExpansionPanel>
  )
}

const Instruction = `
Account recovery is important in case you loose your phone, to prevent
this situation it's recommended to link our account to a SNS or use an
ID/Password method.

However this one automatically expire after 90 days,
so we need to be cautious about it, and that's the reason of this
feature.

Specify your ID and passowrd below and you'll receive a
notification 7 days before the expiration of it.

> NB: all the data are only kept only on your current device, so don't
> forget to make a backup outside of it once you've saved a new password!
`

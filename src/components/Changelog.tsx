import { LoaderIcon } from 'components/Icon'
import { Text, Title } from 'components/Title'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownRenderers } from 'styles/react-markdown'

type GithubLightRelease = {
  id: number
  published_at: Date
  name: string
  body: string
}

const localStorageKey = 'last_changelog'

export function Changelog({ onlyUnseen = false }: { onlyUnseen?: boolean }) {
  const [releases, setReleases] = useState<GithubLightRelease[]>([])
  const [latestSeen, setLatestSeen] = useState<number>()

  useEffect(() => {
    const json = localStorage.getItem(localStorageKey)
    if (json) {
      setLatestSeen(JSON.parse(json) as number)
    }
  }, [])

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(
        'https://api.github.com/repos/nagarian/optc-box-manager/releases',
      )
      const json = (await response.json()) as GithubLightRelease[]

      setReleases(
        json.map(({ id, name, published_at, body }) => ({
          id,
          name,
          body,
          published_at: new Date(published_at),
        })),
      )

      localStorage.setItem(localStorageKey, JSON.stringify(json[0].id))
    }

    fetcher().catch((e: unknown) => console.error(e))
  }, [])

  if (releases.length === 0) {
    return <LoaderIcon size={5} placeSelf="center" m="3" />
  }

  const displayed = onlyUnseen
    ? releases.slice(
        0,
        latestSeen && releases.findIndex(r => r.id === latestSeen),
      )
    : releases

  if (displayed.length === 0) {
    return (
      <Text m="1">
        OPTC-DB must have been updated (new unit and/or unit fix) and this
        update will apply it !
      </Text>
    )
  }

  return (
    <>
      {onlyUnseen &&
        displayed.some(release => /BREAKING CHANGE/i.test(release.body)) && (
          <Text m="1">
            There is Breaking changes, you should take caution and make an
            export (from Settings) before loading this update 😉
          </Text>
        )}

      {displayed.map(release => (
        <div key={release.id}>
          <Title>
            {release.name} - {release.published_at.toLocaleDateString()}
          </Title>
          <ReactMarkdown key={release.id} components={ReactMarkdownRenderers}>
            {release.body}
          </ReactMarkdown>
        </div>
      ))}
    </>
  )
}

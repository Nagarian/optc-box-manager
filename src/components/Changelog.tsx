import { themeGet } from '@styled-system/theme-get'
import { LoaderIcon } from 'components/Icon'
import { SubTitle, Title } from 'components/Title'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

type GithubLightRelease = {
  id: number
  publishedAt: Date
  name: string
  body: string
}

const localStorageKey = 'last_changelog'

export default function Changelog ({
  onlyUnseen = false,
}: {
  onlyUnseen?: boolean
}) {
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
      const json: any[] = await response.json()

      setReleases(
        json.map<GithubLightRelease>(
          // eslint-disable-next-line camelcase
          ({ id, name, published_at, body }) => ({
            id,
            name,
            body,
            publishedAt: new Date(published_at),
          }),
        ),
      )

      localStorage.setItem(localStorageKey, JSON.stringify(json[0].id))
    }

    fetcher()
  }, [])

  const displayed = onlyUnseen
    ? releases.slice(
      0,
      latestSeen && releases.findIndex(r => r.id === latestSeen),
    )
    : releases

  if (displayed.length === 0) {
    return releases.length === 0 ? (
      <LoaderIcon size={5} placeSelf="center" m="3" />
    ) : null
  }

  return (
    <>
      {displayed.map(release => (
        <div key={release.id}>
          <Title>
            {release.name} - {release.publishedAt.toLocaleDateString()}
          </Title>
          <ReactMarkdown
            key={release.id}
            source={release.body}
            linkTarget="_blank"
            renderers={{ heading: SubTitle, listItem: ListItem }}
          />
        </div>
      ))}
    </>
  )
}

const ListItem = styled.li`
  ::before {
    content: '🏴‍☠️ ';
    font-size: ${themeGet('fontSizes.2')};
  }
`

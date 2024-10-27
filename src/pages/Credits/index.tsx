import ReactMarkdown from 'react-markdown'
import { ReactMarkdownRenderers } from 'styles/react-markdown'

export function Credits() {
  return (
    <ReactMarkdown components={ReactMarkdownRenderers}>
      {creditText}
    </ReactMarkdown>
  )
}

const creditText = `
Made with 💗 and ☕ by [u/nagarian_r](https://www.reddit.com/user/nagarian_r)

Please report bugs and suggestions into [Github](https://github.com/Nagarian/optc-box-manager/issues)

All the information originates from [OPTC-DB](https://optc-db.github.io/)

This site does not own any of the images. All images are owned by Eiichiro Oda/Shueisha, Toei Animation, and Bandai Namco.

# IMPORTANT

Your box is saved **ONLY LOCALLY**

Clearing your browser cache will delete your box !

If you want to view your box in a different device, you should export
and import it manually
`

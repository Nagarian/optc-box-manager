import ReactMarkdown from 'react-markdown'
import { ReactMarkdownRenderers } from 'styles/react-markdown'

export default function Credits () {
  return (
    <ReactMarkdown children={creditText} components={ReactMarkdownRenderers} />
  )
}

const creditText = `
Made with 💗 and ☕ by [u/nagarian_r](https://www.reddit.com/user/nagarian_r)

Please report bugs and suggestions into [Github](https://github.com/Nagarian/optc-box-manager/issues)

You can also join [our Discord server](https://discord.gg/rKBRT8HxeE) if your prefers

All the information originates from [OPTC-DB](https://optc-db.github.io/)

This site does not own any of the images. All images are owned by Eiichiro Oda/Shueisha, Toei Animation, and Bandai Namco.

# IMPORTANT

Your box is saved **ONLY LOCALLY**

Clearing your browser cache will delete your box !

If you want to view your box in a different device, you should export
and import it manually
`

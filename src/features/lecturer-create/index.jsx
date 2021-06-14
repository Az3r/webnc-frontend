import React from 'react'
import Markdown from '@/components/markdown'

const markdown = `
# H1

## H2

### h3

normal text

> quote

*like so*
***stonk***

1. **this** is really ***strong***
1. is
* **this** is really ***strong***
* is
> #### The quarterly results look great!
> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

> Dorothy followed her through many of the beautiful rooms in her castle.
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
>>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

* [ ] todo
* [x] **done**

A table:

<img src='https://picsum.photos/200'></img>
Some *emphasis* and <strong>strong</strong>!
***


| Syntax      | Description |
| :--- | :---: |
| *Header*      | Title       |
| Paragraph   | Text        |

At the command prompt, type 

\`const nano = hello\`
`

export default function CreateCourse() {
  return <Markdown>{markdown}</Markdown>
}

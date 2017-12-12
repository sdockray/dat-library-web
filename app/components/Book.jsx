import { h } from 'hyperapp'
import { setInnerHtml } from 'lib/helpers'

export default defaults => params => {
  return (
    <article>
      <header>
        header
      </header>
      <h2>
        <a href={`#${params.name}`}>
          {params.title}
        </a>
      </h2>
      <div
        class='body'
        oncreate={setInnerHtml(params.title)}
        onupdate={setInnerHtml(params.title)}
      />
    </article>
  )
}

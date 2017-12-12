import { h } from 'hyperapp'

import Book from 'components/Book'

export default ({ info, page }) => {
  const shownBooks = page
    ? info.items.filter(({ name }) => name === page)
    : info.items

  return (
    <section class='books'>
      <div class='container'>
        { shownBooks.map(Book({ ...info })) }
      </div>
    </section>
  )
}

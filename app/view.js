import { h } from 'hyperapp'

import BookList from 'components/BookList'
import Footer from 'components/Footer'
import Header from 'components/Header'

export default state => actions =>
  <main>
    <Header {...state} />
    <BookList {...state} />
    <Footer />
  </main>

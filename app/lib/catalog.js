import moment from 'moment'
import { parse } from 'lib/parser'
import { appendStyle, byDate, isMarkdown, logAndReturn } from 'lib/helpers'

class Catalog {
  constructor () {
    if (!Catalog._) Catalog._ = this
    return Catalog._
  }

  async init (url) {
    this.dat = await new window.DatArchive(url)
  }

  async preloadArticles () {
    const parseFile = async file => {
      const body = await this.dat.readFile(`/articles/${file.name}`)
      const parsed = parse(body)
      if (!parsed.date) parsed.date = moment(file.stat.ctime)
      return { ...file, ...parsed }
    }
    const parseFiles = files =>
      Promise.all(files.filter(isMarkdown).map(parseFile))
    const sortArticles = articles => articles.sort(byDate)

    return this.dat.readdir('/articles', { recursive: true, stat: true })
      .then(parseFiles, logAndReturn([]))
      .then(sortArticles)
  }

  loadBooks() {
    if (this.catalog) {
      return this.catalog.items
    } else {
      return []
    }
  }

  async loadInfo () {
    this.info = await this.dat.getInfo()
    this.catalog = await this.dat.readFile('/dat-library.json')
      .then(
        config => JSON.parse(config),
        () => { console.error('/dat-library.json not found') }
      )
    return { ...this.info, ...this.catalog }
  }

  async loadStyle () {
    return this.dat.readFile('/style.css')
      .then(appendStyle)
      .catch(() => { console.error('/style.css not found') })
  }

}

const instance = new Catalog()

export default instance

import catalog from 'lib/catalog'

const init = (url = window.location.origin) => state => async actions => {
  actions.update({ isLoading: true })
  if (state.isBeaker) {
    await catalog.init(url)
    await catalog.loadStyle()
    const { title, ...info } = await catalog.loadInfo()
    actions.update({ info, title })
  }
  actions.update({ isLoading: false })

  actions.navigateByHash()
  window.onhashchange = () => actions.navigateByHash()
}

const navigateByHash = page => {
  page = window.location.hash.slice(1)
  window.scrollTo(0, 0)
  return { page }
}

export default {
  init,
  navigateByHash,
  update: newState => newState,
}

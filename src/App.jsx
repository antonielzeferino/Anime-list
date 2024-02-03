import { useState } from "react"

function App() {
  const [animes, setAnime] = useState(() => {
    const storedAnimes = localStorage.getItem("animes-lib")
    if (!storedAnimes) return []
    return JSON.parse(storedAnimes)
  })

  const [title, setTitle] = useState("")
  const [cover, setCover] = useState("")

  const addAnime = ({ title, cover }) => {
    const id = Math.floor(Math.random() * 10000000)
    const anime = { id, title, cover }
    setAnime(state => {
      const newState = [...state, anime]
      localStorage.setItem("animes-lib", JSON.stringify(newState))
      return newState
    })
  }

  const removeAnimes = (id) => {
    setAnime(state => {
      const newState = state.filter(anime => anime.id !== id)
      localStorage.setItem("animes-lib", JSON.stringify(newState))
      return newState
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    addAnime({ title, cover })
    setTitle("")
    setCover("")
  }

  return (
    <div className="app">
      <h1>Lista de animes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
        </div>
        <div>
          <label htmlFor="cover">Capa:</label>
          <input type="text" id="cover" value={cover} onChange={(ev) => setCover(ev.target.value)} />
        </div>
        <button>Adicionar</button>
      </form>
      <div className="Animes">
        {animes.map((anime) => (
          <div key={anime.id}>
            <img src={anime.cover} alt="Capa do jogo" />
            <div>
              <h2>{anime.title}</h2>
              <button onClick={() => removeAnimes(anime.id)}>
                Remover
              </button>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default App
import { useEffect, useMemo, useState } from 'react'
//{} -> não é o default
import './App.css'

const onSubmit= (cb) => {
  return (e) => {
    e.preventDefault()
    cb()
  }
}

const Header = ({add}) => {
  const [nome, setNome] = useState ("")

  const handleSubmit = () => {
    if (nome === "") return; 
      add(nome)
      setNome("")

      if (nome !== "") {
      add(nome)
      setNome("")
    }
 
  }

  return (
    <header>
   <form onSubmit={onSubmit (handleSubmit)}>
    <input name='nome' 
    type="text" 
    value={nome} 
    onChange={({target})=>setNome(target.value)}/>
    <button>Adicionar</button>
   </form>
    </header>
  )
}

const Content = ({state}) => {
  return (
    <main>
      <ul>
        {state.map((o, idx) => (
          <li key={idx}>{o}</li>
        ))}
      </ul>
    </main>
  )
}

function App() {

  const localState = JSON.parse(localStorage.getItem('state'))
  const [state, setState] = useState( localState || []) 

  const add = (v) => setState([...state, v])

  const limpar = () => {
    localStorage.clear() 
    setState([])}

  const tamanho = useMemo (()=> {
  return state.length
  }, [state])
  //executa e retorna o valor sempre q modificar (calcula dependa de quando sofrer)
  // LOCALSTORAGE - nn muda com F5

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])
  // 2 vetor de dependencias - estados ou funções
  //componenete App vai usar a função useEffect 
  // App oela primeira vez - Main.jsx linha 8
  //sofre toda vez q altera n so uma vexz - a cada valor

  return (
    <>
    <Header add={add}/>
    <aside>{tamanho}</aside>
    <Content state={state}/>
    <footer>
      <button type="button" onClick={limpar}>Limpar</button>
    </footer>
    </>
  )

}

export default App

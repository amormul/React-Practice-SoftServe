// import { useState } from 'react'
import './App.css'
import Button from './components/Button.tsx'
import ColorCheckbox from './components/CheckBox.tsx'
import TextFields from './components/TextInput.tsx'
import TypeSearch from "./components/SearchBar.tsx"
function App() {

  return (
    <>
      <h1>Button-Test</h1>
      <Button></Button>
      <hr />
      <h1>SearchBar-test</h1>
      <TypeSearch></TypeSearch>
      <hr />
      <h1>CheckBox-Test</h1>
      <ColorCheckbox></ColorCheckbox>
      <hr />
      <h1>TextArea-Test</h1>
      <TextFields></TextFields>
      <hr />
    </>

  )
}

export default App

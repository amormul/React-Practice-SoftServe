import './App.css'
import AvatarUploader from './components/AvatarUploader'

function App() {
  const handleImageConfirm = (file: File) => {
        // do something with the confirmed file
        console.log('Confirmed image:', file);
  };

  return (
    <>
      <p className="read-the-docs">
          <AvatarUploader onConfirm={handleImageConfirm}/>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

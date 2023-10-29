import './App.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Carlist from "./components/Carlist"

function App() {
  return (
    <Container maxWidth="xl">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">Car shop</Typography>
        </Toolbar>  
      </AppBar>
      <Carlist />
    </Container>
  )
}

export default App


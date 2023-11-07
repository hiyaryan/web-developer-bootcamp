import './App.css'
import FormValidation from './FormValidation'
import ShoppingList from './ShoppingList'
import SignupForm from './SignupForm'
import SignupForm2 from './SignupForm2'
import UsernameForm from './UsernameForms'

function App() {
  return (
    <>
      <h1>Forms</h1>
      <input type="text" />
      <button>Submit</button>
      <h1>Controlled Forms</h1>
      <UsernameForm />
      <h1>Multiple Input</h1>
      <SignupForm />
      <h1>Better Signup Form</h1>
      <SignupForm2 />
      <h1>Shopping List</h1>
      <ShoppingList />
      <h1>Form with RHF Validations</h1>
      <FormValidation />
    </>
  )
}

export default App

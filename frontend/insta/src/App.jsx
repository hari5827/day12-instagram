import { RouterProvider } from "react-router"
import Approutes from "./Approutes"
import "./features/auth/styles/form.scss"
import { AuthProvider } from "./features/auth/auth.context"
function App() {
return(
<AuthProvider>
    <PostContextProvider>
 <Approutes/>
 </PostContextProvider>
 </AuthProvider>
)
}
export default App

import { MainLayout } from "./layouts/main";
import AppRouter from "./router";

export default function App() {
  return(
    <MainLayout>
      <AppRouter />
    </MainLayout>
  )
}
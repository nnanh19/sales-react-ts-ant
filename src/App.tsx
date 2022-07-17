import { Route, Routes } from "react-router-dom";
import { AdminLayout, Dashboard } from "./components/pages/admin";
import { AdminProducEdit, AdminProductAdd, AdminProductList } from "./components/pages/admin/products";
import Homepage from "./components/pages/site/homepage";
import SiteLayout from "./components/pages/site/layout";

function App() {
  return (
   <>
     <Routes>
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />}/>
            <Route path="products">
              <Route index element={<AdminProductList />}/>
              <Route path="add" element={<AdminProductAdd />}/>
              <Route path=":id/edit" element={<AdminProducEdit />}/>
            </Route>
        </Route>
      </Routes>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
            <Route index element={<Homepage />}/>
        </Route>
      </Routes>
   </>
  );
}

export default App;

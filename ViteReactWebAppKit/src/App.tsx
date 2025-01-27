import { NavBar } from "antd-mobile";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import PwaComponent from "./components/PwaComponent";
import { routes } from './config/configure';
import { serviceWorkers } from './pwa/serviceWorkerInNavigator.ts';
import usePushNotification from './pwa/usePushNotification';
import NotificationForm from "./pages/Demos/NotificationForm/index.tsx";


function App() {
  const navigate = useNavigate();
  // Notification
  usePushNotification();
  // router
  const RenderRouter = () => {
    // old router
    {/*
       <Route path="/" element={<Layouts />}>
          <Route index path="/" element={<Welcome />} />
          <Route path="/mobile" element={<MobileLayouts />}>
            <Route index path="/mobile/demo" element={<DemoUI />} />
            <Route path="/mobile/redux" element={<ReduxDemo />} />
          </Route>
          <Route path="/desktop" element={<DesktopLayouts />}>
            <Route index path="/desktop/demo" element={<DemoUI />} />
            <Route path="/desktop/redux" element={<ReduxDemo />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route> 
      */}
    // new router
    return (
      <>
        <Routes>
          {routes.map((route) => {
            return <Route key={route.path} path={route.path} element={<route.component />}>
              {route.children.map((children) => {
                return children.children ? (
                  <Route key={children.path} path={children.path} element={<children.component />}>
                    {children.children.map((child) => {
                      return <Route key={`${children.path}-${child.path}`} path={`${children.path}/${child.path}`} element={<child.component />} />;
                    })}
                  </Route>
                ) : <Route key={children.path} path={children.path} element={<children.component />} />;
              })}
            </Route>;
          })}
        </Routes>
      </>
    );
  };

  useEffect(() => {
    serviceWorkers();
  }, []);
  return (
    <>
      <NavBar back='Back' onBack={() => navigate(-1)}>
        Title
      </NavBar>
      <NotificationForm />
      <PwaComponent />
      <RenderRouter />
    </>
  )
}

export default App

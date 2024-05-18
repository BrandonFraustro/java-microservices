import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import CustomerList from './pages/customer/CustomerList';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import FormCustomer from './pages/customer/FormCustomer';
import EmployeeList from './pages/employee/EmployeeList';
import FormEmployee from './pages/employee/FormEmployee';
import ProviderList from './pages/provider/ProviderList';
import FormProvider from './pages/provider/FormProvider';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/folder/Customers" />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/folder/Customers" exact={true}>
              <CustomerList />
            </Route>
            <Route path="/folder/Customers/:id" exact={true}>
              <FormCustomer />
            </Route>
            <Route path="/folder/Employees" exact={true}>
              <EmployeeList />
            </Route>
            <Route path="/folder/Employees/:id" exact={true}>
              <FormEmployee />
            </Route>
            <Route path="/folder/Providers" exact={true}>
              <ProviderList />
            </Route>
            <Route path="/folder/Providers/:id" exact={true}>
              <FormProvider />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;

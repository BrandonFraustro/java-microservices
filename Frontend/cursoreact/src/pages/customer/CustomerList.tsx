import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { pencil, personAdd, personAddOutline, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Customer from './Customer';
import { removeCustomers, saveCustomers, searchCustomers } from './CustomerApi';
import './CustomerList.css'

const CustomerList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [customer, setCustomer] = useState<Customer[]>([]);
  const history = useHistory();

  useEffect(() => {
    search()
  }, [history.location.pathname]);

  const search = async () => {
    let request = await searchCustomers();
    setCustomer(request) 
  }

  const remove = async (id: number) => {
    await removeCustomers(id)
    search()
  }

  const addCustomer = () => {
    history.push('Customers/new')
  }

  const editCustomer = (id: number) => {
    history.push(`Customers/${id}`)
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Customer Managment</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonItem>
            <IonButton onClick={addCustomer} color='primary' slot='end' fill='solid' size='default'>
              <IonIcon icon={personAddOutline}/>
              Add Customer
            </IonButton>
          </IonItem>
          <IonGrid className='table_Header table_Text'>
            <IonRow>
              <IonCol className='table_Header__Items'>ID</IonCol>
              <IonCol className='table_Header__Items'>Name</IonCol>
              <IonCol className='table_Header__Items'>Email</IonCol>
              <IonCol className='table_Header__Items'>Phone</IonCol>
              <IonCol className='table_Header__Items'>Address</IonCol>
              <IonCol className='table_Header__Items'>Actions</IonCol>
            </IonRow>
          </IonGrid>

            <IonGrid className='table_Content'>
              {
                customer.map((customer: Customer) => (
                  <IonRow key={customer.customerID}>
                      <IonCol className='table_Content__Items'>{customer.customerID}</IonCol>
                      <IonCol className='table_Content__Items'>{customer.name} {customer.lastname}</IonCol>
                      <IonCol className='table_Content__Items'>{customer.email}</IonCol>
                      <IonCol className='table_Content__Items'>{customer.phone}</IonCol>
                      <IonCol className='table_Content__Items'>{customer.address}</IonCol>
                      <IonCol className='table_Content__Items'>
                          <IonButton onClick={() => editCustomer(Number(customer.customerID))} color='primary' fill='clear' size='small'>
                              <IonIcon icon={pencil}/>
                          </IonButton>
                          <IonButton color='danger' fill='clear' size='small' onClick={() => remove(Number(customer.customerID))}>
                              <IonIcon icon={trash}/>
                          </IonButton>
                      </IonCol>
                  </IonRow>
                ))
              }
            </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;

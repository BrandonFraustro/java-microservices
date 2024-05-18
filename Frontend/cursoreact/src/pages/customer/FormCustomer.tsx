import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark, pencil, personAdd, personAddOutline, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Customer from './Customer';
import { removeCustomers, saveCustomers, searchCustomerByID, searchCustomers, updateCustomers } from './CustomerApi';
import './CustomerList.css'

const CustomerEdit: React.FC = () => {

  const { name, id } = useParams<{ name: string; id: string; }>();
  const [customer, setCustomer] = useState<Customer>({});
  const history = useHistory()

  useEffect(() => {
    search()
  }, [history.location.pathname]);

  const search = async () => {
    if(id !== 'new') {
      let resultCustomer = await searchCustomerByID(parseInt(id))
      setCustomer(resultCustomer)
    } else {
      setCustomer({})
    }
  }

  const save = async () => {
    try {
      await saveCustomers(customer)
      history.push('/folder/Customers')
    }catch(e) {
      console.log("Error");
    }
  }
  const update = async () => {
    try {
      await updateCustomers(parseInt(id), customer)
      history.push('/folder/Customers')
    }catch(e) {
      console.log("Error");
    }
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{ id === 'new' ? 'Add customer' : 'Edit customer' }</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonRow>
            <IonCol>
              <IonInput label="Name" name='name' value={customer.name} 
                onIonChange={(event) => customer.name= String(event.detail.value) }
                labelPlacement="floating" fill="solid" 
                placeholder="Enter text"
               />
            </IonCol>
            <IonCol>
              <IonInput label="Lastname" value={customer.lastname}
                onIonChange={(event) => customer.lastname = String(event.detail.value)}
                labelPlacement="floating" fill="solid" placeholder="Enter text"
                />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="Email" value={customer.email}
                onIonChange={(event) => customer.email = String(event.detail.value)}
                type='email' labelPlacement="floating" fill="solid" placeholder="Enter text"
                />
            </IonCol>
            <IonCol>
              <IonInput label="phone" value={customer.phone} 
                onIonChange={(event) => customer.phone = String(event.detail.value)}
                type='number' labelPlacement="floating" fill="solid" placeholder="Enter number"
                />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='6'>
              <IonInput label="Address" value={customer.address}
                onIonChange={(event) => customer.address = String(event.detail.value)}
                labelPlacement="floating" fill="solid" placeholder="Enter text"></IonInput>
            </IonCol>
          </IonRow>



          {
            id === "new" ? (
              <IonItem>
                <IonButton onClick={save}  color='primary' slot='end' fill='solid' size='default'>
                  <IonIcon icon={checkmark}/>
                  Save
                </IonButton>
              </IonItem>) 
            : (
              <IonItem>
                <IonButton onClick={update}  color='primary' slot='end' fill='solid' size='default'>
                  <IonIcon icon={checkmark}/>
                  Save
                </IonButton>
              </IonItem>

            )
            }

        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;

import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { pencil, personAddOutline, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Provider from './Provider';
import { removeProviders, searchProviders } from './ProviderApi';
import './ProviderList.css'

const ProviderList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [provider, setProvider] = useState<Provider[]>([]);
  const history = useHistory();

  useEffect(() => {
    search()
  }, [history.location.pathname]);

  const search = async () => {
    let response = await searchProviders();
    setProvider(response) 
  }

  const remove = async (id: number) => {
    await removeProviders(id)
    search();
  }

  const addProvider = () => {
    history.push('Providers/new')
  }

  const editProvider = (id: number) => {
    history.push(`Providers/${id}`)
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Provider Managment</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonItem>
            <IonButton onClick={addProvider} color='primary' slot='end' fill='solid' size='default'>
              <IonIcon icon={personAddOutline}/>
              Add Provider
            </IonButton>
          </IonItem>
          <IonGrid className='table_Header table_Text'>
            <IonRow>
              <IonCol className='table_Header__Items'>ID</IonCol>
              <IonCol className='table_Header__Items'>Name</IonCol>
              <IonCol className='table_Header__Items'>Email</IonCol>
              <IonCol className='table_Header__Items'>Phone</IonCol>
              <IonCol className='table_Header__Items'>Web</IonCol>
              <IonCol className='table_Header__Items'>Actions</IonCol>
            </IonRow>
          </IonGrid>

            <IonGrid className='table_Content'>
              {
                provider.map((provider: Provider) => (
                  <IonRow key={provider.providerID}>
                      <IonCol className='table_Content__Items'>{provider.providerID}</IonCol>
                      <IonCol className='table_Content__Items'>{provider.name} {provider.lastname}</IonCol>
                      <IonCol className='table_Content__Items'>{provider.email}</IonCol>
                      <IonCol className='table_Content__Items'>{provider.phone}</IonCol>
                      <IonCol className='table_Content__Items'>{provider.web}</IonCol>
                      <IonCol className='table_Content__Items'>
                          <IonButton onClick={() => editProvider(Number(provider.providerID))} color='primary' fill='clear' size='small'>
                              <IonIcon icon={pencil}/>
                          </IonButton>
                          <IonButton color='danger' fill='clear' size='small' onClick={() => remove(Number(provider.providerID))}>
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

export default ProviderList;

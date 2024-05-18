import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Provider from './Provider';
import { saveProviders, searchProviderByID, updateProviders } from './ProviderApi';
import './ProviderList.css'

const FormProvider: React.FC = () => {

  const { name, id } = useParams<{ name: string; id: string; }>();
  const [provider, setProvider] = useState<Provider>({});
  const history = useHistory()

  useEffect(() => {
    search()
  }, []);

  const search = async () => {
    if(id !== 'new') {
      let resultProvider = await searchProviderByID(parseInt(id))
      setProvider(resultProvider)
    } else {
      setProvider({})
    }
  }

  const save = async () => {
    if(provider){
      await saveProviders(provider)
      history.push('/folder/Providers')
    }
    else {
     console.log("Error");
    }
  }

  const update = async() => {
    try {
      await updateProviders(parseInt(id), provider)
      history.push('/folder/Providers')
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
          <IonTitle>{ id === 'new' ? 'Add provider' : 'Edit provider' }</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonRow>
            <IonCol>
              <IonInput label="Name" name='name' value={provider.name} 
                onIonChange={(event) => provider.name= String(event.detail.value) }
                labelPlacement="floating" fill="solid" 
                placeholder="Enter text"
               />
            </IonCol>
            <IonCol>
              <IonInput label="Lastname" value={provider.lastname}
                onIonChange={(event) => provider.lastname = String(event.detail.value)}
                labelPlacement="floating" fill="solid" placeholder="Enter text"
                />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="Email" value={provider.email}
                onIonChange={(event) => provider.email = String(event.detail.value)}
                type='email' labelPlacement="floating" fill="solid" placeholder="Enter text"
                />
            </IonCol>
            <IonCol>
              <IonInput label="phone" value={provider.phone} 
                onIonChange={(event) => provider.phone = String(event.detail.value)}
                type='number' labelPlacement="floating" fill="solid" placeholder="Enter number"
                />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="Address" value={provider.address}
                onIonChange={(event) => provider.address = String(event.detail.value)}
                labelPlacement="floating" fill="solid" placeholder="Enter text"></IonInput>
            </IonCol>
            <IonCol>
              <IonInput label="Web" value={provider.web}
                onIonChange={(event) => provider.web = String(event.detail.value)}
                labelPlacement="floating" fill="solid" placeholder="Enter text"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size='6'>
              <IonInput label="Contact" value={provider.contact}
                onIonChange={(event) => provider.contact = String(event.detail.value)}
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

export default FormProvider;

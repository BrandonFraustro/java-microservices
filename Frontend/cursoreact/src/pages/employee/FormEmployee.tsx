import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Employee from './Employee';
import { saveEmployees, searchEmployeeByID, updateCustomers } from './EmployeeApi';
import './EmployeeList.css'

const FormEmployee: React.FC = () => {

  const { name, id } = useParams<{ name: string; id: string; }>();
  const [employee, setEmployee] = useState<Employee>({});
  const history = useHistory()

  useEffect(() => {
    search()
  }, []);

  const search = async() => {
    if(id !== 'new') {
      let resultEmployee = await searchEmployeeByID(parseInt(id))
      setEmployee(resultEmployee)
    } else {
      setEmployee({})
    }
  }

  const save = async () => {
    if(employee){
      await saveEmployees(employee)
      history.push('/folder/Employees')
    }
    else {
     console.log("Error");
    }
  }

  const update = async() => {
    try {
      await updateCustomers(parseInt(id), employee)
      history.push('/folder/Employees')
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
          <IonTitle>{ id === 'new' ? 'Add employee' : 'Edit employee' }</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonRow>
            <IonCol>
              <IonInput label="Name" name='name' value={employee.name} 
                onIonChange={(event) => employee.name= String(event.detail.value) }
                labelPlacement="floating" fill="solid" 
                placeholder="Enter text"
               />
            </IonCol>
            <IonCol>
              <IonInput label="Lastname" value={employee.lastname}
                onIonChange={(event) => employee.lastname = String(event.detail.value)}
                labelPlacement="floating" fill="solid" placeholder="Enter text"
                />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="Email" value={employee.email}
                onIonChange={(event) => employee.email = String(event.detail.value)}
                type='email' labelPlacement="floating" fill="solid" placeholder="Enter text"
                />
            </IonCol>
            <IonCol>
              <IonInput label="phone" value={employee.phone} 
                onIonChange={(event) => employee.phone = String(event.detail.value)}
                type='number' labelPlacement="floating" fill="solid" placeholder="Enter number"
                />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="Address" value={employee.address}
                onIonChange={(event) => employee.address = String(event.detail.value)}
                labelPlacement="floating" fill="solid" placeholder="Enter text"></IonInput>
            </IonCol>
            <IonCol>
              <IonInput label="Salary" value={employee.salary}
                onIonChange={(event) => employee.salary = Number(event.detail.value)}
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

export default FormEmployee;

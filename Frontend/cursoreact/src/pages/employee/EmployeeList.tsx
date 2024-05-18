import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { pencil, personAddOutline, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Employee from './Employee';
import { removeEmployees, searchEmployees } from './EmployeeApi';
import './EmployeeList.css'

const EmployeeList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [employee, setEmployee] = useState<Employee[]>([]);
  const history = useHistory();

  useEffect(() => {
    search()
  }, [history.location.pathname]);

  const search = async () => {
    let response = await searchEmployees();
    setEmployee(response) 
  }

  const remove = async (id: number) => {
    await removeEmployees(id)
    search()
  }

  const addEmployee = () => {
    history.push('Employees/new')
  }

  const editEmployee = (id: number) => {
    history.push(`Employees/${id}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Employee Managment</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonItem>
            <IonButton onClick={addEmployee} color='primary' slot='end' fill='solid' size='default'>
              <IonIcon icon={personAddOutline}/>
              Add Employee
            </IonButton>
          </IonItem>
          <IonGrid className='table_Header table_Text'>
            <IonRow>
              <IonCol className='table_Header__Items'>ID</IonCol>
              <IonCol className='table_Header__Items'>Name</IonCol>
              <IonCol className='table_Header__Items'>Email</IonCol>
              <IonCol className='table_Header__Items'>Phone</IonCol>
              <IonCol className='table_Header__Items'>Salary</IonCol>
              <IonCol className='table_Header__Items'>Actions</IonCol>
            </IonRow>
          </IonGrid>

            <IonGrid className='table_Content'>
              {
                employee.map((employee: Employee) => (
                  <IonRow key={employee.employeeID}>
                      <IonCol className='table_Content__Items'>{employee.employeeID}</IonCol>
                      <IonCol className='table_Content__Items'>{employee.name} {employee.lastname}</IonCol>
                      <IonCol className='table_Content__Items'>{employee.email}</IonCol>
                      <IonCol className='table_Content__Items'>{employee.phone}</IonCol>
                      <IonCol className='table_Content__Items'>${employee.salary}</IonCol>
                      <IonCol className='table_Content__Items'>
                          <IonButton onClick={() => editEmployee(Number(employee.employeeID))} color='primary' fill='clear' size='small'>
                              <IonIcon icon={pencil}/>
                          </IonButton>
                          <IonButton color='danger' fill='clear' size='small' onClick={() => remove(Number(employee.employeeID))}>
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

export default EmployeeList;

import { Separator } from '../../components/ui/separator';
import CrudPanel from '../../components/CrudPanel';
import EditEntity from '../../components/EditEntity';
import DeleteEntity from '../../components/DeleteEntity';
import { trainingValidationSchema } from '../../lib/validation/TrainingValidation';
import { useEffect, useState } from 'react';
import { useFetchCoachByUserId } from '../../components/hooks/useFetchCoachByUserId';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    name: 'No.',
    selector: (row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Training',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Duration',
    selector: (row) => row.duration,
    sortable: true,
  },
  {
    name: 'Training Date',
    selector: (row) => row.trainingDate?.slice(0, 10),
    sortable: true,
  },
  {
    name: 'Location',
    selector: (row) => row.location,
    sortable: true,
  },
];

const TrainingManage = () => {
  const [types, setTypes] = useState([]);
  const coach = useFetchCoachByUserId();
  const navigate = useNavigate();

  useEffect(() => {
    const getTypes = async () => {
      try {
        const res = await fetch(`/api/admin/training-type/${coach?._id}`);
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch data!');
        }
        const data = await res.json();
        setTypes(data.map((type) => type.name + ':' + type._id));
      } catch (error) {
        console.log(error);
      }
    };

    getTypes();
  }, [coach?._id]);

  const fields = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      name: 'name',
    },
    {
      id: 'trainingType',
      label: 'Training Type',
      type: 'select',
      name: 'trainingType',
      items: types,
      placeholder: 'Select a Type',
      idFlag: true,
    },
    {
      id: 'trainingDate',
      label: 'Training Date',
      type: 'date',
      name: 'trainingDate',
    },
    {
      id: 'duration',
      label: 'Duration (in minutes)',
      type: 'number',
      name: 'duration',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'textarea',
      name: 'description',
    },

    {
      id: 'location',
      label: 'Location',
      type: 'text',
      name: 'location',
    },
    {
      id: 'notes',
      label: 'Notes',
      type: 'textarea',
      name: 'notes',
    },
    {
      id: 'equipment',
      label: 'Equipment',
      type: 'textarea',
      name: 'equipment',
    },
  ];

  return (
    <div className='space-y-6'>
      <div
        className='cursor-pointer mb-2 inline-flex items-center justify-center bg-primary-500 hover:bg-purple-500 text-white font-bold py-1 px-3 rounded'
        onClick={() => navigate(-1)}
      >
        <span className='mr-1'>&#8592;</span> Back
      </div>
      <div>
        <div className='text-heading2-bold'>Trainings</div>
        <p className='text-sm text-muted-foreground'>Manage trainings.</p>
      </div>

      <Separator />
      <CrudPanel
        apiPath='training'
        columns={columns}
        fields={fields}
        title='Training'
        onEditComponent={EditEntity}
        onDeleteComponent={DeleteEntity}
        formSchema={trainingValidationSchema}
        objectId={coach?._id}
        defaultValues={{
          name: '',
          trainingType: '',
          trainingDate: '',
          duration: '',
          description: '',
          location: '',
          notes: '',
          equipment: '',
        }}
      />
    </div>
  );
};

export default TrainingManage;
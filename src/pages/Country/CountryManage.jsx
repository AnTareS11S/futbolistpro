import CrudPanel from '../../components/CrudPanel';
import DeleteEntity from '../../components/DeleteEntity';
import EditEntity from '../../components/EditEntity';
import { Separator } from '../../components/ui/separator';
import { countryFormSchema } from '../../lib/validation/CountryValidation';

const CountryManage = () => {
  const columns = [
    {
      name: 'No.',
      selector: (row, index) => index + 1,
      grow: 0,
    },
    {
      name: 'Country',
      selector: (row) => row.name,
      sortable: true,
    },
  ];

  const fields = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      name: 'name',
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Countries</h3>
        <p className='text-sm text-muted-foreground'>Manage countries.</p>
      </div>
      <Separator />
      <CrudPanel
        apiPath='country'
        columns={columns}
        fields={fields}
        title='Country'
        onEditComponent={EditEntity}
        onDeleteComponent={DeleteEntity}
        formSchema={countryFormSchema}
        defaultValues={{ name: '' }}
      />
    </div>
  );
};

export default CountryManage;

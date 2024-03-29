import BackButton from '../../components/BackButton';
import CrudPanel from '../../components/CrudPanel';
import DeleteEntity from '../../components/DeleteEntity';
import EditEntity from '../../components/EditEntity';
import { useFetchCoaches } from '../../components/hooks/useFetchCoaches';
import { useFetchCountries } from '../../components/hooks/useFetchCountries';
import { useFetchStadiums } from '../../components/hooks/useFetchStadiums';
import { Separator } from '../../components/ui/separator';
import { teamFormSchema } from '../../lib/validation/TeamValidation';

const TeamManage = () => {
  const countries = useFetchCountries();
  const coaches = useFetchCoaches();
  const stadiums = useFetchStadiums();

  const columns = [
    {
      name: 'No.',
      selector: (row, index) => index + 1,
      grow: 0,
    },
    {
      name: 'Team',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Coach',
      selector: (row) => {
        return row.coach?.name
          ? row.coach?.name + ' ' + row.coach.surname
          : 'No coach';
      },
      sortable: true,
    },
    {
      name: 'Year Founded',
      selector: (row) => row.yearFounded,
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
    {
      id: 'logo',
      label: 'Logo',
      type: 'file',
      name: 'logo',
    },
    {
      id: 'bio',
      label: 'Bio',
      type: 'textarea',
      name: 'bio',
    },
    {
      id: 'coach',
      label: 'Coach',
      type: 'select',
      name: 'coach',
      items: coaches,
      defaultValue: '',
      placeholder: 'Select a coach',
      idFlag: true,
    },
    {
      id: 'stadium',
      label: 'Stadium',
      type: 'select',
      name: 'stadium',
      items: stadiums,
      defaultValue: '',
      placeholder: 'Select a Stadium',
      idFlag: true,
    },
    {
      id: 'yearFounded',
      label: 'Founded Year',
      type: 'number',
      name: 'yearFounded',
    },
    {
      id: 'country',
      label: 'Country',
      type: 'select',
      name: 'country',
      items: countries,
      defaultValue: '',
      placeholder: 'Select a Country',
      idFlag: true,
    },
    {
      id: 'city',
      label: 'City',
      type: 'text',
      name: 'city',
    },
  ];

  return (
    <div className='space-y-6'>
      <BackButton />
      <div>
        <div className='text-heading2-bold'>Teams</div>
        <p className='text-sm text-muted-foreground'>Manage teams.</p>
      </div>
      <Separator />
      <CrudPanel
        apiPath='team'
        columns={columns}
        fields={fields}
        title='Team'
        onEditComponent={EditEntity}
        onDeleteComponent={DeleteEntity}
        formSchema={teamFormSchema}
        defaultValues={{
          name: '',
          coach: '',
          league: '',
          city: '',
          country: '',
          yearFounded: '',
          logo: '',
          stadium: '',
        }}
        isExpandable={false}
        isAction={true}
      />
    </div>
  );
};

export default TeamManage;

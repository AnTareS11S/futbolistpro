import CrudPanel from '../../components/CrudPanel';
import DeleteEntity from '../../components/DeleteEntity';
import EditEntity from '../../components/EditEntity';
import AddTeam from '../../components/admin/leagues/AddTeam';
import RemoveTeamFromLeague from '../../components/admin/leagues/RemoveTeamFromLeague';
import { useFetchCountries } from '../../components/hooks/useFetchCountries';
import { Separator } from '../../components/ui/separator';
import { leagueFormSchema } from '../../lib/validation/LeagueValidation';
import { useNavigate } from 'react-router-dom';

const LeagueManage = () => {
  const countries = useFetchCountries();
  const navigate = useNavigate();

  const columns = [
    {
      name: 'No.',
      selector: (row, index) => index + 1,
      grow: 0,
    },
    {
      name: 'League',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Teams',
      selector: (row) => row.teams.length,
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
      id: 'country',
      label: 'Country',
      type: 'select',
      name: 'country',
      items: countries,
      placeholder: 'Select a Country',
      idFlag: true,
    },
    {
      id: 'commissioner',
      label: 'Commissioner',
      type: 'text',
      name: 'commissioner',
    },
    {
      id: 'bio',
      label: 'Bio',
      type: 'textarea',
      name: 'bio',
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
        <div className='text-heading2-bold'>Leagues</div>
        <p className='text-sm text-muted-foreground'>Manage leagues.</p>
      </div>
      <Separator />
      <CrudPanel
        apiPath='league'
        columns={columns}
        fields={fields}
        title='League'
        onEditComponent={EditEntity}
        onDeleteComponent={DeleteEntity}
        onAddTeamComponent={AddTeam}
        onRemoveTeamComponent={RemoveTeamFromLeague}
        formSchema={leagueFormSchema}
        defaultValues={{
          name: '',
          bio: '',
          commissioner: '',
          country: '',
        }}
      />
    </div>
  );
};

export default LeagueManage;
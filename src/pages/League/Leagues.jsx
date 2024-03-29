import { useEffect, useState } from 'react';
import LeagueCard from '../../components/home/leagues/LeagueCard';
import { Separator } from '../../components/ui/separator';

const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  useEffect(() => {
    const getLeagues = async () => {
      try {
        const res = await fetch('/api/admin/league');
        const data = await res.json();
        setLeagues(data);
      } catch (error) {
        console.log(error);
      }
    };
    getLeagues();
  }, []);

  return (
    <>
      <div className='text-heading2-bold mb-4'>Leagues</div>
      <Separator />
      <section className='mt-9 gap-10'>
        <LeagueCard data={leagues} />
      </section>
    </>
  );
};

export default Leagues;

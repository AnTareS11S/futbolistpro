/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../components/ui/card';

const PlayerDetails = () => {
  const [player, setPlayer] = useState({});
  const [loading, setLoading] = useState(false);
  const pathname = window.location.pathname.split('/').pop();

  const getPlayer = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/player/${pathname}`);
      const data = await res.json();
      setPlayer(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlayer();
  }, []);

  console.log(player);

  if (loading)
    return (
      <div className='flex items-center justify-center h-full'>
        <Spinner />
      </div>
    );
  return (
    <article>
      <Card className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
        <CardHeader>
          <img
            src={player.photo}
            alt={`${player.name} ${player.surname}`}
            className='w-48 h-48 mx-auto object-cover rounded-full shadow-md border-4 border-primary-500'
          />
          <div className='mt-4 text-center'>
            <h2 className='text-3xl font-bold text-primary-500'>
              {player.name} {player.surname}
            </h2>
            <p className='text-gray-600'>{player.position}</p>
            <p className='text-gray-700 mt-6'>{player.bio}</p>
          </div>
        </CardHeader>
        <CardContent className='mt-6'>
          <h3 className='text-2xl font-semibold mb-4 text-primary-500'>
            Player Details:
          </h3>
          <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <li>
              <span className='font-semibold'>Age:</span> {player.age}
            </li>
            <li>
              <span className='font-semibold'>Footed:</span> {player.footed}
            </li>
            <li>
              <span className='font-semibold'>Height:</span> {player.height} cm
            </li>
            <li>
              <span className='font-semibold'>Weight:</span> {player.weight} kg
            </li>
            <li>
              <span className='font-semibold'>Nationality:</span>{' '}
              {player.nationality}
            </li>
            <li>
              <span className='font-semibold'>Number:</span> {player.number}
            </li>
          </ul>
        </CardContent>
        <CardFooter className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-2xl font-semibold mb-4 text-primary-500'>
              Current Team:
            </h3>
            {player.currentTeam && (
              <p className='text-gray-700'>{player.currentTeam}</p>
            )}
          </div>

          <div>
            <h3 className='text-2xl font-semibold mb-4 text-primary-500'>
              Previous Teams:
            </h3>
            {player.teams && <p className='text-gray-700'>{player.teams}</p>}
          </div>
        </CardFooter>
      </Card>
    </article>
  );
};

export default PlayerDetails;

import { AiFillCar } from 'react-icons/ai';
import { FaWpforms, FaDog } from 'react-icons/fa';
import { BiMusic, BiFootball } from 'react-icons/bi';


const links = [
  {
    id: 1,
    text: 'Dogs',
    path: '/',
    icon: <FaDog />,
  },
  {
    id: 2,
    text: 'Cars',
    path: 'cars',
    icon: <AiFillCar />,
  },
  {
    id: 3,
    text: 'football',
    path: 'football',
    icon: <BiFootball />,
  },
  {
    id: 4,
    text: 'music',
    path: 'music',
    icon: <BiMusic />,
  },
];

export default links;

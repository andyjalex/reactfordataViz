
import React, { useEffect, useState } from 'react';
import { csv } from 'd3';
import csvdata from '../../data/multiTimeline.csv';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ChartWrapper from '../../components/ChartWrapper';
import Dropdown from '../../components/Dropdown';
import Table from '../../components/Table'

const options = [
  {
    label: 'Retriever',
    value: 'Retriever',
  },
  {
    label: 'West Highland Terrier',
    value: 'West Highland Terrier',
  },
  {
    label: 'Dalmatian',
    value: 'Dalmatian',
  },
  { label: 'Cockapoo',
    value: 'Cockapoo',
  }
  ,
  { label: 'Labrador',
    value: 'Labrador',
  }
];

const Stats = () => {


  const [ data, setData ] = useState(null)
  const [ breed, setBreed ] = useState([options[0],options[1]])
  const [open, setOpen ] = useState(false)


  const handleBreed = (newbreed) => {

    console.log(newbreed)

    var newData = [...breed];
    var index = newData.indexOf(newbreed)
    if (index !== -1) { //already selected
      newData.splice(index, 1);
      setBreed(newData);
    } else {
      newData.push(newbreed);
      setBreed(newData)
    }

    console.log(breed)
  }

  useEffect(() => {

    csv(csvdata)
      .then(data => setData(data))
      .catch(error => console.log(error));

      console.log(data)

  }, []);


  const renderChart =() => {

    console.log(data)
    if (!data) {
      return "No data yet"
    }
    return <ChartWrapper data={data} breed={breed}/>
  }

  const renderTable = () => {
    if (!data) {
      return "No data yet"
    }
    return <Table data={data} breed={breed}/>
  }

  const toggle = () => {
    setOpen({
      open: !open
    });
  }

  //
  //


  return (
    <>
    <div className="stats-header-container">
      <div className="stats-info">

      </div>
      <div className='selections-container'>
        <Dropdown
          multiple
          label="Select a Breed"
          selected={breed}
          onSelectedChange={handleBreed}
          options={options}
        />

      </div>
    </div>


      <div className='charts-container'>
        {renderChart()}
      </div>


        <div className='charts-container'>
        {renderTable()}

        </div>



    </>
  );
};
export default Stats;

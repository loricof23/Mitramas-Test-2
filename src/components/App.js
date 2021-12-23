import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Modal from './modal';

import { getData, addData, editData, deleteData, searchData, clearMessage  } from '../actions';

import '../css/tailwind.css';


const App = ({
  data, message,
  getData, addData, editData, 
  deleteData, searchData, clearMessage, 
}) => {
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedItem, setSelectedItem] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const renderModalContent = () => {
    switch(modalType) {
      case 'add': return (
        <Fragment>
          <div className='mb-4'>
            <span>Name: </span>
            <input className="border-b border-gray-800" name="name" type="text" onChange={e => setName(e.target.value)} value={name}/>
          </div>
          <div className='mb-4'>
            <span>Description: </span>
            <input className="border-b border-gray-800" name="description" type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>  
          <button className='bg-blue-800 text-white p-2 w-24' onClick={()=>addData(name, description)}>Add</button>  
        </Fragment>
      );

      case 'edit': return (
        <Fragment>
          <div className='mb-4'>
            <span>Name: </span>
            <input className="border-b border-gray-800" name="name" type="text" onChange={e => setName(e.target.value)} value={name}/>
          </div>
          <div className='mb-4'>
            <span>Description: </span>
            <input className="border-b border-gray-800" name="description" type="text" onChange={e => setDescription(e.target.value)} value={description}/>
          </div>    
          <button className='bg-blue-800 text-white' onClick={()=>editData(selectedItem.id, name, description)}>Edit</button> 
        </Fragment>
      )

      default: return (
        <Fragment>
          <div className='mb-4'>
            Are you sure to delete this
          </div>
          <button
            className='bg-blue-800 text-white'
            onClick={()=>deleteData(selectedItem.id)}
          >
            Delete
          </button> 
        </Fragment>
      )
    }
  }

  const onAddButtonClick = () => {
    setModalTitle('Tambah Data');
    setModalType('add');
    setShowModal(true);
  }

  const onEditButtonClick = (item) => {
    setModalTitle('Ubah Data');
    setModalType('edit');
    setShowModal(true);
    setSelectedItem(item);
    setName(item.name);
    setDescription(item.description);
  }

  const onDeleteButtonClick = (item) => {
    setModalTitle('Hapus Data');
    setModalType('delete');
    setShowModal(true);
    setSelectedItem(item);
  }

  const modalOnClose = () => {
    setShowModal(false);
    setName('');
    setDescription('');
    clearMessage();
  }
  
  return (
    <div className="App">
      <div className="bg-white rounded-sm p-5 pb-5">
        <div>
          <input type="text" className="border border-gray-700" onChange={e => setQuery(e.target.value)} value={query}/>
          <button className='bg-blue-600 text-white rounded ml-2 p-1 w-14' onClick={() => searchData(query)}>Search</button>
        </div>
        <button className='bg-blue-600 text-white rounded ml-2 p-1 w-14 mb-2 mt-2' onClick={onAddButtonClick}>Add</button>
        
        <table className="border-2  border-gray-200 p-96">
          <thead className="border-2 border-gray-200 p-96">
            <tr className="border-2 border-gray-200 p-96">
              <th className="border border-gray-200 ">Name</th>
              <th className="border border-gray-200">Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border">
              {data && data.length > 0 ?
                data.map(item => {
                  return (
                    <tr key={item.id}>
                      <td className="border border-gray-200 ">{item.name}</td>
                      <td className="border border-gray-200 "> {item.description}</td>
                      <td className="border border-gray-200 pl-16 p-2">
                        <button className='bg-blue-600 text-white rounded p-1 w-16 mb-2' onClick={() => onEditButtonClick(item)}>Edit</button>
                        <button className='bg-red-600 text-white rounded p-1 w-16' onClick={() => onDeleteButtonClick(item)}>Delete</button>
                      </td>         
                    </tr>
                  );
                }) :
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              }
          </tbody>
        </table>
      </div>

      <Modal title={modalTitle} show={showModal} onClick={modalOnClose  }>      
        {renderModalContent()}

        <div className='mt-4'>
          {message}
        </div>
      </Modal>
    </div>
  );
}

const  mapStateProps = (state) => {
  return {
    data:  state.data,
    message: state.message,
    search: state.search
  }
}

export default connect(mapStateProps, {
  getData,
  addData,
  editData,
  deleteData,
  searchData,
  clearMessage,
})(App);

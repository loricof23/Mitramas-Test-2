import api from "../apis/api"

export const getData = (name) => async dispatch => {
  const response = await api.get('/obat');

  const sortedData = response.data.data.sort((a, b) => {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
  })

  dispatch ({type: 'GET_DATA', payload: { data: sortedData }});
}

export const addData = (name, description) => async dispatch => {
  try {
    const response = await api.post('/obat', {
      name: name,
      description : description,
      status: true,
    });

    await dispatch(getData());
    dispatch({ type: 'SET_MESSAGE', payload: 'Tambah Data Berhasil' });
  } catch (e){
    dispatch({ type: 'SET_MESSAGE', payload: e.response.data.message });
  } 
};

export const editData = (id, name, description) => async dispatch => {
  console.log('asda');
  try {
    const response = await api.put(`/obat?id=${id}`, {
      id: id,
      name: name,
      description : description,
      status: true,
    });

    await dispatch(getData());
    dispatch({ type: 'SET_MESSAGE', payload: 'Ubah Data Berhasil' });
  } catch (e){
    console.log(e.message);
    dispatch({ type: 'SET_MESSAGE', payload: e.response.data.message });
  } 
};

export const deleteData = id => async dispatch => {
  try {
    const response = await api.delete(`/obat?id=${id}`);

    await dispatch(getData());
    dispatch({ type: 'SET_MESSAGE', payload: 'Hapus Data Berhasil' });
  } catch (e) {
    dispatch({ type: 'SET_MESSAGE', payload: e.response.data.message });
  }
};

export const clearMessage = () => async dispatch => {
  dispatch({ type: 'SET_MESSAGE', payload: ''});
} 

export const searchData = (name) => async dispatch => {
  // const response = await api.get(`/obat?name=${name}`);
  dispatch ({type: 'GET_DATA', payload: sortedData});
}
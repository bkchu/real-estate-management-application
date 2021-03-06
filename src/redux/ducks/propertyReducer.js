import axios from 'axios';

const CREATE_PROPERTY = 'CREATE_PROPERTY';
const GET_PROPERTIES = 'GET_PROPERTIES';
const GET_PROPERTY_BY_ID = 'GET_PROPERTY_BY_ID';
const ARCHIVE_PROPERTY_BY_ID = 'ARCHIVE_PROPERTY_BY_ID';
const UPDATE_PROPERTY_BY_ID = 'UPDATE_PROPERTY_BY_ID';

const initialState = {
  properties: [],
  selectedProperty: {},
  loading: false,
  error: false,
};

export default function propertyReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PROPERTIES}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case `${GET_PROPERTIES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        properties: action.payload,
        error: false,
      };

    case `${CREATE_PROPERTY}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case `${CREATE_PROPERTY}_FULFILLED`:
      return {
        ...state,
        properties: action.payload,
        loading: false,
        error: false,
      };

    case `${GET_PROPERTY_BY_ID}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case `${GET_PROPERTY_BY_ID}_FULFILLED`:
      return {
        ...state,
        selectedProperty: action.payload,
        loading: false,
        error: false,
      };

    case `${ARCHIVE_PROPERTY_BY_ID}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case `${ARCHIVE_PROPERTY_BY_ID}_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case `${UPDATE_PROPERTY_BY_ID}_PENDING`:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case `${UPDATE_PROPERTY_BY_ID}_FULFILLED`:
      return {
        ...state,
        selectedProperty: action.payload,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
}

export function getProperties() {
  return {
    type: GET_PROPERTIES,
    payload: axios
      .get('/properties/getProperties')
      .then(response => response.data)
      .catch(err => err),
  };
}

export function createProperty(obj) {
  return {
    type: CREATE_PROPERTY,
    payload: axios
      .post('/properties/add', obj)
      .then(response => response.data)
      .catch(err => err),
  };
}

export function getPropertyById(id) {
  return {
    type: GET_PROPERTY_BY_ID,
    payload: axios
      .get(`/properties/getProperty/${id}`)
      .then(response => response.data.property)
      .catch(err => err),
  };
}

export function archivePropertyById(id) {
  return {
    type: ARCHIVE_PROPERTY_BY_ID,
    payload: axios
      .put(`/properties/deleteProperty/${id}`)
      .then(response => response.data.property)
      .catch(err => err),
  };
}

export function updatePropertyById(id, item) {
  return {
    type: UPDATE_PROPERTY_BY_ID,
    payload: axios
      .put(`/properties/update/${id}`, {
        name: item.name,
        photourl: item.photourl,
        address: item.address,
        units: item.units,
        value: item.value,
        expenses: item.expenses,
      })
      .then(response => response.data.property)
      .catch(err => err),
  };
}

import { connect } from 'react-redux';
import { compose } from 'redux';

import { fetchWithError } from './http';
import config from '../common/config';

var requestID = 0;
//const mapStateToProps = (state, ownProps?) => ({
//  token: state.auth.token,
//  user: state.auth.user
//)}

const apiFactory = (token, user) => {
  const getData = () => {
    return {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  const deleteData = () => {
    return {
      method: 'DELETE'
    }
  }

  const updateData = (data) => {
    return {
      method: 'PATCH',  // or 'PATCH' if you want to perform a partial update
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
  }

  const api = {
    fetchLearners: () => {
      return fetchWithError(`${config.apiUrl}/rosters/learner/`, getData());
    },
    fetchLearner: (lid) => {
      return fetchWithError(`${config.apiUrl}/rosters/learner/${lid}/`, getData());
    },
    fetchClassBatches: () => {
      return fetchWithError(`${config.apiUrl}/rosters/classbatch/`, getData());
    },
    fetchClassBatch: (cbid) => {
      return fetchWithError(`${config.apiUrl}/rosters/classbatch/${cbid}/`, getData());
    },
    updateClassBatch: (cbid, data) => {
      return fetchWithError(`${config.apiUrl}/rosters/classbatch/${cbid}/`, updateData(data))
    },
    deleteLearner: (lid) => {
      return fetchWithError(`${config.apiUrl}/rosters/learner/${lid}/`, deleteData())
    }
  }

  return api;
}

const withAPI = (wrappedComponent) => {
  return ({ token, user, ...rest }) => {
    const api = apiFactory(token, user);
    return wrappedComponent({ api, token, user, ...rest });
  }
}

export default compose(
  //connect(mapStateToProps),
  withAPI
);

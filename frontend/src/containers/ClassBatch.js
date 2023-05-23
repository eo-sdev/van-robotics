import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import withAPI from '../services/api';

import '../App.css';


const ClassBatch = ({ api }) => {

  const params = useParams();
  const modelFields = [
    'id', 'name', 'instructor', 'learners'
  ]

  const [classbatchResult, setClassBatchResult] = useState(null);
  const [enableEditingClassBatchName, setEnableEditingClassBatchName] = useState(false);
  const [updatedClassBatchName, setUpdatedClassBatchName] = useState("")

  const fetchInfo = async () => {
    setClassBatchResult(null);
    await api
      .fetchClassBatch(params.classbatchId)
      .then((res) => {
        console.log("Received ClassBatch:", res);
        setClassBatchResult(res);
      })
      .catch((e) => {
        console.log("Error fetching ClassBatch: ", e);
        setClassBatchResult('No results found...');
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const changeClassBatchName = async (cbid) => {
    await api
      .updateClassBatch(cbid, { "name": updatedClassBatchName })
      .then((res) => {
        console.log(`Updated ClassBatch: ${res}`);
        fetchInfo();
      })
      .catch((e) => {
        console.log("Error Updating ClassBatch: ", e);
      })
    setEnableEditingClassBatchName(false)
    setUpdatedClassBatchName('')
  }

  return (
    <div className="App">
      <div>
        <p>
          ClassBatch info:
        </p>
      </div>
      <div>
        {classbatchResult && classbatchResult.id && (
          modelFields.map((field) => (
            <>
              {Array.isArray(classbatchResult[field]) && classbatchResult[field].length > 0 ? (
                `${field} : ${classbatchResult[field].map((learner) => {
                  console.log(learner.first_name)
                  return (
                    <div>
                      {`${learner.first_name} ${learner.last_name}`}
                    </div>
                  )
                })}`
              ) : (
                <div>
                  {`${field} : ${classbatchResult[field]}   `}
                  {field === "name" && (
                    !enableEditingClassBatchName ? (
                      <button onClick={() => setEnableEditingClassBatchName(true)}>Edit name</button>
                    ) : (
                      <>
                        <input
                          type="text"
                          onChange={(e) => setUpdatedClassBatchName(e.target.value)}
                          value={updatedClassBatchName}
                        />
                        <button onClick={() => changeClassBatchName(classbatchResult.id)}>Update name</button>
                      </>
                    )
                  )}
                </div>
              )}
            </>
          ))
        )}
        {classbatchResult && !classbatchResult.id && (
          <p>
            No ClassBatch found with this id...
          </p>
        )}
      </div>
    </div>
  );
}

export default compose(
  withAPI
)(ClassBatch);

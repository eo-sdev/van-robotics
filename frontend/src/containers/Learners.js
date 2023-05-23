import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useParams, Link } from 'react-router-dom';
import withAPI from '../services/api';

import logo from '../static/logo.svg';
import '../App.css';


const Learners = ({ api }) => {
    const [learners, setLearners] = useState(null);

    const fetchLearners = () => {
        setLearners(null);
        api
            .fetchLearners()
            .then((res) => {
                console.log("Received Learner:", res);
                setLearners(res);
            })
            .catch((e) => {
                console.log("Error fetching Learner: ", e);
                setLearners('No results found...');
            });
    };

    useEffect(() => {
        fetchLearners();
    }, []);


    const learnerDelete = async (id) => {
        await api
            .deleteLearner(id)
            .then(() => {
            })
            .catch((e) => {
                // console.log("Error deleting Learner: ", e);
                // setLearnerResult('No results found...');
            });
        fetchLearners()
    }

    return (
        <div className="App">
            <div>
                <p>
                    Learners list:
                </p>
            </div>
            <div>
                {learners && learners.length > 0 ? (
                    learners.map((learner) => (
                        <div>
                            {`Learner: ${learner.first_name} ${learner.last_name}   `}
                            <button
                                onClick={() => learnerDelete(learner.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>
                        No Learners found...
                    </p>
                )}
            </div>
        </div>
    );
}

export default compose(
    withAPI
)(Learners);

import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import withAPI from '../services/api';
import { updateTotalLearnersCount } from '../store/actions';

import '../App.css';

const Learners = ({ api }) => {
    const totalLearnersCount = useSelector((state) => state.totalLearnersCount);
    const dispatch = useDispatch();

    const [learners, setLearners] = useState(null);

    const fetchLearners = () => {
        setLearners(null);
        api
            .fetchLearners()
            .then((res) => {
                console.log("Received Learner:", res);
                dispatch(updateTotalLearnersCount(res.length))
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
                    Learners Count: {totalLearnersCount}
                </p>
            </div>
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

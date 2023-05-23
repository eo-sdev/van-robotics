import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import withAPI from '../services/api';

import '../App.css';


const ClassBatches = ({ api }) => {

    const [classbatches, setClassBatches] = useState(null);

    const fetchClassBatches = () => {
        setClassBatches(null);
        api
            .fetchClassBatches()
            .then((res) => {
                console.log("Received ClassBatches:", res);
                setClassBatches(res);
            })
            .catch((e) => {
                console.log("Error fetching ClassBatches: ", e);
                setClassBatches('No results found...');
            });
    };

    useEffect(() => {
        fetchClassBatches();
    }, []);

    return (
        <div className="App">
            <div>
                <p>
                    ClassBatches list:
                </p>
            </div>
            <div>
                {classbatches && classbatches.length > 0 ? (
                    classbatches.map((learner) => (
                        <div>
                            <p>
                                {`ClassBatch: ${learner.name}, Instructor: ${learner.instructor}`}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>
                        No ClassBatches found...
                    </p>
                )}
            </div>
        </div>
    );
}

export default compose(
    withAPI
)(ClassBatches);

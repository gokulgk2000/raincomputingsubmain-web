import { useUser } from '../../../../src/rainComputing/contextProviders/UserProvider';
import { allCompletedCases } from '../../../../src/rainComputing/helpers/backend_helper';
import React, { useEffect, useState } from 'react';

const CompletedCase = () => {
    const [allCompletedCase, setAllCompletedCases] = useState([]);
    console.log('allCompletedCase :',allCompletedCase);
    const {currentUser} = useUser();
  
    useEffect(() => {
        const getAllCompletedCases = async () => {
            try {
                const res = await allCompletedCases({userId: currentUser?.userID});
                if (res.success) {
                    setAllCompletedCases(res.allcompletedCases);
                } else {
                    console.log('Failed to get completed cases');
                }
            } catch (err) {
                console.error(err);
                console.log('Internal server error');
            }
        };
        getAllCompletedCases();
    }, [currentUser?.userID]);
    return (
        <div className='py-5 my-5'>
            {allCompletedCase?.length > 0 ? (
                <>
                    {allCompletedCase.map((c, i) => (
                        <li key={i} className="border-bottom">
                            <div className="pt-2">
                                <h6>CaseName: {c.caseName}</h6>
                                <p>CaseId: {c.caseId}</p>
                            </div>
                        </li>
                    ))}
                </>
            ) : (
                <p>There is no completed Case</p>
            )}
        </div>
   
    );
};

export default CompletedCase;
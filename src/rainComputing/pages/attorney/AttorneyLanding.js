import React from 'react';
import MetaTags from 'react-meta-tags';
import AttorneyCard from './attorneyLanding/AttorneyCard';
import AttorneyDetails from './attorneyLanding/AttorneyDetailsCard';
import { useUser } from '../../../../src/rainComputing/contextProviders/UserProvider';

const AttorneyLanding = () => {
    const { currentAttorney } = useUser();
    return (
        <div className="page-content ">
            <MetaTags>
                <title>Request Page | RainComputing </title>
            </MetaTags>
            {currentAttorney?.status && currentAttorney?.status === 'approved' ? (
                <AttorneyDetails />
            ) : (
                currentAttorney?.status === 'approved' ?( <AttorneyCard status={currentAttorney?.status} />):(<div className="d-flex justify-content-center"><div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                </div>)
            )}
        </div>
    );
};

export default AttorneyLanding;

import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { contractabi, contractlocation } from '../config/constants';
import Fetchrequests from './Fetchrequests';
import 'bootstrap/dist/css/bootstrap.css';

const Requestedcard = ({ articleId }) => {

    const { isInitialized, isAuthenticated, account } = useMoralis();

    const [obj, setobj] = useState();

    const { data, error, fetch, isFetching, isLoading } =
        useWeb3ExecuteFunction({
            abi: contractabi,
            contractAddress: contractlocation,
            functionName: "request_of_articleId",
            params: {
                articleid: articleId,
            },
        });


    useEffect(() => {
        fetch();
    }, [account]);

    useEffect(() => {
        setobj(data);
        let k;
        if (obj) {
            let co = [];
            for (let i = 0; i < obj.length; i++) {
                k = obj[i].toNumber();
                co.push(k);
            }
            setobj(co)
        }
    }, [data]);

    return (
        <div style={{ marginTop: '10px' }}>
            {(obj) ? (
                <div>
                    {obj.map((number, i) =>
                        <Fetchrequests key={i}
                            requestId={number} />
                    )}
                </div>) : (
                <div style={{ textAlign: 'center' }} >
                </div>
            )}

        </div>
    );
};

export default Requestedcard;
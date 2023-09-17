import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useJobSearch from 'hooks/use-job-search';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    const { state: { jobs }, action: { onSubmitHandler, onChangeHandler } } = useJobSearch()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                <h1>Hi {auth?.firstName}!   </h1>
                <h1 style={{ color: 'green' }}>Enter the Job Which you Want to Search</h1>
            </div>
            <div>
                <input name='jobs' onChange={onChangeHandler} placeholder='Enter Job Title' />
                <button onClick={onSubmitHandler} style={{ marginLeft: '20px', borderRadius: '5px' }}>Go</button>
            </div>

        </div>

    );
}

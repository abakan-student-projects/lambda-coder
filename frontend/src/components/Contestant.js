import {gql, useQuery} from "@apollo/client"
import {useParams} from "react-router-dom"
import {Link} from 'react-router-dom'
import {getContestants} from '../../../backend/src/codeforces'
import '../styles/contestant.css'

const GET_CONTESTANT_QUERY = gql`
query GetContestant(where: {id: $id}) {
    Contestants {
        id
        name
        lastname
        codeforceId
        active
        workOrEducationPlace
    }
}
`;

function Contestant() {
    const {id} = useParams()
    const {data, loading, error} = useQuery(GET_CONTESTANT_QUERY,
        {variables:{id}})
    
    if (loading) return <div className="uk-container">
        <div uk-spinner="ratio: 3"></div>
    </div>

    if(error) return <div>Error - {error.toString()}</div>
    
    const contestant = await getContestants(data.Contestant.codeforceId);


    return(
        <div className="uk-container">
            <h1 className="uk-text-danger">{data.Contestants.codeforceId}</h1>
            <hr></hr>
            <div className='roundbox'>
                <div className="roundbox-lt">&nbsp;</div>
                <div className="roundbox-rt">&nbsp;</div>
                <div className="roundbox-lb">&nbsp;</div>
                <div className="roundbox-rb">&nbsp;</div>
                <div className="userbox">
                    <div className="table-contestant">
                        <table className="uk-table">
                            <tbody>
                                <tr>
                                    <th>Имя</th>
                                    <th>{data.Contestants.name}</th>
                                </tr>
                                <tr>
                                    <th>Фамилия</th>
                                    <th>{data.Contestants.lastname}</th>
                                </tr>
                                <tr>
                                    <th>Из организации</th>
                                    <th>{data.Contestant.workOrEducationPlace}</th>
                                </tr>                        
                            </tbody>
                        </table>
                    </div>                
                    <div className="avatar">
                        <img src= {`https:${contestant.avatar}`} width="300" height="" data-uk-img></img>
                    </div>
                </div>
            </div>
            <Link to="/leaderboard/:month">Назад</Link>
        </div>
    )
}

export default Contestant;